import { useState } from "react";
import "@/App.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ProjectModal } from "@/components/ProjectModal";
import { Timeline } from "@/components/Timeline";
import { AboutMe } from "@/components/AboutMe";
import { Footer } from "@/components/Footer";
import { ResumeModule } from "@/components/ResumeModule";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App relative">
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero onOpenProject={setSelected} />
        <Projects onOpen={setSelected} />
        <Timeline onOpen={setSelected} />
        <AboutMe />
      </main>
      <Footer />
      <ResumeModule />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
