import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { revalidatePath } from "next/cache";
import { Refresher } from "cms-renderer/lib/refresher";
import "./globals.css";

// HelveticaNowDisplay (the brand face) is proprietary; Inter is the self-hosted
// stand-in. next/font self-hosts at build time — no fonts are fetched at runtime.
// It exposes the family via the `--font-inter` CSS variable, which globals.css
// maps onto the `--font-helveticanowdisplay` theme token.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "airports-directory",
  description: "Built with create-profound-app",
};

async function revalidate() {
  "use server";
  revalidatePath("/", "layout");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Refresher
          websiteId={process.env.NEXT_PUBLIC_PROFOUND_WEBSITE_ID ?? ""}
          cmsUrl={process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms.dev.tryprofound.com"}
          apiKey={process.env.PROFOUND_API_KEY ?? ""}
          onInvalidate={revalidate}
        />
      </body>
    </html>
  );
}
