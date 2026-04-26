import { createClient } from "@supabase/supabase-js";

// ─── Lazy client — only created on first use ─────────────────────────────────
let _client = null;

function getClient() {
    if (_client) return _client;

    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
        throw new Error(
            "Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file."
        );
    }

    _client = createClient(url, key);
    return _client;
}

// ─── Contact page submissions ─────────────────────────────────────────────────
export async function insertContactSubmission(data) {
    console.log("Inserting contact submission to Supabase:", data);
    const { error } = await getClient().from("contact_submissions").insert([
        {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone ? `+971${data.phone}` : null,
            message: data.message,
            newsletter: data.newsletter,
            source: data.source || "contact_page",
        },
    ]);
    if (error) throw error;
    console.log("Contact submission inserted successfully");
}

// ─── For-Companies page submissions ──────────────────────────────────────────
export async function insertCompanySubmission(data) {
    console.log("Inserting company submission to Supabase:", data);
    const { error } = await getClient().from("company_submissions").insert([
        {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone ? `+971${data.phone}` : null,
            message: data.message,
            newsletter: data.newsletter,
            source: "for_companies_page",
        },
    ]);
    if (error) {
        console.error("Company submission insert error:", error);
        throw error;
    }
    console.log("Company submission inserted successfully");
}

// ─── CV submissions ───────────────────────────────────────────────────────────
export async function insertCvSubmission(data) {
    console.log("Inserting CV submission to Supabase:", data);

    let resumeUrl = null;
    if (data.resumeFile) {
        resumeUrl = await uploadCvToSupabase(
            data.resumeFile,
            data.firstName,
            data.lastName
        );
    }

    const { error } = await getClient().from("cv_submissions").insert([
        {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone ? `+971${data.phone}` : null,
            message: data.message,
            newsletter: data.newsletter,
            resume: resumeUrl,
            source: "send_cv_page",
        },
    ]);
    if (error) throw error;
    console.log("CV submission inserted successfully");
    return resumeUrl;
}

// ─── Supabase Storage CV upload ───────────────────────────────────────────────
async function uploadCvToSupabase(file, firstName, lastName) {
    const ext = file.name.split(".").pop();
    const safeName = `${firstName}-${lastName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const path = `cvs/${safeName}-${Date.now()}.${ext}`;

    const client = getClient();

    const { error } = await client.storage
        .from("resumes")
        .upload(path, file, { upsert: false });

    if (error) throw error;

    const { data } = client.storage.from("resumes").getPublicUrl(path);
    return data.publicUrl;
}