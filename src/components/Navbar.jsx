import { useState, useEffect } from "react";
import "./Navbar.css";

const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/68fe2cc83942ee2d44291e16/199aecf1-8ad4-437d-9676-1f911baefb8d/Logo+2.png?format=1500w";

const Logo = () => (
  <img
    src={LOGO_URL}
    alt="REcruit"
    className="navbar__logo-img"
    onError={(e) => {
      e.target.style.display = "none";
      e.target.nextSibling.style.display = "block";
    }}
  />
);

const navLinks = [
  { label: "For Candidates", path: "/for-candidates" },
  { label: "For Companies", path: "/for-companies" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "About", path: "/about" },
];

export default function Navbar({ navigate, currentPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <button className="navbar__brand" onClick={() => handleNav("/")}>
            <Logo />
            <span className="navbar__logo-text" style={{ display: "none" }}>
              <span className="navbar__logo-re">RE</span>cruit
            </span>
          </button>

          <nav className="navbar__links">
            {navLinks.map((l) => (
              <button
                key={l.path}
                className={`navbar__link ${currentPath === l.path ? "navbar__link--active" : ""}`}
                onClick={() => handleNav(l.path)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="navbar__socials">
            <a href="http://instagram.com/withrecruit" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/recruitae/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <button
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__inner">
          {navLinks.map((l) => (
            <button
              key={l.path}
              className={`mobile-menu__link ${currentPath === l.path ? "mobile-menu__link--active" : ""}`}
              onClick={() => handleNav(l.path)}
            >
              {l.label}
            </button>
          ))}
          <div className="mobile-menu__socials">
            <a href="http://instagram.com/withrecruit" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/recruitae/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  );
}
