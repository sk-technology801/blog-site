
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect } from 'react';
import { Twitter, Github, Globe, Star, Rocket, Send, Sparkles } from 'lucide-react'; // Added Sparkles
import Link from 'next/link';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        hour12: true,
        timeZone: 'Asia/Karachi',
      });
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle easter egg click
  const handleEasterEggClick = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 2000); // Hide after 2 seconds
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-950 to-slate-900 text-gray-200 py-12">
      {/* Cosmic Nebula Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_2%)] bg-repeat bg-[length:12px_12px] animate-twinkle"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-nebula"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-lavender-400/15 to-indigo-400/15 rounded-full blur-3xl animate-nebula delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Easter Egg */}
      <button
        onClick={handleEasterEggClick}
        className="absolute top-4 right-4 z-50"
        aria-label="Trigger cosmic easter egg"
      >
        <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" />
      </button>
      {showEasterEgg && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-comet-trail"></div>
      )}

      {/* Footer Content */}
      <div className="relative z-40 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Explore</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Features', href: '/features' },
                { name: 'Categories', href: '/categories' },
                { name: 'Authors', href: '/authors' },
                { name: 'Write', href: '/write' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-200 hover:text-cyan-300 transition-all duration-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/yourblog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-200 hover:text-teal-100"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 animate-orbit-0" />
              </a>
              <a
                href="https://office-wmem.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-200 hover:text-teal-100"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 animate-orbit-1" />
              </a>
              <a
                href="https://github.com/sk-technology801?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-200 hover:text-teal-100"
                aria-label="Website"
              >
                <Globe className="w-6 h-6 animate-orbit-2" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Stay Cosmic</h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full bg-gray-900/50 rounded-full border border-teal-400/40 text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60"
                aria-label="Newsletter email"
              />
              <Send className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-200" />
            </div>
            <button
              className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-500 relative overflow-hidden group"
              aria-label="Subscribe to newsletter"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Subscribe
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Contact</h3>
            <p className="text-sm text-gray-200">
              Email: <a href="mailto:contact@yourblog.com" className="hover:text-cyan-300">contact@yourblog.com</a>
            </p>
            <p className="text-sm text-gray-200">Current Time (PKT): {currentTime}</p>
          </div>
        </div>

        {/* CTA and Copyright */}
        <div className="mt-12 text-center space-y-4">
          <Link
            href="/signup"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative overflow-hidden group"
          >
            <Rocket className="w-5 h-5 mr-2 animate-pulse" />
            <span>Join the Cosmos</span>
            <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
          </Link>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Cosmic Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
