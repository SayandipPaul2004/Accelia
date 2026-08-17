import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic server-side validation
    const required = [
      "organizationName",
      "organizationType",
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

    // TODO: send an email, save to a database, call a CRM API, etc.
    // Example: await sendEmail(data);
    console.log("New contact form submission:", data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 },
    );
  }
}
