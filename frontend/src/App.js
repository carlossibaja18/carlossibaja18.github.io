import { useState } from "react";
import "@/App.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { ProjectModal } from "@/components/ProjectModal";
import { CredentialModal } from "@/components/CredentialModal";
import { Timeline } from "@/components/Timeline";
import { AboutMe } from "@/components/AboutMe";
import { Footer } from "@/components/Footer";
import { ResumeModule } from "@/components/ResumeModule";
import { Toaster } from "@/components/ui/sonner";
import { PROJECTS } from "@/data/portfolio";

const FANUC_PROJECT = PROJECTS.find((p) => p.id === "fanuc-vision-trim-drill-automation");

function App() {
  const [selected, setSelected] = useState(null);
  const [credentialOpen, setCredentialOpen] = useState(false);

  return (
    <div className="App relative">
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero onOpenProject={setSelected} />
        <Skills />
        <Projects onOpen={setSelected} />
        <Timeline onOpen={setSelected} />
        <AboutMe onOpenCredential={() => setCredentialOpen(true)} />
      </main>
      <Footer />
      <ResumeModule />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <CredentialModal
        open={credentialOpen}
        onClose={() => setCredentialOpen(false)}
        onOpenProject={() => {
          setCredentialOpen(false);
          setSelected(FANUC_PROJECT);
        }}
      />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
