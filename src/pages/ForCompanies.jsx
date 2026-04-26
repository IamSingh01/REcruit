import { useState, useRef } from "react";
import { firestore, collection, addDoc, serverTimestamp } from "../firebase";
import { insertCompanySubmission } from "../supabase";
import "./ForCompanies.css";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  newsletter: true,
};

export default function ForCompanies({ navigate }) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  const set = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName.trim() || !/^[a-zA-Z\s]+$/.test(form.firstName.trim())) {
      setStatus("error");
      setErrorMsg("First name must contain only letters.");
      return;
    }

    if (!form.lastName.trim() || !/^[a-zA-Z\s]+$/.test(form.lastName.trim())) {
      setStatus("error");
      setErrorMsg("Last name must contain only letters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (form.phone && !/^\d{9}$/.test(form.phone)) {
      setStatus("error");
      setErrorMsg("Phone number must be exactly 9 digits.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const results = await Promise.allSettled([
      addDoc(collection(firestore, "company_submissions"), {
        ...form,
        submittedAt: serverTimestamp(),
        source: "for_companies_page",
      }),
      insertCompanySubmission({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        newsletter: form.newsletter,
      }),
    ]);

    console.log("Submit result:", results);

    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      failures.forEach((f) => console.error("Submission error:", f.reason));
    }

    if (failures.length === results.length) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      return;
    }

    setStatus("success");
    setForm(INITIAL);
  };

  return (
    <>
      {/* Hero */}
      <section className="companies-hero">
        <div className="container companies-hero__inner">
          <div className="fade-up">
            <span className="page-label">For Companies</span>
            <h1 className="display-heading">
              Brands That<br />
              Believe in<br />
              <em>Better Hiring</em>
            </h1>
          </div>
          <div className="companies-hero__sub fade-up-2">
            <p className="body-text">
              We partner with businesses that value quality, speed, and a personal
              approach to hiring. Join the companies already growing with our support.
            </p>
            <button className="btn-primary" onClick={scrollToForm}>Work With Us</button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--cream">
        <div className="container">
          <span className="section-label">Our Services</span>
          <h2 className="section-heading" style={{ marginBottom: "60px" }}>
            What Sets Us<br /><em>Apart</em>
          </h2>
          <div className="company-services">
            {[
              {
                title: "Faster Hiring",
                icon: "⚡",
                body: "We cut out the wasted time, no endless interviews, no unqualified CVs. Our proactive approach means you get candidates who are ready to move now, so your team can keep performing without disruption.",
              },
              {
                title: "Quality Candidates",
                icon: "◆",
                body: "We don't just match skills, we match people to environments where they can thrive. Culture, values, ambition, we consider it all. The result? Stronger retention and hires who make a real impact from day one.",
              },
              {
                title: "End-to-End Support",
                icon: "●",
                body: "From understanding your role requirements to onboarding successful hires, we support you at every step. You'll have a single point of contact who ensures everything runs smoothly and transparently.",
              },
            ].map((s) => (
              <div className="company-service-item" key={s.title}>
                <div className="company-service-item__header">
                  <span className="company-service-item__icon">{s.icon}</span>
                  <h3 className="company-service-item__title">{s.title}:</h3>
                </div>
                <p className="company-service-item__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact Form */}
      <section className="section section--dark" ref={formRef}>
        <div className="container companies-contact">
          <div className="companies-contact__left">
            <span className="section-label" style={{ color: "var(--accent)" }}>Get In Touch</span>
            <h2 className="section-heading" style={{ color: "var(--white)" }}>
              Find Your<br /><em>Next Hire</em>
            </h2>
            <div className="divider" />
            <p style={{ color: "rgba(245,242,238,0.6)", fontSize: "0.95rem", lineHeight: 1.75 }}>
              We'll help you attract talent that drives real results and fits your culture perfectly.
            </p>
            <div style={{ marginTop: "32px" }}>
              <button className="btn-white" onClick={() => navigate("/about")}>Learn More About Us</button>
            </div>
          </div>

          {status === "success" ? (
            <div className="contact-success">
              <div className="contact-success__icon">✓</div>
              <h3 className="contact-success__title">Message Sent!</h3>
              <p className="contact-success__body">Thank you for reaching out. We'll be in touch shortly.</p>
              <button className="btn-white" onClick={() => setStatus("idle")} style={{ marginTop: "24px" }}>Done</button>
            </div>
          ) : (
            <form className="companies-form" onSubmit={handleSubmit}>
              <div className="companies-form__row">
                <div className="form-field-dark">
                  <label>First Name *</label>
                  <input type="text" required placeholder="Jane" value={form.firstName} onChange={set("firstName")} disabled={status === "sending"} />
                </div>
                <div className="form-field-dark">
                  <label>Last Name *</label>
                  <input type="text" required placeholder="Smith" value={form.lastName} onChange={set("lastName")} disabled={status === "sending"} />
                </div>
              </div>
              <div className="form-field-dark">
                <label>Email *</label>
                <input type="email" required placeholder="jane@company.com" value={form.email} onChange={set("email")} disabled={status === "sending"} />
              </div>
              <div className="form-field-dark">
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
                    title="Enter exactly 9 digits"
                    value={form.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                      setForm((f) => ({ ...f, phone: digits }));
                    }}
                    disabled={status === "sending"}
                  />
                </div>
              </div>
              <div className="form-field-dark">
                <label>Message *</label>
                <textarea required rows={4} placeholder="Tell us about your hiring needs..." value={form.message} onChange={set("message")} disabled={status === "sending"} />
              </div>
              <label className="form-checkbox-dark">
                <input type="checkbox" checked={form.newsletter} onChange={set("newsletter")} disabled={status === "sending"} />
                <span>Sign up for news and updates</span>
              </label>

              {status === "error" && <p className="contact-form__error">{errorMsg}</p>}

              <button type="submit" className="btn-white" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.6 : 1 }}>
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
