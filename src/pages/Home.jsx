import { useState, useEffect, useRef } from "react";
import { firestore, collection, addDoc, serverTimestamp } from "../firebase";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import "./Home.css";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Home({ navigate }) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal(); const r4 = useReveal();

  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <motion.div
          className="home-hero__orb home-hero__orb--1"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -15, 0],
            scale: [1, 1.05, 0.97, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="home-hero__orb home-hero__orb--2"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="home-hero__orb home-hero__orb--3"
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="home-hero__grid" />

        <div className="container home-hero__content">
          <motion.div
            className="home-hero__left fade-up"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/*
              page-label here: this is the first text a visitor reads.
              "Real Estate Recruitment" must be legible context, not a
              decorative 0.72rem chip floating above a 5-rem heading.
            */}
            <span className="page-label">Real Estate Recruitment</span>
            <h1 className="display-heading">
              <TypeAnimation
                sequence={[
                  'Trusted by Ambitious Companies',
                  2000,
                  'Trusted by Ambitious Companies',
                  2000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                cursor={false}
                style={{ display: 'inline-block' }}
              />
            </h1>
          </motion.div>
          <motion.div
            className="home-hero__right fade-up-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="body-text">
              We partner with businesses that value{" "}
              <strong>quality, speed, and a personal approach</strong> to hiring.
              Join the companies already growing with our support.
            </p>
            <div className="home-hero__ctas">
              <motion.button
                className="btn-primary"
                onClick={() => navigate("/contact-us")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
              <motion.button
                className="btn-outline"
                onClick={() => navigate("/about")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="home-hero__bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="home-hero__ticker">
            {["Real Estate Recruitment", "Dubai's Top Talent", "Quality Hires", "Seamless Onboarding", "End-to-End Support"].map((t, i) => (
              <span key={i}><span className="ticker-dot">◆</span> {t} </span>
            ))}
            {["Real Estate Recruitment", "Dubai's Top Talent", "Quality Hires", "Seamless Onboarding", "End-to-End Support"].map((t, i) => (
              <span key={`b${i}`}><span className="ticker-dot">◆</span> {t} </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section className="section section--cream">
        <div className="container">
          {
          }
          <span className="section-label">Our Services</span>
          <h2 className="section-heading" style={{ marginBottom: "16px" }}>
            What We <em>Deliver</em>
          </h2>
          <div className="divider" />
          <div className="services-grid reveal" ref={r1} style={{ marginTop: "44px" }}>
            {[
              {
                num: "01",
                title: "Faster Hiring",
                body: "We cut out the wasted time, no endless interviews, no unqualified CVs. Our proactive approach means you get candidates who are ready to move now, so your team can keep performing without disruption.",
              },
              {
                num: "02",
                title: "Quality Candidates",
                body: "We don't just match skills; we match people to environments where they can thrive. Culture, values, ambition, we consider it all. The result? Stronger retention and hires who make a real impact from day one.",
              },
              {
                num: "03",
                title: "End-to-End Support",
                body: "From understanding your role requirements to onboarding successful hires, we support you at every step. You'll have a single point of contact who ensures everything runs smoothly and transparently.",
              },
            ].map((s, index) => (
              <motion.div
                className="service-card"
                key={s.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <span className="service-card__num" style={{ fontSize: "2rem", }}>{s.num}</span>
                <div className="divider" />
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__body" style={{ fontSize: "1rem" }}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Your Next Hire ── */}
      <section className="section hire-section-wrap">
        <div className="hire-bg">
          <div className="hire-bg__circle hire-bg__circle--1" />
          <div className="hire-bg__circle hire-bg__circle--2" />
          <div className="hire-bg__lines">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="hire-bg__line" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>
          <div className="hire-bg__dots">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="hire-bg__dot"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  left: `${(i * 37 + 10) % 90}%`,
                  top: `${(i * 53 + 15) % 80}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container hire-section reveal" ref={r2}>
          <motion.div
            className="hire-section__text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Find Your Next Hire</span>
            <h2 className="section-heading">
              Talent That Drives<br /><em>Real Results</em>
            </h2>
            <div className="divider" />
            <p className="body-text">
              We'll help you attract{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                talent that drives real results
              </span>{" "}
              and fits your culture perfectly.
            </p>
            <div style={{ marginTop: "36px" }}>
              <motion.button
                className="btn-primary"
                onClick={() => navigate("/about")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="hire-stats reveal"
            ref={r3}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                num: "100%",
                label: "Dedicated to Real Estate",
                sub: "Every placement, every conversation — real estate only.",
              },
              {
                num: "Dubai",
                label: "Local Market Expertise",
                sub: "Deep knowledge of the UAE market and what it takes to succeed here.",
              },
              {
                num: "1",
                label: "Point of Contact, Always",
                sub: "No hand-offs, no confusion — one person who knows your brief inside out.",
              },
            ].map((s, index) => (
              <motion.div
                className="hire-stat-card"
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <span className="hire-stat-card__num">{s.num}</span>
                <div className="hire-stat-card__divider" />
                <strong className="hire-stat-card__label">{s.label}</strong>
                <p className="hire-stat-card__sub">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="home-contact">
            <motion.div
              className="home-contact__intro reveal"
              ref={r4}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="section-label" style={{ color: "var(--accent-light)" }}>
                Get In Touch
              </span>
              <h2 className="section-heading" style={{ color: "var(--white)" }}>
                Let's Find Your<br /><em>Next Hire</em>
              </h2>
              <p className="body-text" style={{ color: "rgba(245,242,238,0.6)" }}>
                Tell us about the role and we'll get back to you quickly.
              </p>
            </motion.div>
            <ContactFormInline />
          </div>
        </div>
      </section>
    </>
  );
}

// ── Inline contact form — now connected to Firebase ──────────────────────────

const INITIAL = {
  firstName: "", lastName: "", email: "", phone: "", message: "", newsletter: true,
};

function ContactFormInline() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setError] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName.trim() || !/^[a-zA-Z\s]+$/.test(form.firstName.trim())) {
      setStatus("error");
      setError("First name must contain only letters.");
      return;
    }

    if (!form.lastName.trim() || !/^[a-zA-Z\s]+$/.test(form.lastName.trim())) {
      setStatus("error");
      setError("Last name must contain only letters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      await addDoc(collection(firestore, "contact_submissions"), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: "+971" + form.phone,
        message: form.message,
        newsletter: form.newsletter,
        submittedAt: serverTimestamp(),
        source: "home_page",
      });
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error("Firebase error:", err);
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">Message Sent!</h3>
        <p className="contact-success__body">
          Thank you for reaching out. We'll be in touch shortly.
        </p>
        <button className="btn-white" onClick={() => setStatus("idle")} style={{ marginTop: "24px" }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <div className="inline-form__row">
        <div className="form-field">
          <label>First Name *</label>
          <input type="text" required placeholder="Jane"
            value={form.firstName} onChange={set("firstName")} disabled={status === "sending"} />
        </div>
        <div className="form-field">
          <label>Last Name *</label>
          <input type="text" required placeholder="Smith"
            value={form.lastName} onChange={set("lastName")} disabled={status === "sending"} />
        </div>
      </div>
      <div className="inline-form__row">
        <div className="form-field">
          <label>Email *</label>
          <input type="email" required placeholder="jane@company.com"
            value={form.email} onChange={set("email")} disabled={status === "sending"} />
        </div>
        <div className="form-field">
          <label>Phone</label>
          <div className="phone-input-wrap">
            <span className="phone-prefix">+971</span>
            <input
              type="tel"
              placeholder="501234567"
              inputMode="numeric"
              pattern="[0-9]{9}"
              minLength={9}
              maxLength={9}
              title=""
              value={form.phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                setForm((f) => ({ ...f, phone: digits }));
              }}
              disabled={status === "sending"}
            />
          </div>
        </div>
      </div>
      <div className="form-field">
        <label>Message *</label>
        <textarea required rows={4} placeholder="Tell us about your hiring needs..."
          value={form.message} onChange={set("message")} disabled={status === "sending"} />
      </div>
      <label className="form-checkbox">
        <input type="checkbox" checked={form.newsletter} onChange={set("newsletter")} disabled={status === "sending"} />
        <span>Sign up for news and updates</span>
      </label>

      {status === "error" && (
        <p className="contact-form__error">{errorMsg}</p>
      )}

      <button type="submit" className="btn-white"
        disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.6 : 1 }}>
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
