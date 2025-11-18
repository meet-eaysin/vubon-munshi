import Wrapper from "@/components/global/wrapper";
import CTA from "@/components/marketing/cta";
import Perks from "@/components/marketing/perks";
import Reviews from "@/components/marketing/reviews";
import Pricing from "@/components/marketing/price";
import Hero from "@/components/marketing/hero";
import FAQ from "@/components/marketing/faq";
import Team from "@/components/marketing/team";

const HomePage = () => {
  return (
    <Wrapper className="py-20 relative">
      <Hero />
      {/* <Bento /> */}
      {/* <Features /> */}
      <Perks />
      <Pricing />
      <Reviews />
      <Team />
      <FAQ />
      <CTA />
    </Wrapper>
  )
};

export default HomePage
