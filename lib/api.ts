import { articles as localArticles } from "@/app/data/articles";

const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

// ─── Types ────────────────────────────────────────────────────
export interface Article {
  slug: string;
  title: string;
  desc: string;
  content: string[];
  img: string;
  url: string;
  source: string;
  publishedAt: string;
  time: string;
}

// ─── Local Fallback ───────────────────────────────────────────
function getFormattedLocalArticles(): Article[] {
  return (localArticles as any[]).map((item) => ({
    slug: item.slug ?? String(item.title).toLowerCase().replace(/\s+/g, "-").substring(0, 40),
    title: item.title ?? "Artikel Tanpa Judul",
    desc: item.desc ?? "",
    content: Array.isArray(item.content) ? item.content : [item.desc ?? ""],
    img: item.img ?? "/assets/img/berita1.jpg",
    url: item.url ?? "#",
    source: "PantauSampah",
    publishedAt: new Date().toISOString(),
    time: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  }));
}

// ─── Relevance Filter ─────────────────────────────────────────
function isEnvironmentRelated(title: string, desc: string): boolean {
  const text = `${title} ${desc ?? ""}`.toLowerCase();
  const envKeywords = [
    "lingkungan", "sampah", "limbah", "polusi", "daur ulang", "recycle",
    "banjir", "iklim", "hutan", "alam", "ekosistem", "kebersihan",
    "plastik", "energi bersih", "terbarukan", "keberlanjutan", "sustainability",
    "drainase", "pencemaran", "konservasi", "green", "eco",
  ];
  const bannedKeywords = ["sepak bola", "liga", "skor", "artis", "selebriti", "gosip", "hiburan"];
  return envKeywords.some((kw) => text.includes(kw)) && !bannedKeywords.some((kw) => text.includes(kw));
}

// ─── Map helpers ──────────────────────────────────────────────
function mapGNewsArticle(item: any): Article {
  return {
    slug: String(item.url ?? "").split("/").filter(Boolean).pop() ?? Math.random().toString(36).substring(7),
    title: item.title ?? "",
    desc: item.description ?? "",
    content: [item.content ?? item.description ?? ""],
    img: item.image ?? "/assets/img/berita1.jpg",
    url: item.url ?? "#",
    source: item.source?.name ?? "GNews",
    publishedAt: item.publishedAt ?? new Date().toISOString(),
    time: new Date(item.publishedAt ?? Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  };
}

function mapRssItem(item: any, sourceName: string): Article {
  return {
    slug: String(item.link ?? "").split("/").filter(Boolean).pop() ?? Math.random().toString(36).substring(7),
    title: item.title ?? "",
    desc: String(item.description ?? "").replace(/<[^>]*>?/gm, "").substring(0, 160) + "...",
    content: [item.content ?? item.description ?? ""],
    img: item.thumbnail ?? item.enclosure?.link ?? "/assets/img/berita1.jpg",
    url: item.link ?? "#",
    source: sourceName,
    publishedAt: item.pubDate ?? new Date().toISOString(),
    time: new Date(item.pubDate ?? Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  };
}

// ─── Main Fetch Function ──────────────────────────────────────
export async function getArticles(
  query = "lingkungan hidup Indonesia OR pengelolaan sampah OR perubahan iklim",
  retries = 2
): Promise<Article[]> {
  type Fetcher = () => Promise<Article[] | null>;

  const sources: Fetcher[] = [
    // 1. GNews API (requires API key)
    async () => {
      if (!GNEWS_API_KEY) return null;
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=id&country=id&max=15&token=${GNEWS_API_KEY}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      const data = await res.json();
      return (data.articles ?? []).map(mapGNewsArticle);
    },
    // 2. RSS Kompas via rss2json
    async () => {
      const rssUrl = "https://rss.kompas.com/rss/sains";
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const res = await fetch(apiUrl, { cache: "no-store" });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.status !== "ok") return null;
      return (data.items ?? []).map((item: any) => mapRssItem(item, "Kompas Sains"));
    },
  ];

  for (const fetcher of sources) {
    let attempt = 0;
    while (attempt <= retries) {
      try {
        const articles = await fetcher();
        if (articles && articles.length > 0) {
          const filtered = articles.filter((a) => isEnvironmentRelated(a.title, a.desc));
          if (filtered.length > 0) return filtered;
          // If nothing passes the filter, still return all so we're never empty
          return articles;
        }
      } catch (e) {
        console.error(`[getArticles] Fetcher error (attempt ${attempt}):`, e);
      }
      attempt++;
    }
  }

  // Final fallback — always returns something
  console.warn("[getArticles] All external sources failed. Using local data.");
  return getFormattedLocalArticles();
}

// ─── By Slug ──────────────────────────────────────────────────
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getArticles();
    return articles.find((a) => a.slug === slug) ?? null;
  } catch (e) {
    console.error("[getArticleBySlug] Error:", e);
    return null;
  }
}

// ─── Related Articles ─────────────────────────────────────────
export async function getRelatedArticles(title: string, currentSlug: string): Promise<Article[]> {
  try {
    const keywords = title.split(" ").slice(0, 2).join(" ");
    const articles = await getArticles(keywords);
    return articles.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch (e) {
    console.error("[getRelatedArticles] Error:", e);
    return [];
  }
}