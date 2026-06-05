import { ParametricRoutePreviewPage } from "cms-renderer/lib/renderer";
import Nav from "@/components/Nav";
import Headline from "@/components/Headline";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

// Registry maps CMS component types to your React components.
// Add entries here as you build out your component library.
const registry = {
  nav: Nav,
  headline: Headline,
  body: Body,
  footer: Footer,
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;

  return (
    <ParametricRoutePreviewPage
      registry={registry}
      apiKey={process.env.PROFOUND_API_KEY ?? ""}
      websiteId={process.env.NEXT_PUBLIC_PROFOUND_WEBSITE_ID ?? ""}
      cmsUrl={process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms.dev.tryprofound.com"}
      params={Promise.resolve({ slug })}
      searchParams={searchParams}
    />
  );
}
