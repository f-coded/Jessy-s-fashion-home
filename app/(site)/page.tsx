import Hero from "@/components/home/Hero";
import Banner from "@/components/home/Banner";
import Partners from "@/components/home/Partners";
import Services from "@/components/home/Services";
import QuoteSlider from "@/components/home/QuoteSlider";
import Portfolio from "@/components/home/Portfolio";
import ImageSlider from "@/components/home/ImageSlider";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Showreel from "@/components/home/Showreel";
import Gallery from "@/components/home/Gallery";

/** Gallery items are read from disk on each request so /admin uploads show immediately. */
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Banner />
      <Partners />
      <Services />
      <QuoteSlider />
      <Portfolio />
      <ImageSlider />
      <Stats />
      <Testimonials />
      <Gallery />
      <Showreel />
    </>
  );
}
