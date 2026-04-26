import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ForCandidates from "./pages/ForCandidates";
import ForCompanies from "./pages/ForCompanies";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SubmitCV from "./pages/SubmitCV";
import "./App.css";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPath) {
      case "/for-candidates": return <ForCandidates navigate={navigate} />;
      case "/for-companies": return <ForCompanies navigate={navigate} />;
      case "/contact-us": return <Contact navigate={navigate} />;
      case "/about": return <About navigate={navigate} />;
      case "/submit-cv": return <SubmitCV navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar navigate={navigate} currentPath={currentPath} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
