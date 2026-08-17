import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const required = [
      "organizationName",
      "organizationType",
      "email",
      "street",
      "city",
      "state",
      "country",
      "zipCode",
    ];
    const missing = required.filter((key) => !data[key]?.trim());

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email.trim())) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const {
      organizationName,
      organizationType,
      email,
      street,
      city,
      state,
      country,
      zipCode,
      therapeuticArea,
    } = data;

    const { data: emailData, error } = await resend.emails.send({
      from: "Accelia Contact Form <onboarding@resend.dev>",
      to: ["sayandippal11234@gmail.com"],
      replyTo: email,
      subject: `New Organization Inquiry — ${organizationName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Organization Name</strong></td><td>${organizationName}</td></tr>
          <tr><td><strong>Organization Type</strong></td><td>${organizationType}</td></tr>
          <tr><td><strong>Submitted By (Email)</strong></td><td>${email}</td></tr>
          <tr><td><strong>Street</strong></td><td>${street}</td></tr>
          <tr><td><strong>City</strong></td><td>${city}</td></tr>
          <tr><td><strong>State</strong></td><td>${state}</td></tr>
          <tr><td><strong>Country</strong></td><td>${country}</td></tr>
          <tr><td><strong>Zip Code</strong></td><td>${zipCode}</td></tr>
          <tr><td><strong>Therapeutic Area</strong></td><td>${therapeuticArea || "—"}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    console.log("New contact form submission sent:", emailData.id);

    return NextResponse.json(
      { success: true, id: emailData.id },
      { status: 200 },
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 },
    );
  }
}
