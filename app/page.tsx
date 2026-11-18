import About from "@/components/About";
import BotanicalDefs from "@/components/BotanicalDefs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Garden from "@/components/Garden";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { projects } from "@/content/portfolio";
import { withExistingImage } from "@/lib/projectImages";

export default function Home() {
  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <BotanicalDefs />
      <Header />
      <main id="contenu">
        <Hero />
        <Garden projects={projects.map(withExistingImage)} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
