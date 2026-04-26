import { useEffect, useRef } from "react";
import "./ForCandidates.css";

const services = [
  "CV and LinkedIn optimisation",
  "Career strategy and coaching",
  "Interview preparation",
  "Salary guidance and negotiation",
  "Smooth onboarding support",
];

const steps = [
  {
    num: "01",
    title: "Tell Us Your Story",
    body: "Share your background, your goals, and what you want next. No forms, no fuss — just a real conversation.",
    icon: "◎",
  },
  {
    num: "02",
    title: "We Find the Right Matches",
    body: "We connect you with companies where you can thrive — not settle. Culture, values, ambition — we consider it all.",
    icon: "◈",
  },
  {
    num: "03",
    title: "Secure Your Next Role",
    body: "Interview with confidence. Land the job. Level up your career. We'll be with you every step of the way.",
    icon: "◆",
  },
];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
  supportBg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function ForCandidates({ navigate }) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal();
  const r4 = useReveal(); const r5 = useReveal();

  return (
    <>
      {/* ── Hero ── */}
      <section className="candidates-hero">
        <div className="container candidates-hero__inner">
          <div className="candidates-hero__text fade-up">
            {/* page-label: clearly readable page context */}
            <span className="page-label">For Candidates</span>
            <h1 className="display-heading">
              Your Next<br />
              Opportunity<br />
              <em>Starts Here</em>
            </h1>
            <div className="divider" style={{ marginTop: "32px" }} />
            <div className="candidates-hero__sub">
              <p className="body-text">
                Discover your perfect role with REcruit. We connect{" "}
                <strong>talented professionals</strong> with companies that value
                their skills and ambitions.
              </p>
              <div>
                <button className="btn-primary" onClick={() => navigate("/submit-cv")}>
                  Submit your CV
                </button>
              </div>
            </div>
          </div>
          <div className="candidates-hero__image-wrap fade-up-2">
            <img src={IMAGES.hero} alt="Professional candidate" />
            <span className="candidates-hero__image-badge">Join Dubai's Best</span>
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="section section--cream">
        <div className="container">
          <span className="section-label">Why Work With Us</span>
          <h2 className="section-heading" style={{ marginBottom: "16px" }}>
            The <em>Right</em> Fit
          </h2>
          <div className="divider" />
          <div className="why-grid reveal" ref={r1}>
            {[
              {
                title: "The Right Fit",
                body: "We listen first. Then we connect you with companies that match your values, personality, and long-term goals — not just your CV.",
              },
              {
                title: "Real Support",
                body: "You're not just a number in our database. We guide you through the whole process — from CV tips to interview prep to final offer.",
              },
              {
                title: "Local Insights",
                body: "Dubai moves fast. We know the market, the salaries, the hiring managers, and exactly what they're looking for right now.",
              },
            ].map((w) => (
              <div className="why-card" key={w.title}>
                <div className="why-card__accent" />
                <h3 className="why-card__title">{w.title}</h3>
                <p className="why-card__body">{w.body}</p>
              </div>
            ))}
          </div>
          <div className="why-cta reveal" ref={r5}>
            <button className="btn-outline" onClick={() => navigate("/contact-us")}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section">
        <div className="container">
          <div className="how-it-works-header">
            <div>
              <span className="section-label">How It Works</span>
              <h2 className="section-heading">
                Three <em>Simple Steps</em>
              </h2>
              <div className="divider" />
            </div>
          </div>

          <div className="steps-cards reveal" ref={r3}>
            {steps.map((s, i) => (
              <div className="step-card" key={s.num}>
                <div className="step-card__top">
                  <span className="step-card__num">{s.num}</span>
                  <span className="step-card__icon">{s.icon}</span>
                </div>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__body">{s.body}</p>
                {i < steps.length - 1 && <div className="step-card__connector" />}
              </div>
            ))}
          </div>

          <div className="steps-cta reveal" ref={r2}>
            <div className="steps-cta__inner">
              <p className="steps-cta__text">Ready to take the first step?</p>
              <button className="btn-white" onClick={() => navigate("/contact-us")}>
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Candidate Success Support ── */}
      <section
        className="section candidates-support-section"
        style={{ backgroundImage: `url(${IMAGES.supportBg})` }}
      >
        <div className="candidates-support-overlay" />
        <div className="container candidates-support reveal" ref={r4}>
          <div className="candidates-support__text">
            <span className="section-label" style={{ color: "var(--accent-light)" }}>
              Candidate Success Support
            </span>
            <h2 className="section-heading" style={{ color: "var(--white)" }}>
              We Give You the<br />
              <em>Tools to Win</em>
            </h2>
            <div className="divider" />
            <p className="candidates-support__desc" style={{
              marginBottom: "12px", fontSize: "1.1rem",
              color: "var(--white)"
            }}>
              We give you the tools that increase your chances of hearing{" "}
              <span style={{ color: "var(--accent-light)", fontStyle: "italic" }}>
                "you're hired."
              </span>
            </p>
            <ul className="support-list">
              {services.map((s) => (
                <li key={s}>
                  <span className="support-list__dot">◆</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="candidates-support__cta-box">
            <p className="candidates-support__cta-text" style={{ color: "var(--white)" }}>
              Ready to{" "}
              <span style={{ color: "var(--accent-light)", fontWeight: 500 }}>
                Level Up Your Career?
              </span>{" "}
              Let's unlock opportunities that move your life forward.
            </p>
            <button className="btn-white" style={{ marginTop: "10px" }} onClick={() => navigate("/contact-us")}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
