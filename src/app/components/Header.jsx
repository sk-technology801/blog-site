"use client"
import { useState, useEffect } from 'react';
import { Search, Menu, X, Bookmark, Bell, User, Home, BookOpen, Users, Zap, Star, PenTool } from 'lucide-react';
import Link from 'next/link';

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(null); // Initialize as null
  const [activeNav, setActiveNav] = useState('Home');
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  // Ensure time is only set on client side
  useEffect(() => {
    setIsClient(true); // Mark as client-side
    setCurrentTime(new Date()); // Set initial time
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, path: '/', gradient: 'from-emerald-600 to-teal-600', color: 'emerald' },
    { name: 'Articles', icon: BookOpen, path: '/articles', gradient: 'from-purple-600 to-indigo-600', color: 'purple' },
    { name: 'Authors', icon: Users, path: '/authors', gradient: 'from-amber-600 to-orange-600', color: 'amber' },
    { name: 'Categories', icon: Zap, path: '/categories', gradient: 'from-cyan-600 to-blue-600', color: 'cyan' },
    { name: 'Featured', icon: Star, path: '/featured', gradient: 'from-pink-600 to-rose-600', color: 'pink' },
    { name: 'Write', icon: PenTool, path: '/write', gradient: 'from-blue-600 to-indigo-600', color: 'blue' },
  ];

  const handleNavClick = (name) => {
    setActiveNav(name);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/15 to-indigo-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header
        className={`relative z-50 transition-all duration-500 ${
          scrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-black text-xl">B</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">StoryHub</h1>
                <p className="text-xs text-teal-400 font-medium tracking-wider">CRAFT YOUR NARRATIVE</p>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative flex items-center bg-white/5 backdrop-blur-md rounded-full px-4 py-2 w-80 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  className="bg-transparent text-white placeholder-gray-500 ml-3 flex-1 outline-none text-sm"
                  aria-label="Search stories"
                />
                <kbd className="hidden xl:inline-flex items-center px-2 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded border">⌘K</kbd>
              </div>

              {/* Live Time */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-emerald-300">
                  {isClient ? currentTime.toLocaleTimeString('en-US', { hour12: true }) : 'Loading...'}
                </span>
                <span className="text-xs text-gray-400">LIVE</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  className="p-2 bg-white/5 rounded-full hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative group"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 group-hover:scale-110 transition-all" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
                </button>
                <button
                  className="p-2 bg-white/5 rounded-full hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                  aria-label="Bookmarks"
                >
                  <Bookmark className="w-5 h-5 text-gray-300 group-hover:text-purple-400 group-hover:scale-110 transition-all" />
                </button>
                <button
                  className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full hover:scale-105 transition-all duration-300 group"
                  aria-label="User Profile"
                >
                  <User className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 bg-white/5 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.name)}
                  className={`relative group px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    activeNav === item.name
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg shadow-${item.color}-500/20`
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300 ${
                      activeNav === item.name ? 'opacity-20' : ''
                    }`}
                  ></div>
                  <div className="relative flex items-center space-x-2">
                    <item.icon
                      className={`w-4 h-4 transition-all ${
                        activeNav === item.name
                          ? 'text-white scale-110'
                          : 'text-gray-400 group-hover:text-white group-hover:scale-110'
                      }`}
                    />
                    <span
                      className={`font-semibold text-sm ${
                        activeNav === item.name ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    {activeNav === item.name && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="https://x.ai/grok"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>Subscribe</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl transition-all duration-500 border-t border-white/10 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 group ${
                    activeNav === item.name
                      ? `bg-gradient-to-r ${item.gradient} shadow-md`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={`w-5 h-5 ${
                        activeNav === item.name ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        activeNav === item.name ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {activeNav === item.name && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-300 font-semibold">12K Online</span>
              </div>
              <Link
                href="https://x.ai/grok"
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full flex items-center space-x-2"
              >
                <Star className="w-4 h-4" />
                <span>Subscribe</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}