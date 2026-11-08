import Cloth from "@/components/Cloth";
import Contact from "@/components/Contact";
import Folio from "@/components/Folio";
import Hero from "@/components/Hero";
import Lookbook from "@/components/Lookbook";
import Manifesto from "@/components/Manifesto";
import SmoothScroll from "@/components/SmoothScroll";
import Studio from "@/components/Studio";
import { LookProvider } from "@/lib/look-context";

export default function Home() {
  return (
    <LookProvider>
      <SmoothScroll />
      <Folio />
      <main className="page">
        <Hero />
        <Manifesto />
        <Cloth />
        <Studio />
        <Lookbook />
        <Contact />
      </main>
    </LookProvider>
  );
}
