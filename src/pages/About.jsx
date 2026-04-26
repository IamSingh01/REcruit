import { useEffect, useRef } from "react";
import "./About.css";

const IMAGES = {
  hero1: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80",
  hero2: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  hero3: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
  hero4: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
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

export default function About({ navigate }) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal();
  const r4 = useReveal(); const r5 = useReveal();

  return (
    <>
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="container about-hero__inner fade-up">
          {/* page-label gives visitors instant context */}
          <span className="page-label">About Us</span>
          <h1 className="display-heading">
            People First.<br />
            <em>Always.</em>
          </h1>
        </div>
      </section>

      {/* ── Image Strip ── */}
      <section className="section section--cream" style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div className="about-image-strip">
            <div className="about-image-strip__img about-image-strip__img--tall fade-up">
              <img src={IMAGES.hero1} alt="Dubai skyline" />
              <span className="about-image-strip__badge">Dubai, UAE</span>
            </div>
            <div className="about-image-strip__col">
              <div className="about-image-strip__img about-image-strip__img--short fade-up-2">
                <img src={IMAGES.hero2} alt="Modern office" />
                <span className="about-image-strip__badge">Our Network</span>
              </div>
              <div className="about-image-strip__img about-image-strip__img--short fade-up-3">
                <img src={IMAGES.hero3} alt="Team collaboration" />
                <span className="about-image-strip__badge">People First</span>
              </div>
            </div>
            <div className="about-image-strip__img about-image-strip__img--tall fade-up-4">
              <img src={IMAGES.hero4} alt="Real estate building" />
              <span className="about-image-strip__badge">Real Estate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main copy ── */}
      <section className="section section--cream" style={{ paddingTop: 0 }}>
        <div className="container about-body">
          <div className="about-body__text" ref={r1}>
            <p>
              At REcruit, we connect{" "}
              <span className="highlight">exceptional real estate professionals</span>{" "}
              with Dubai's leading agencies. Whether you're an experienced agent
              searching for the right fit, a salaried professional looking for your
              next step, or a newcomer relocating to the UAE, we make every career
              move seamless.
            </p>
            <p>
              Our approach is built on{" "}
              <strong>honest advice, reliable guidance, and genuine support</strong>{" "}
              — because looking after people is at the heart of what we do.
            </p>
            <p>
              We take the time to understand what matters most to you — your values,
              your goals, and the type of environment where you'll thrive. By aligning
              you with opportunities that reflect both your skills and aspirations, we
              give you the{" "}
              <span className="highlight">
                confidence to know your next move is the right one.
              </span>
            </p>
            <p>
              And our support doesn't stop once you've accepted an offer. We stay in
              touch as you transition into your new role — whether that means preparing
              for a move, settling into a new agency, or finding your feet in a salaried
              position.
            </p>
            <p>
              Just as great agents don't push clients into houses,{" "}
              <strong>we don't push candidates into boxes.</strong> You'll find the role
              that truly fits — one that aligns with your skills, values, and goals;
              WithREcruit.
            </p>
          </div>
          <div className="about-body__aside">
            <div className="about-quote reveal" ref={r2}>
              <span className="about-quote__mark">"</span>
              <blockquote className="about-quote__text">
                Opportunities don't happen. You create them.
              </blockquote>
              <cite className="about-quote__author">— Chris Grosser</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Our Values</span>
          <h2 className="section-heading" style={{ marginBottom: "16px" }}>
            What We <em>Stand For</em>
          </h2>
          <div className="divider" />
          <div className="about-values reveal" ref={r3}>
            {[
              {
                icon: "◆",
                title: "Honesty",
                body: "We give you straight talk, no fluff, no filler. You'll always know where you stand.",
              },
              {
                icon: "◈",
                title: "Connection",
                body: "Real relationships built on trust, not just transactions. We're invested in your success.",
              },
              {
                icon: "◉",
                title: "Excellence",
                body: "We hold a high bar for the talent we represent and the companies we partner with.",
              },
            ].map((v) => (
              <div className="about-value-card" key={v.title}>
                <div className="about-value-card__icon">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section section--dark about-mission">
        <div className="container reveal" ref={r4}>
          <span className="section-label" style={{ color: "var(--accent-light)" }}>
            Our Mission
          </span>
          <h2 className="about-mission__statement">
            Our mission is to connect{" "}
            <em>talented people</em>{" "}
            with the{" "}
            <em>opportunities</em>{" "}
            they deserve.
          </h2>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section about-cta">
        <div className="container about-cta__inner reveal" ref={r5}>
          <div>
            <h2 className="section-heading">
              Take the Next<br /><em>Step Today</em>
            </h2>
            <div className="divider" />
            <p className="body-text">Ready to find the right fit? Let's talk.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/contact-us")}>
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}
