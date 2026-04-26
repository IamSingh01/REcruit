import "./Footer.css";

const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/68fe2cc83942ee2d44291e16/199aecf1-8ad4-437d-9676-1f911baefb8d/Logo+2.png?format=1500w";

function Squiggle({ children }) {
  return (
    <span style={{ position: "relative", display: "inline" }}>
      {children}
      <svg
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: "-6px",
          left: 0,
          width: "100%",
          height: "8px",
          overflow: "visible",
        }}
      >
        <path
          d="M0,5 Q10,0 20,5 Q30,10 40,5 Q50,0 60,5 Q70,10 80,5 Q90,0 100,5"
          fill="none"
          stroke="#5A5EB3"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <button className="footer__logo-btn" onClick={() => navigate("/")}>
            <img
              src={LOGO_URL}
              alt="REcruit"
              className="footer__logo-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <span className="footer__logo" style={{ display: "none" }}>
              <span className="scribble-re">RE</span>cruit
            </span>
          </button>
          <p className="footer__tagline">
            Your go-to Real Estate Recruitment Partner, connecting the best talent with the right partners.
          </p>
        </div>

        <div className="footer__col">
          <span className="footer__col-label">Info</span>
          <button onClick={() => navigate("/contact-us")}>Contact</button>
          <button onClick={() => navigate("/about")}>About</button>
        </div>

        <div className="footer__col">
          <span className="footer__col-label">Contact</span>
          <a href="mailto:Kyel@withrecruit.com">Kyel@withrecruit.com</a>
          <a href="tel:+971529689623">+971 52 968 9623</a>
        </div>

        <div className="footer__col">
          <span className="footer__col-label">Follow</span>
          <a href="http://instagram.com/withrecruit" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/recruitae/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} REcruit. All rights reserved.</p>
      </div>
    </footer>
  );
}
