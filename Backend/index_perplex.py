"""
PDF Book Indexer - Professional Edition

A comprehensive, production-ready PDF indexing system that processes PDF files
and creates searchable indexes for efficient text retrieval.

Features:
- Automatic processing of all PDFs in a directory
- Section-based text organization using numbered headings
- Individual index files per book for optimal performance
- Comprehensive logging and error handling
- Type hints and dataclass structures
- Configuration management
- Progress tracking and statistics

Author: Created following Python best practices 2024/2025
License: MIT
"""

import json
import logging
import pickle
import re
import sys
import time
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple, Union

try:
    import pypdf
except ImportError:
    try:
        import PyPDF2 as pypdf
        PYPDF_VERSION = "legacy"
    except ImportError:
        raise ImportError(
            "No PDF library found. Install either 'pypdf' or 'PyPDF2':\n"
            "pip install pypdf  # Recommended (modern version)\n"
            "pip install PyPDF2  # Legacy version"
        )
else:
    PYPDF_VERSION = "modern"


@dataclass
class SectionData:
    """Represents a book section with title and content."""
    title: str
    content: str
    word_count: int = field(init=False)

    def __post_init__(self) -> None:
        """Calculate word count after initialization."""
        self.word_count = len(self.content.split())


@dataclass 
class BookMetadata:
    """Metadata information for a processed book."""
    book_name: str
    total_sections: int
    total_keywords: int
    file_size_bytes: int
    processing_time_seconds: float
    sections_file: str
    index_file: str
    metadata_file: str
    created_timestamp: str


@dataclass
class ProcessingStats:
    """Statistics for the entire processing session."""
    total_files: int = 0
    successful_files: int = 0
    failed_files: int = 0
    total_sections: int = 0
    total_keywords: int = 0
    total_processing_time: float = 0.0
    failed_file_names: List[str] = field(default_factory=list)


class PDFProcessingError(Exception):
    """Custom exception for PDF processing errors."""
    pass


class ConfigurationError(Exception):
    """Custom exception for configuration errors."""
    pass


class PDFBookIndexer:
    """
    Professional PDF book indexer with comprehensive error handling,
    logging, and performance optimization.
    """

    # Class constants
    MIN_KEYWORD_LENGTH = 3
    MAX_KEYWORD_LENGTH = 50
    DEFAULT_ENCODING = 'utf-8'

    def __init__(self, folder_path: Union[str, Path] = ".") -> None:
        """
        Initialize the PDF indexer.

        Args:
            folder_path: Directory containing PDF files to process

        Raises:
            ConfigurationError: If folder path is invalid
        """
        self.folder_path = Path(folder_path).resolve()
        self._validate_folder_path()

        # Setup logging
        self.logger = self._setup_logging()

        # Initialize statistics
        self.stats = ProcessingStats()

        # Create output directory
        self.output_dir = self.folder_path / "indexes"
        self.output_dir.mkdir(exist_ok=True)

        self.logger.info(f"Initialized PDF indexer for: {self.folder_path}")

    def _validate_folder_path(self) -> None:
        """Validate that the folder path exists and is accessible."""
        if not self.folder_path.exists():
            raise ConfigurationError(f"Folder does not exist: {self.folder_path}")

        if not self.folder_path.is_dir():
            raise ConfigurationError(f"Path is not a directory: {self.folder_path}")

        # Check if folder is readable
        try:
            list(self.folder_path.iterdir())
        except PermissionError as e:
            raise ConfigurationError(f"Cannot access folder: {self.folder_path}") from e

    def _setup_logging(self) -> logging.Logger:
        """
        Setup comprehensive logging configuration.

        Returns:
            Configured logger instance
        """
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.INFO)

        # Avoid duplicate handlers
        if logger.handlers:
            return logger

        # Create formatters
        detailed_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
        )

        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_handler.setFormatter(detailed_formatter)
        logger.addHandler(console_handler)

        # File handler
        log_file = self.folder_path / "pdf_indexer.log"
        file_handler = logging.FileHandler(log_file, encoding=self.DEFAULT_ENCODING)
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(detailed_formatter)
        logger.addHandler(file_handler)

        return logger

    def _extract_text_from_pdf(self, pdf_path: Path) -> str:
        """
        Extract text content from a PDF file with proper error handling.

        Args:
            pdf_path: Path to the PDF file

        Returns:
            Extracted text content

        Raises:
            PDFProcessingError: If PDF cannot be processed
        """
        try:
            with open(pdf_path, 'rb') as file:
                if PYPDF_VERSION == "modern":
                    reader = pypdf.PdfReader(file)
                    text = ""
                    for page_num, page in enumerate(reader.pages, 1):
                        try:
                            text += page.extract_text() + "\n"
                        except Exception as e:
                            self.logger.warning(f"Error extracting page {page_num} from {pdf_path.name}: {e}")
                            continue
                else:  # Legacy PyPDF2
                    reader = pypdf.PdfFileReader(file)
                    text = ""
                    for page_num in range(reader.getNumPages()):
                        try:
                            page = reader.getPage(page_num)
                            text += page.extractText() + "\n"
                        except Exception as e:
                            self.logger.warning(f"Error extracting page {page_num + 1} from {pdf_path.name}: {e}")
                            continue

                return text

        except Exception as e:
            raise PDFProcessingError(f"Failed to extract text from {pdf_path}: {e}") from e

    def _parse_sections(self, text: str) -> Dict[str, SectionData]:
        """
        Parse text into sections based on numbered headings with improved regex.

        Args:
            text: Raw text content from PDF

        Returns:
            Dictionary mapping section IDs to SectionData objects
        """
        sections: Dict[str, SectionData] = {}

        # Enhanced pattern to match various section heading formats
        patterns = [
            r'^(\d+(?:\.\d+)*)\s+(.+?)$',  # 1.1 Title
            r'^(\d+(?:\.\d+)*)\s*[.-]\s*(.+?)$',  # 1.1. Title or 1.1 - Title
            r'^Section\s+(\d+(?:\.\d+)*)\s*[:-]?\s*(.+?)$',  # Section 1.1: Title
            r'^Chapter\s+(\d+(?:\.\d+)*)\s*[:-]?\s*(.+?)$',  # Chapter 1.1: Title
        ]

        lines = text.split('\n')
        current_section: str = ''
        current_content: List[str] = []

        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Try each pattern
            match = None
            for pattern in patterns:
                match = re.match(pattern, line, re.IGNORECASE)
                if match:
                    break

            if match:
                # Save previous section
                if current_section and current_content:
                    content_text = '\n'.join(current_content).strip()
                    if content_text:  # Only save sections with content
                        sections[current_section] = SectionData(
                            title=sections[current_section].title,
                            content=content_text
                        )

                # Start new section
                section_id = match.group(1)
                section_title = match.group(2).strip()
                current_section = section_id
                sections[current_section] = SectionData(title=section_title, content="")
                current_content = []

            elif current_section:
                # Add to current section content
                current_content.append(line)

        # Save last section
        if current_section and current_content:
            content_text = '\n'.join(current_content).strip()
            if content_text:
                sections[current_section] = SectionData(
                    title=sections[current_section].title,
                    content=content_text
                )

        self.logger.debug(f"Parsed {len(sections)} sections from text")
        return sections

    def _build_book_index(self, book_name: str, sections: Dict[str, SectionData]) -> Dict[str, List[str]]:
        """
        Build searchable index for a single book with improved keyword extraction.

        Args:
            book_name: Name of the book
            sections: Dictionary of section data

        Returns:
            Dictionary mapping keywords to section IDs
        """
        book_index: Dict[str, List[str]] = defaultdict(list)
        processed_keywords: Set[str] = set()

        for section_id, section_data in sections.items():
            # Combine title and content for indexing
            full_text = f"{section_data.title} {section_data.content}"

            # Extract keywords with improved filtering
            words = re.findall(r'\b[a-zA-Z]{3,}\b', full_text.lower())

            # Filter and process keywords
            for word in words:
                if (self.MIN_KEYWORD_LENGTH <= len(word) <= self.MAX_KEYWORD_LENGTH and
                    word not in self._get_stop_words()):

                    if section_id not in book_index[word]:
                        book_index[word].append(section_id)
                        processed_keywords.add(word)

        self.logger.debug(f"Built index with {len(book_index)} keywords for {book_name}")
        return dict(book_index)

    def _get_stop_words(self) -> Set[str]:
        """Return common stop words to exclude from indexing."""
        return {
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
            'by', 'from', 'up', 'about', 'as', 'into', 'through', 'during', 'an',
            'a', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had',
            'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
            'must', 'can', 'this', 'that', 'these', 'those', 'there', 'here',
            'when', 'where', 'why', 'how', 'what', 'which', 'who', 'whom'
        }

    def _save_book_data(self, book_name: str, sections: Dict[str, SectionData], 
                       index: Dict[str, List[str]], processing_time: float,
                       file_size: int) -> BookMetadata:
        """
        Save book sections and index to files with comprehensive metadata.

        Args:
            book_name: Name of the book
            sections: Section data dictionary
            index: Keyword index dictionary
            processing_time: Time taken to process the book
            file_size: Original file size in bytes

        Returns:
            BookMetadata object with file information
        """
        try:
            # Define file paths
            sections_file = self.output_dir / f"{book_name}_sections.pkl"
            index_file = self.output_dir / f"{book_name}_index.json"
            metadata_file = self.output_dir / f"{book_name}_metadata.json"

            # Save sections data (using pickle for complex structure)
            with open(sections_file, 'wb') as f:
                pickle.dump(sections, f, protocol=pickle.HIGHEST_PROTOCOL)

            # Save index data (using JSON for readability and portability)
            with open(index_file, 'w', encoding=self.DEFAULT_ENCODING) as f:
                json.dump(index, f, indent=2, ensure_ascii=False, sort_keys=True)

            # Create and save metadata
            metadata = BookMetadata(
                book_name=book_name,
                total_sections=len(sections),
                total_keywords=len(index),
                file_size_bytes=file_size,
                processing_time_seconds=round(processing_time, 3),
                sections_file=str(sections_file),
                index_file=str(index_file),
                metadata_file=str(metadata_file),
                created_timestamp=time.strftime('%Y-%m-%d %H:%M:%S')
            )

            with open(metadata_file, 'w', encoding=self.DEFAULT_ENCODING) as f:
                json.dump(
                    metadata.__dict__, f, 
                    indent=2, ensure_ascii=False, sort_keys=True
                )

            self.logger.info(f"Saved data for {book_name}: "
                           f"{len(sections)} sections, {len(index)} keywords")

            return metadata

        except Exception as e:
            raise PDFProcessingError(f"Failed to save data for {book_name}: {e}") from e

    def _process_single_book(self, pdf_file: Path) -> Optional[BookMetadata]:
        """
        Process a single PDF file with comprehensive error handling.

        Args:
            pdf_file: Path to the PDF file

        Returns:
            BookMetadata if successful, None if failed
        """
        book_name = pdf_file.stem
        start_time = time.time()

        try:
            self.logger.info(f"Processing: {book_name}")

            # Get file size
            file_size = pdf_file.stat().st_size

            # Extract text
            text = self._extract_text_from_pdf(pdf_file)
            if not text.strip():
                self.logger.warning(f"No text extracted from {book_name}")
                return None

            # Parse sections
            sections = self._parse_sections(text)
            if not sections:
                self.logger.warning(f"No sections found in {book_name}")
                return None

            # Build index
            book_index = self._build_book_index(book_name, sections)

            # Calculate processing time
            processing_time = time.time() - start_time

            # Save data
            metadata = self._save_book_data(
                book_name, sections, book_index, processing_time, file_size
            )

            # Update statistics
            self.stats.successful_files += 1
            self.stats.total_sections += len(sections)
            self.stats.total_keywords += len(book_index)
            self.stats.total_processing_time += processing_time

            self.logger.info(f"✓ Completed {book_name} in {processing_time:.2f}s")
            return metadata

        except Exception as e:
            self.logger.error(f"✗ Failed to process {book_name}: {e}")
            self.stats.failed_files += 1
            self.stats.failed_file_names.append(book_name)
            return None

    def process_all_pdfs(self) -> ProcessingStats:
        """
        Process all PDF files in the folder with progress tracking.

        Returns:
            ProcessingStats object with session statistics
        """
        # Find PDF files
        pdf_patterns = ["*.pdf", "*.PDF"]
        pdf_files = []

        for pattern in pdf_patterns:
            pdf_files.extend(self.folder_path.glob(pattern))

        pdf_files = list(set(pdf_files))  # Remove duplicates

        if not pdf_files:
            self.logger.warning(f"No PDF files found in {self.folder_path}")
            return self.stats

        self.stats.total_files = len(pdf_files)
        self.logger.info(f"Found {len(pdf_files)} PDF files to process")

        # Process each file
        session_start = time.time()
        successful_books = []

        for i, pdf_file in enumerate(pdf_files, 1):
            self.logger.info(f"Progress: {i}/{len(pdf_files)} files")

            metadata = self._process_single_book(pdf_file)
            if metadata:
                successful_books.append(metadata)

        # Calculate total time
        total_time = time.time() - session_start
        self.stats.total_processing_time = total_time

        # Log final statistics
        self._log_final_statistics(successful_books)

        # Save session summary
        self._save_session_summary(successful_books)

        return self.stats

    def _log_final_statistics(self, successful_books: List[BookMetadata]) -> None:
        """Log comprehensive processing statistics."""
        self.logger.info("="*80)
        self.logger.info("PROCESSING COMPLETE")
        self.logger.info("="*80)
        self.logger.info(f"Total files found: {self.stats.total_files}")
        self.logger.info(f"Successfully processed: {self.stats.successful_files}")
        self.logger.info(f"Failed: {self.stats.failed_files}")
        self.logger.info(f"Total sections extracted: {self.stats.total_sections}")
        self.logger.info(f"Total keywords indexed: {self.stats.total_keywords}")
        self.logger.info(f"Total processing time: {self.stats.total_processing_time:.2f}s")

        if self.stats.successful_files > 0:
            avg_time = self.stats.total_processing_time / self.stats.successful_files
            self.logger.info(f"Average time per book: {avg_time:.2f}s")

        if self.stats.failed_file_names:
            self.logger.error(f"Failed files: {', '.join(self.stats.failed_file_names)}")

        self.logger.info(f"Index files saved in: {self.output_dir}")

    def _save_session_summary(self, successful_books: List[BookMetadata]) -> None:
        """Save a comprehensive session summary."""
        summary = {
            "session_info": {
                "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
                "folder_path": str(self.folder_path),
                "output_directory": str(self.output_dir)
            },
            "statistics": self.stats.__dict__,
            "successful_books": [book.__dict__ for book in successful_books]
        }

        summary_file = self.output_dir / "session_summary.json"
        with open(summary_file, 'w', encoding=self.DEFAULT_ENCODING) as f:
            json.dump(summary, f, indent=2, ensure_ascii=False, sort_keys=True)

        self.logger.info(f"Session summary saved: {summary_file}")


def main() -> None:
    """Main execution function with comprehensive error handling."""
    try:
        print("PDF Book Indexer - Professional Edition")
        print("="*60)

        # Get folder path
        folder_path = './../public'
        if not folder_path:
            folder_path = "."

        # Initialize and run indexer
        indexer = PDFBookIndexer(folder_path)
        stats = indexer.process_all_pdfs()

        # Display final results
        print("\n" + "="*60)
        print("PROCESSING SUMMARY")
        print("="*60)
        print(f"📁 Folder: {Path(folder_path).resolve()}")
        print(f"📄 Files processed: {stats.successful_files}/{stats.total_files}")
        print(f"📑 Total sections: {stats.total_sections}")
        print(f"🔍 Total keywords: {stats.total_keywords}")
        print(f"⏱️  Processing time: {stats.total_processing_time:.2f}s")

        if stats.failed_files > 0:
            print(f"❌ Failed files: {stats.failed_files}")

        print(f"💾 Output directory: {indexer.output_dir}")

    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user.")
        sys.exit(1)
    except ConfigurationError as e:
        print(f"\nConfiguration Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()