import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function PdfViewer({ pdfId, pageNum, searchText }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.88);

  const pageRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const newWidth = Math.min(window.innerWidth * 0.9, 800);
      setPageWidth(newWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoaded({ numPages }) {
    setNumPages(numPages);
    setPageNumber(pageNum);
  }

  function nextPage() {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  }

  function prevPage() {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  }

  // Highlight function
  useEffect(() => {
    if (!searchText) return;

    // Wait a little to ensure text layer rendered
    const timeoutId = setTimeout(() => {
      const textLayer = pageRef.current?.querySelector(".react-pdf__Page__textContent");
      if (!textLayer) return;

      // Remove previous highlights
      const marks = textLayer.querySelectorAll("mark");
      marks.forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });

      // Highlight all occurrences of searchText
      const innerHTML = textLayer.innerHTML;
      const regex = new RegExp(`(${escapeRegExp(searchText)})`, "gi");

      // Replace matched text with <mark>
      textLayer.innerHTML = innerHTML.replace(regex, "<mark>$1</mark>");
    }, 1000); // delay to wait for page rendering

    return () => clearTimeout(timeoutId);
  }, [pageNumber, searchText]);

  // Utility to escape special regex chars in search string
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  let pdf = "http://localhost:5173/book.pdf";
  if (pdfId === 2) pdf = "http://localhost:5173/book2.pdf";
  if (pdfId === 3) pdf = "http://localhost:5173/book3.pdf";

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "20px auto",
        padding: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoaded}
        loading={<div style={{ padding: 20 }}>Loading PDF...</div>}
        error={
          <div style={{ padding: 20, color: "red" }}>Failed to load PDF.</div>
        }
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={true}
          renderTextLayer={true}
          width={pageWidth}
          loading={<div style={{ padding: 20 }}>Loading page...</div>}
          inputRef={pageRef} // This is a mistake, react-pdf Page doesn't accept inputRef prop, better use ref directly below
          ref={pageRef}
        />
      </Document>
      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <button
          onClick={prevPage}
          disabled={pageNumber <= 1}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: 4,
            color: "#fff",
            opacity: pageNumber <= 1 ? 0.5 : 1,
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              pageNumber <= 1 ? "#007bff" : "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          ◀ Prev
        </button>
        <span style={{ fontSize: 16 }}>
          Page <strong>{pageNumber}</strong> of <strong>{numPages || "?"}</strong>
        </span>
        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: 4,
            color: "#fff",
            opacity: pageNumber >= numPages ? 0.5 : 1,
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              pageNumber >= numPages ? "#007bff" : "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
