import React from "react";
import { Upload, CheckCircle, Shield, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Certificate",
    desc: "Start by uploading your academic or professional certificate to CertiVault’s secure system.",
  },
  {
    icon: CheckCircle,
    title: "Blockchain Verification",
    desc: "CertiVault uses blockchain technology to verify and store an unchangeable proof of your certificate.",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    desc: "Your verified certificate is stored securely, ensuring only authorized access when needed.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    desc: "Generate a unique verification link and share it with employers, schools, or organizations with confidence.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="px-8 md:px-20 py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-700">
        How It Works
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-pink-100 rounded-full"></div>

        <div className="space-y-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                {/* Icon */}
                <div className="relative z-10 bg-pink-900 text-white p-4 rounded-full shadow-lg mx-auto md:mx-0">
                  <Icon size={28} />
                </div>

                {/* Step text */}
                <div className="bg-pink-50 p-6 rounded-2xl shadow-sm md:w-2/3 mx-auto">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
