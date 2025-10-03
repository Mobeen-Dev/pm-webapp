import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./components/Home";
import About from "./components/About";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/Theme";
import PdfViewer from "./components/PdfViewer";
import ThemeBtn from "./components/ThemeButton";
import ThemeToggle from "./components/ThemeToggle";
import BookComparison from "./components/BookComparison";

// import BookComparison from "../public/book.pdf";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Header / Navbar */}
        {/* <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">📄 My Modern PDF App</h1>
            <nav className="flex gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/pdf"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                }
              >
                PDF Viewer
              </NavLink>
            </nav>
          </div>
        </header> */}

        {/* Main content */}

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<BookComparison />} />
            <Route
              // /book?pdfId=2&pageNum=50&searchText=Analytics
              
              path="/book"
              element={<PdfViewer/>}
            />
            <Route
              path="/book-123"
              element={<PdfViewer pdfId={1} pageNum={117} searchText="Column-Oriented Storage" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/pdf" element={<PdfViewer />} />
            
            {/* <Route path="*" element={<HomePage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
