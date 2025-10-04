// /book?pdfId=2&pageNum=50&searchText=Analytics
import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useSearchParams } from "react-router-dom";

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.88);

  const containerRef = useRef(null);

  const [searchParams] = useSearchParams();

  // ✅ Convert query params into correct types
  const pdfId = parseInt(searchParams.get("pdfId") || "0", 10);
  const initialPageNum = parseInt(searchParams.get("pageNum") || "1", 10);
  const searchText =
    searchParams.get("searchText") || "";
  console.log("searchText")
  console.log(searchText)
  const [pageNumber, setPageNumber] = useState(initialPageNum);

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
    setPageNumber((prev) =>
      prev > numPages ? numPages : prev < 1 ? 1 : prev
    );
  }

  function nextPage() {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  }

  function prevPage() {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  }

  // ✅ Highlight text in page
  useEffect(() => {
    if (!searchText) return;

    const timeoutId = setTimeout(() => {
      const textLayer =
        containerRef.current?.querySelector(".react-pdf__Page__textContent");
      if (!textLayer) return;

      // Clear previous highlights
      const marks = textLayer.querySelectorAll("mark");
      marks.forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });

      // Walk through text nodes and highlight
      const regex = new RegExp(escapeRegExp(searchText), "gi");

      function highlightNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const match = node.nodeValue.match(regex);
          if (match) {
            const span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(
              regex,
              `<mark>$&</mark>`
            );
            node.parentNode.replaceChild(span, node);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(highlightNode);
        }
      }

      textLayer.childNodes.forEach(highlightNode);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [pageNumber, searchText]);

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ✅ Choose PDF file by id
  const pdf = `http://localhost:5173/book${pdfId}.pdf`;

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
      <div ref={containerRef}>
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoaded}
          loading={<div style={{ padding: 20 }}>Loading PDF...</div>}
          error={<div style={{ padding: 20, color: "red" }}>Failed to load PDF.</div>}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer
            renderTextLayer
            width={pageWidth}
            loading={<div style={{ padding: 20 }}>Loading page...</div>}
          />
        </Document>
      </div>

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
          }}
        >
          ◀ Prev
        </button>
        <span style={{ fontSize: 16 }}>
          Page <strong>{pageNumber}</strong> of{" "}
          <strong>{numPages || "?"}</strong>
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
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
