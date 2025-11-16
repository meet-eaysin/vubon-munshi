import Wrapper from "@/components/global/wrapper";
import CTA from "@/components/marketing/cta";
import Perks from "@/components/marketing/perks";
import Reviews from "@/components/marketing/reviews";
import { Spotlight } from "@/components/ui/spotlight";
import Pricing from "@/components/marketing/price";
import Hero from "@/components/marketing/hero";
import FAQ from "@/components/marketing/faq";

const HomePage = () => {
  return (
    <Wrapper className="py-20 relative">
      <div className="relative">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(255, 255, 255, 0.5)"
        />
        <Hero />
      </div>
      {/* <Bento /> */}
      {/* <Features /> */}
      <Perks />
      <Pricing />
      <Reviews />
      <FAQ />
      <CTA />
    </Wrapper>
  )
};

export default HomePage
