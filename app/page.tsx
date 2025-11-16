import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Perks from "@/components/marketing/perks";
import Reviews from "@/components/marketing/reviews";
import { Spotlight } from "@/components/ui/spotlight";

const HomePage = () => {
  return (
    <Wrapper className="py-20 relative">
      <Container className="relative">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(255, 255, 255, 0.5)"
        />
        <Hero />
      </Container>
      <Features />
      <Perks />
      {/* <Pricing /> */}
      <Reviews />
      <CTA />
    </Wrapper>
  )
};

export default HomePage
