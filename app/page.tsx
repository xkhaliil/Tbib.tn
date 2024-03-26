import { FAQ } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";
import { GetStartedBanner } from "@/components/marketing/get-started-banner";
import { Hero } from "@/components/marketing/hero";
import { MainFeatures } from "@/components/marketing/main-features";
import { Navbar } from "@/components/marketing/navbar";
import { ProviderSection } from "@/components/marketing/provider-section";
import { SecondaryFeatures } from "@/components/marketing/secondary-features";
import { TopSpeacialities } from "@/components/marketing/top-speacialities";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-auto">
        <Hero />
        <MainFeatures />
        <SecondaryFeatures />
        <ProviderSection />
        <GetStartedBanner />
        <TopSpeacialities />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
