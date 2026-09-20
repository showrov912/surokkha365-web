import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const readableTitle = slug 
    ? slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "Pest Control Article";

  return {
    title: `${readableTitle} | Surokkha365 Pest Control`,
    description: `Expert insights and professional advice on ${readableTitle.toLowerCase()} in Dhaka, Bangladesh. Surokkha365 provides evidence-based pest control methods.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  return (
    <main>
      <Header />
      <BlogPostContent slug={resolvedParams.slug} />
      <Footer />
    </main>
  );
}
