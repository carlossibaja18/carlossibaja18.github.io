import "@/App.css";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App relative">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
