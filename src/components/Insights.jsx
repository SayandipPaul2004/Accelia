import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const articles = [
  {
    slug: "future-of-clinical-research",
    title:
      "The Future of Clinical Research: Faster, Smarter, More Patient-Centric",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Clinical research is evolving with advanced technologies that speed up trials and improve accuracy. A stronger focus on patient needs ensures more personalized and accessible healthcare solutions.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "navigating-regulatory-landscapes",
    title: "Navigating Regulatory Landscapes in Emerging Markets",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Discover how to navigate complex regulatory frameworks in emerging markets. Gain insights to ensure compliance and accelerate successful market expansion.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "mitigating-risk-via-site-partnerships",
    title: "Mitigating Risk in Clinical Trials via Strong Site Partnerships",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Learn how building strong site partnerships reduces risk and boosts efficiency in clinical trials. Strengthened collaboration ensures data quality and trial success.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "accelerating-study-start-up",
    title: "Accelerating Study Start-Up: From Protocol to First Patient In",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Explore strategies to streamline study start-up and cut the time between protocol finalization and first patient enrollment without compromising quality.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "selecting-the-right-sites",
    title:
      "Selecting the Right Sites: What Sponsors Should Really Be Looking For",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Discover key factors sponsors should evaluate when selecting trial sites, from investigator experience to patient population and operational readiness.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "cost-efficiency-without-compromising-quality",
    title: "Cost Efficiency Without Compromising Quality",
    author: "Kainat Zehra",
    authorSlug: "kainat-zehra",
    excerpt:
      "Learn how to achieve cost efficiency in clinical research operations while maintaining the highest standards of data integrity and patient safety.",
    date: "October 6, 2025",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
  },
];

function ArticleCard({ article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(15,45,90,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(15,45,90,0.14)]">
      <Link
        href={`/insights/${article.slug}`}
        className="relative block h-56 w-full overflow-hidden"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            href={`/insights/${article.slug}`}
            className="text-[#1E5A96] transition-colors hover:text-[#153f68]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm text-gray-700">
          by{" "}
          <Link
            href={`/insights/author/${article.authorSlug}`}
            className="text-[#1E5A96] hover:text-[#153f68]"
          >
            {article.author}
          </Link>
        </p>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-600">
          {article.excerpt}
        </p>

        <p className="mt-5 text-sm text-gray-500">{article.date}</p>

        <Link
          href={`/insights/${article.slug}`}
          className="mt-4 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#0B2E5C] to-[#1E5A96] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}

export default function InsightsPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold text-[#1E5A96] sm:text-4xl">
            Latest Insights &amp; Articles
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
