// app/expertise/page.jsx
import { fetchExpertise } from "@/lib/api";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";

export default async function ExpertisePage() {
  let expertiseAreas = [];
  let fetchError = null;

  try {
    expertiseAreas = await fetchExpertise();
  } catch (err) {
    fetchError = err.message;
  }

  return (
    <ExpertiseCarousel expertiseAreas={expertiseAreas} error={fetchError} />
  );
}
