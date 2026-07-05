import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { getContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logoUrl, site, banner } = await getContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar logoUrl={logoUrl} />
      <main className="flex-1">{children}</main>
      <Footer logoUrl={logoUrl} site={site} />
      <Banner banner={banner} />
    </div>
  );
}
