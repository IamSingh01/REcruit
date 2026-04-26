import { useState } from "react";
import "./SubmitCV.css";
import { firestore } from "../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { insertCvSubmission } from "../supabase";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  resume: null,
  message: "",
  newsletter: true,
};

export default function SubmitCV({ navigate }) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

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
      setErrorMsg("Please enter the correct number.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const slug = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const docId = `${slug}-${Date.now()}`;

      const supabaseUrl = await insertCvSubmission({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        newsletter: form.newsletter,
        resumeFile: form.resume,
      });

      const results = await Promise.allSettled([
        setDoc(doc(firestore, "cv_submissions", docId), {
          name: fullName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: "+971" + form.phone,
          message: form.message,
          newsletter: form.newsletter,
          resumeUrl: supabaseUrl,
          submittedAt: serverTimestamp(),
          source: "send_cv_page",
        }),
      ]);

      const failures = results.filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        failures.forEach((f) => console.error("CV submission error:", f.reason));
      }

      if (failures.length === results.length) {
        throw new Error("All submission destinations failed");
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Upload failed. Please try again.");
    }
  };

  return (
    <>
      <section className="contact-hero section--dark">
        <div className="container contact-hero__inner">

          {/* ── Left column ── */}
          <div className="contact-hero__left fade-up">
            <span className="page-label page-label--light">Submit Your CV</span>
            <h1 className="display-heading" style={{ color: "var(--white)" }}>
              Talk to Us.<br />
              <em>We Respond.</em>
            </h1>
            <div className="divider" />
            <div className="contact-info">
              <a
                href="http://instagram.com/withrecruit"
                target="_blank"
                rel="noreferrer"
                className="contact-info__social"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                @withrecruit
              </a>
              <a
                href="https://www.linkedin.com/company/recruitae/"
                target="_blank"
                rel="noreferrer"
                className="contact-info__social"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                REcruit on LinkedIn
              </a>
              <a href="mailto:Kyel@withrecruit.com" className="contact-info__item">
                Kyel@withrecruit.com
              </a>
              <a href="tel:+971529689623" className="contact-info__item">
                +971 529 68 96 23
              </a>
            </div>
          </div>

          {/* ── Right column: form ── */}
          <div className="contact-hero__form fade-up-2">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3 className="contact-success__title">CV Submitted!</h3>
                <p className="contact-success__body">
                  Thank you for reaching out. We'll be in touch shortly.
                </p>
                <button
                  className="btn-white"
                  onClick={() => setStatus("idle")}
                  style={{ marginTop: "24px" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__row">
                  <div className="form-field-dark">
                    <label>First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={set("firstName")}
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className="form-field-dark">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={set("lastName")}
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                <div className="form-field-dark">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set("email")}
                    disabled={status === "sending"}
                  />
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

                <div className="form-field-dark">
                  <label>Resume *</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) =>
                      setForm((f) => ({ ...f, resume: e.target.files[0] }))
                    }
                    disabled={status === "sending"}
                  />
                  <small className="upload-note">PDF, DOC or DOCX only</small>
                </div>

                <div className="form-field-dark">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us a bit about yourself and what you're looking for..."
                    value={form.message}
                    onChange={set("message")}
                    disabled={status === "sending"}
                  />
                </div>

                <label className="form-checkbox-dark">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={set("newsletter")}
                    disabled={status === "sending"}
                  />
                  <span>Sign up for news and updates</span>
                </label>

                {status === "error" && (
                  <p className="contact-form__error">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-white"
                  disabled={status === "sending"}
                  style={{ opacity: status === "sending" ? 0.6 : 1 }}
                >
                  {status === "sending" ? "Uploading…" : "Submit CV"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
