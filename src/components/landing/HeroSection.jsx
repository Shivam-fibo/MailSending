import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50  py-16">
      <div className="container mx-auto px-4 text-center">
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extraboldleading-tight">
          Send Bulk Emails Fast
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold  ">
          Reach Every Inbox Easy
        </h2>
            <p className="my-4  text-slate-400">10x your mail sending feature</p>

        {/* Button */}
        <button className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition">
          Get Started Free
        </button>

        {/* Small Text */}
        <p className="text-slate-500 italic text-sm mt-3">
          No credit card required
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
