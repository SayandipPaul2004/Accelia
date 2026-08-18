// lib/api.js
export async function fetchExpertise() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/expertise`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch expertise: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load expertise");
  }

  return json.data;
}
