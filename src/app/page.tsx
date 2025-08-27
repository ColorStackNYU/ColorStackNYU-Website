"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import getConnected from "../components/getConnected";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              ColorStack
              <span className="m-2 p-3 rounded-xl bg-[#43048a] shadow-2xl shadow-white/10">NYU</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              The largest community of Black and Latino students in tech at NYU
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:shadow-2xl">
                Join Our Community
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
              <button className="border-2 border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">Our Mission</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Dedicated to increasing the number of Black and Latinx Computer Science graduates who go on to launch rewarding technical careers
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-white text-lg">Professional Development</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-white text-lg">Technical Workshops</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-white text-lg">Mentorship Programs</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 backdrop-blur-lg border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">💻</div>
                    <div className="text-white font-semibold">Coding</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">🤝</div>
                    <div className="text-white font-semibold">Networking</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <div className="text-white font-semibold">Learning</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">🚀</div>
                    <div className="text-white font-semibold">Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <getConnected />  */}

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r flex items-center justify-center">
                  <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md" />
                </div>
                <h3 className="text-2xl font-bold text-white">ColorStackNYU</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Empowering the next generation of Black and Latino technologists at NYU and beyond.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="#about" className="block text-white/70 hover:text-white transition-colors">About Us</a>
                <a href="#events" className="block text-white/70 hover:text-white transition-colors">Events</a>
                <a href="#resources" className="block text-white/70 hover:text-white transition-colors">Resources</a>
                <a href="#contact" className="block text-white/70 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Instagram</a>
                <a href="https://www.instagram.com/colorstacknyu/" className="block text-white/70 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}