
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect, useRef } from 'react';
import { PenTool, Star, Users, BarChart, Filter, Sparkles, Rocket } from 'lucide-react';
import Link from 'next/link';


export default function FeaturesPage() {
  const [filter, setFilter] = useState('all'); // all, writing, community, analytics, technology, ai, metaverse
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [gaugeValues, setGaugeValues] = useState({});
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Sample feature data with category tags (replace with API fetch)
  const features = [
    {
      id: 1,
      name: 'Rich Text Editor',
      description: 'Craft stories with an AI-powered editor featuring real-time previews and suggestions.',
      type: 'writing',
      category: 'Technology',
      icon: PenTool,
      usage: 85,
      gradient: 'from-teal-400 to-cyan-400',
      color: 'teal',
      tooltip: 'Spell-check, markdown, and AI-driven content suggestions.',
      demoLink: '/demo/editor',
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Community Hub',
      description: 'Connect with storytellers in an interactive cosmic community.',
      type: 'community',
      category: 'Metaverse',
      icon: Users,
      usage: 70,
      gradient: 'from-lavender-400 to-indigo-400',
      color: 'lavender',
      tooltip: 'Share, discuss, and collaborate on stories.',
      demoLink: '/demo/community',
      isFeatured: false,
    },
    {
      id: 3,
      name: 'Story Analytics',
      description: 'Track your story’s reach with real-time analytics dashboards.',
      type: 'analytics',
      category: 'AI',
      icon: BarChart,
      usage: 60,
      gradient: 'from-amber-400 to-orange-400',
      color: 'amber',
      tooltip: 'Views, engagement, and audience insights.',
      demoLink: '/demo/analytics',
      isFeatured: true,
    },
    {
      id: 4,
      name: 'Cosmic Themes',
      description: 'Personalize your blog with galaxy-inspired themes.',
      type: 'writing',
      category: 'Augmented Reality',
      icon: Star,
      usage: 75,
      gradient: 'from-pink-400 to-rose-400',
      color: 'pink',
      tooltip: 'Light, dark, and custom pastel themes.',
      demoLink: '/demo/themes',
      isFeatured: false,
    },
  ];

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      quote: 'The editor is like writing in a starship—pure magic!',
      author: 'Stella, Cosmic Writer',
      details: 'The AI suggestions helped me craft my best story yet.',
    },
    {
      id: 2,
      quote: 'The community hub is my new favorite galaxy.',
      author: 'Luna, Storyteller',
      details: 'Connecting with other writers feels so inspiring.',
    },
    {
      id: 3,
      quote: 'Analytics took my stories to new orbits!',
      author: 'Orion, Blogger',
      details: 'The insights helped me understand my audience better.',
    },
  ];

  // Filter features
  const filteredFeatures = features.filter(
    (feature) =>
      filter === 'all' ||
      feature.type === filter ||
      feature.category.toLowerCase() === filter.toLowerCase()
  );

  // Animate gauge values
  useEffect(() => {
    const timers = {};
    features.forEach((feature) => {
      timers[feature.id] = setInterval(() => {
        setGaugeValues((prev) => ({
          ...prev,
          [feature.id]: Math.min(
            prev[feature.id] ? prev[feature.id] + 1 : 0,
            feature.usage
          ),
        }));
      }, 40);
    });
    return () => Object.values(timers).forEach(clearInterval);
  }, [features]);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle carousel rotation
  const rotateCarousel = (direction) => {
    setCurrentTestimonial((prev) =>
      direction === 'next'
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Cosmic Nebula Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_2%)] bg-repeat bg-[length:15px_15px] animate-twinkle"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-nebula"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-lavender-400/15 to-indigo-400/15 rounded-full blur-3xl animate-nebula delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      

      {/* Features Section */}
      <section ref={sectionRef} className="relative z-40 container mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-16">
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 animate-pulse">
              <Sparkles className="w-6 h-6 text-cyan-300 animate-spin-slow" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                Unleash Stellar Features
              </h1>
            </div>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Explore tools that ignite your storytelling cosmos.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center">
            <div className="relative group max-w-xs z-50">
              <button
                className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 hover:border-cyan-400/60 transition-all duration-500"
                aria-label="Toggle feature filter menu"
              >
                <Filter className="w-5 h-5 text-cyan-300 mr-2" />
                <span className="text-white">Filter Features</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                {['all', 'writing', 'community', 'analytics', 'technology', 'ai', 'metaverse'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 capitalize"
                  >
                    {option === 'all' ? 'All Features' : option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Spotlight */}
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-[20px] p-8 border border-teal-400/40 mb-12">
            <h2 className="text-2xl font-medium text-white mb-6 text-center">Featured Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features
                .filter((feature) => feature.isFeatured)
                .map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className={`relative bg-gray-900/50 rounded-[20px] p-6 border border-${feature.color}-400/40 hover:shadow-${feature.color}-400/30 transition-all duration-700 animate-pulse-slow group`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-[20px]`}></div>
                      <div className="relative flex items-center space-x-4">
                        <Icon className={`w-8 h-8 text-${feature.color}-200 animate-pulse`} />
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-cyan-300">
                            {feature.name}
                          </h3>
                          <p className="text-sm text-gray-200">{feature.tooltip}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* 3D Feature Carousel */}
          <div className="relative flex justify-center items-center min-h-[600px] sm:min-h-[400px]">
            <div className="relative w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className={`relative bg-gray-800/60 backdrop-blur-lg rounded-full border border-white/10 hover:border-${feature.color}-400/50 transition-all duration-700 hover:scale-110 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } transition-all duration-1000 delay-${index * 200}`}
                    style={{ zIndex: 10 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full`}></div>
                    <div className="relative p-6 space-y-4 text-center">
                      <Icon className={`w-10 h-10 text-${feature.color}-200 animate-pulse mx-auto`} />
                      <h3 className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2">{feature.description}</p>
                      <div className="relative">
                        <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700/50 flex items-center justify-center">
                          <div
                            className={`text-xs text-${feature.color}-200 font-medium`}
                            style={{
                              background: `conic-gradient(${feature.color}-400 ${gaugeValues[feature.id] || 0}%, transparent ${gaugeValues[feature.id] || 0}%)`,
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {gaugeValues[feature.id] || 0}%
                          </div>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center p-4">
                          <p className="text-xs text-gray-200">{feature.tooltip}</p>
                        </div>
                      </div>
                      <Link
                        href={feature.demoLink}
                        className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${feature.gradient} text-white text-sm rounded-full hover:scale-105 transition-all duration-500`}
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        Try Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonial Nebula */}
          <div className="relative max-w-3xl mx-auto text-center mt-16">
            <div className="relative bg-gray-800/60 backdrop-blur-lg rounded-[20px] p-8 border border-teal-400/40 transition-all duration-500">
              <Star className="absolute -top-3 -right-3 w-6 h-6 text-yellow-300 animate-spin-slow" />
              <p className="text-gray-200 italic text-base mb-4">{testimonials[currentTestimonial].quote}</p>
              <p className="text-gray-300 text-sm font-medium">{testimonials[currentTestimonial].author}</p>
              <button
                onClick={() => setExpandedTestimonial(currentTestimonial)}
                className="mt-4 text-cyan-300 text-sm underline hover:text-cyan-200 transition-colors"
                aria-label={`Expand testimonial by ${testimonials[currentTestimonial].author}`}
              >
                Read More
              </button>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => rotateCarousel('prev')}
                className="p-2 rounded-full bg-teal-400/30 hover:bg-teal-400/50 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <Star className="w-4 h-4 text-cyan-300" />
              </button>
              <button
                onClick={() => rotateCarousel('next')}
                className="p-2 rounded-full bg-teal-400/30 hover:bg-teal-400/50 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <Star className="w-4 h-4 text-cyan-300" />
              </button>
            </div>
            {expandedTestimonial !== null && (
              <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gray-800/90 rounded-[20px] p-8 max-w-md w-full mx-4 border border-teal-400/40">
                  <Star className="absolute -top-3 -right-3 w-6 h-6 text-yellow-300 animate-spin-slow" />
                  <p className="text-gray-200 italic text-base mb-4">{testimonials[expandedTestimonial].quote}</p>
                  <p className="text-gray-200 text-sm mb-4">{testimonials[expandedTestimonial].details}</p>
                  <p className="text-gray-300 text-sm font-medium">{testimonials[expandedTestimonial].author}</p>
                  <button
                    onClick={() => setExpandedTestimonial(null)}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-500"
                    aria-label="Close testimonial modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Playful CTA */}
          <div className="text-center relative mt-16">
            <Link
              href="/write"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative overflow-hidden group"
            >
              <PenTool className="w-5 h-5 mr-2 animate-pulse" />
              <span>Launch Your Cosmos</span>
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </div>
  );
}
