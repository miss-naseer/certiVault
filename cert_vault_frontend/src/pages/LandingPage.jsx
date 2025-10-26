// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SolutionSection from "../components/SolutionSection";
import HowItWorks from "../components/HowItWorksSection";
import Footer from "../components/Footer";
import ProblemSection from "../components/problemSection";  

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <ProblemSection/>
      <SolutionSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
