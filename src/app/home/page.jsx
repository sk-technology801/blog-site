"use client"
import { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, Star, ArrowRight, Mail, Users, Globe } from 'lucide-react';
import Link from 'next/link';


export default function HomePage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
  const storyRef = useRef(null);
  const authorRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Sample data (replace with API fetch in production)
  const featuredStories = [
    {
      id: 1,
      title: 'Quantum Narratives: Stories Beyond Reality',
      excerpt: 'Explore how quantum computing is redefining storytelling dimensions.',
      author: 'Zara Quinn',
      image: 'https://images.pexels.com/photos/7184482/pexels-photo-7184482.jpeg?_gl=1*sh2uxh*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjA5NTg4JGo0NCRsMCRoMA..',
      gradient: 'from-emerald-700 to-teal-700',
      color: 'emerald',
    },
    {
      id: 2,
      title: 'Holographic Tales: The Next Frontier',
      excerpt: 'Dive into the immersive world of holographic storytelling.',
      author: 'Liam Vortex',
      image: 'https://images.pexels.com/photos/29832996/pexels-photo-29832996.jpeg?_gl=1*1elhk1m*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjA5Njc4JGoxNiRsMCRoMA..',
      gradient: 'from-purple-700 to-indigo-700',
      color: 'purple',
    },
    {
      id: 3,
      title: 'Neural Networks & Narratives',
      excerpt: 'How AI-driven stories are shaping human creativity.',
      author: 'Maya Flux',
      image: 'https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?_gl=1*1b42q0f*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjA5ODA3JGoxOSRsMCRoMA..',
      gradient: 'from-amber-700 to-orange-700',
      color: 'amber',
    },
  ];

  const trendingAuthors = [
    {
      id: 1,
      name: 'Zara Quinn',
      bio: 'Quantum storytelling pioneer',
      avatar: 'https://images.pexels.com/photos/7184482/pexels-photo-7184482.jpeg?_gl=1*2jfc2e*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyNjA1MzkkbzM4JGcxJHQxNzUzMjYwNzkyJGo1OSRsMCRoMA..',
      stories: 52,
    },
    {
      id: 2,
      name: 'Liam Vortex',
      bio: 'Holographic narrative expert',
      avatar: 'https://images.pexels.com/photos/19797389/pexels-photo-19797389.jpeg?_gl=1*1a37irv*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyNjA1MzkkbzM4JGcxJHQxNzUzMjYwODk3JGo0NiRsMCRoMA..',
      stories: 39,
    },
    {
      id: 3,
      name: 'Maya Flux',
      bio: 'AI-driven story architect',
      avatar: 'https://images.pexels.com/photos/3546605/pexels-photo-3546605.jpeg?_gl=1*8n1310*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyNjA1MzkkbzM4JGcxJHQxNzUzMjYwOTUzJGo1OSRsMCRoMA..',
      stories: 45,
    },
  ];

  // Carousel auto-scroll for stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % featuredStories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredStories.length]);

  // Carousel auto-scroll for authors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAuthorIndex((prev) => (prev + 1) % trendingAuthors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingAuthors.length]);

  // Scroll to current story
  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollTo({
        left: currentStoryIndex * storyRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentStoryIndex]);

  // Scroll to current author
  useEffect(() => {
    if (authorRef.current) {
      authorRef.current.scrollTo({
        left: currentAuthorIndex * authorRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentAuthorIndex]);

  // Newsletter submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail('');
    setSubmitting(false);
    setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-700/20 to-teal-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-700/15 to-indigo-700/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-gradient-to-r from-amber-700/10 to-orange-700/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-700/15 to-blue-700/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      

      {/* Hero Section with 3D Globe */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-28">
        <div className="text-center space-y-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/30 to-teal-700/30 rounded-full blur-xl animate-pulse"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-emerald-700/40 to-teal-700/40 rounded-full border border-emerald-600/50">
              <span className="text-emerald-300 text-sm font-bold tracking-wide flex items-center space-x-2">
                <Globe className="w-5 h-5 animate-spin-slow" />
                <span>GLOBAL NARRATIVES</span>
              </span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-tight">
            Weave Your
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient relative">
              Cosmic Story
              <div className="absolute inset-0 transform rotate-x-45deg scale-75 opacity-20">
                <Globe className="w-full h-full text-cyan-400 animate-spin-slow" />
              </div>
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
            Embark on a journey where stories transcend boundaries, powered by innovation and imagination.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/articles"
              className="group px-10 py-4 bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold rounded-full hover:scale-110 transition-all duration-500 shadow-2xl shadow-emerald-700/40 flex items-center space-x-3"
            >
              <BookOpen className="w-6 h-6 group-hover:scale-125 transition-transform" />
              <span>Uncover Stories</span>
            </Link>
            <Link
              href="/write"
              className="group px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-500 border border-white/20 hover:border-cyan-400/50 flex items-center space-x-3"
            >
              <PenTool className="w-6 h-6 group-hover:scale-125 transition-transform" />
              <span>Create Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stories Parallax Section */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
          Stellar Stories
        </h2>
        <div
          ref={storyRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredStories.map((story, index) => (
            <Link
              key={story.id}
              href={`/articles/${story.id}`}
              className={`flex-none w-full sm:w-1/2 lg:w-1/3 snap-center p-4 group relative bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 hover:border-${story.color}-600/50 transition-all duration-500 hover:scale-105 transform hover:-rotate-2 hover:shadow-2xl hover:shadow-${story.color}-600/30`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${story.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{story.excerpt}</p>
                  <p className="text-gray-400 text-xs">By {story.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-3">
          {featuredStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStoryIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentStoryIndex ? 'bg-cyan-400 scale-150' : 'bg-gray-600'
              }`}
              aria-label={`Go to story ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Trending Authors 3D Slider */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
          Cosmic Creators
        </h2>
        <div
          ref={authorRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingAuthors.map((author, index) => (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className={`flex-none w-full sm:w-1/2 lg:w-1/3 snap-center p-4 group relative bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-600/30 transform perspective-1000 group-hover:rotate-y-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 to-indigo-700/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative p-6 flex items-center space-x-5">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-600/50 group-hover:border-cyan-400 transform group-hover:scale-110 transition-all duration-500"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {author.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{author.bio}</p>
                  <p className="text-gray-400 text-xs">{author.stories} Stories</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-3">
          {trendingAuthors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAuthorIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentAuthorIndex ? 'bg-cyan-400 scale-150' : 'bg-gray-600'
              }`}
              aria-label={`Go to author ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Newsletter Signup with Animation */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-20">
        <div className="text-center space-y-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-white/10 p-10 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Join the Cosmic Narrative
          </h2>
          <p className="text-lg text-gray-200 max-w-xl mx-auto">
            Subscribe to receive stellar stories and cosmic updates directly in your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-cyan-400 animate-pulse" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your cosmic email"
                className="w-full pl-14 pr-4 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full border border-white/20 focus:border-cyan-400/60 outline-none transition-all duration-500 focus:ring-2 focus:ring-cyan-400/40"
                required
                aria-label="Email for newsletter"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-full hover:scale-110 transition-all duration-500 relative overflow-hidden ${
                submitting ? 'opacity-50' : ''
              } ${subscribed ? 'animate-success' : ''}`}
            >
              <span>{submitting ? 'Subscribing...' : subscribed ? 'Subscribed!' : 'Join Now'}</span>
              {subscribed && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </div>
  );
}