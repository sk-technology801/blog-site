
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect } from 'react';
import { Tag, Search, PenTool, Star, Filter, Sun, Moon } from 'lucide-react';
import Link from 'next/link';


export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('none'); // none, articleCount, alphabetical
  const [theme, setTheme] = useState('dark');
  const [animatedCounts, setAnimatedCounts] = useState({});

  // Sample category data with tags and preview article (replace with API fetch)
  const categories = [
    {
      id: 1,
      name: 'Technology',
      description: 'Discover stories of tech-driven wonder.',
      articleCount: 42,
      gradient: 'from-teal-300 to-cyan-300',
      color: 'teal',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?_gl=1*1tdwyrr*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjEzMjgxJGo1MSRsMCRoMA..',
      tags: ['Gadgets', 'Innovation', 'Future'],
      previewArticle: { title: 'The Rise of Quantum Computing', snippet: 'A glimpse into the future of processing power.' },
    },
    {
      id: 2,
      name: 'Innovation',
      description: 'Explore tales of creative breakthroughs.',
      articleCount: 35,
      gradient: 'from-lavender-300 to-indigo-300',
      color: 'lavender',
      image: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?_gl=1*1llf1oh*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjEzNTAzJGo5JGwwJGgw',
      tags: ['Creativity', 'Startups', 'Ideas'],
      previewArticle: { title: 'Reimagining Storytelling', snippet: 'How innovation shapes narratives.' },
    },
    {
      id: 3,
      name: 'AI',
      description: 'Dive into AI-powered narrative magic.',
      articleCount: 28,
      gradient: 'from-amber-300 to-orange-300',
      color: 'amber',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?_gl=1*1d40iuc*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjEzMzQ2JGo1MiRsMCRoMA..',
      tags: ['Machine Learning', 'Ethics', 'AI Art'],
      previewArticle: { title: 'AI in Creative Writing', snippet: 'Machines crafting human stories.' },
    },
    {
      id: 4,
      name: 'Metaverse',
      description: 'Wander through virtual story realms.',
      articleCount: 19,
      gradient: 'from-pink-300 to-rose-300',
      color: 'pink',
      image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?_gl=1*1gjub26*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjEzNTg5JGo0OCRsMCRoMA..',
      tags: ['VR', 'Digital Worlds', 'Immersion'],
      previewArticle: { title: 'Living in the Metaverse', snippet: 'A virtual life awaits.' },
    },
    {
      id: 5,
      name: 'Augmented Reality',
      description: 'Experience AR storytelling adventures.',
      articleCount: 15,
      gradient: 'from-lime-300 to-emerald-300',
      color: 'lime',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?_gl=1*1jabrah*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjEzMzk1JGozJGwwJGgw',
      tags: ['AR', 'Interactive', 'Tech'],
      previewArticle: { title: 'AR Story Worlds', snippet: 'Blending reality with tales.' },
    },
  ];

  // Sort and filter categories
  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (filter === 'articleCount') return b.articleCount - a.articleCount;
      if (filter === 'alphabetical') return a.name.localeCompare(b.name);
      return 0;
    });

  // Animate article counts
  useEffect(() => {
    const timers = {};
    categories.forEach((category) => {
      timers[category.id] = setInterval(() => {
        setAnimatedCounts((prev) => ({
          ...prev,
          [category.id]: Math.min(
            prev[category.id] ? prev[category.id] + 1 : 0,
            category.articleCount
          ),
        }));
      }, 80);
    });
    return () => Object.values(timers).forEach(clearInterval);
  }, [categories]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-800' : 'bg-gradient-to-br from-gray-100 via-slate-200 to-gray-200'}`}>
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0)_2%)] bg-repeat bg-[length:20px_20px] animate-twinkle"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-teal-300/15 to-cyan-300/15 rounded-full blur-2xl animate-aurora"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-lavender-300/10 to-indigo-300/10 rounded-full blur-2xl animate-aurora delay-1000"></div>
      </div>

      {/* Header with Theme Toggle */}
      
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gradient-to-r from-teal-300/30 to-cyan-300/30 hover:scale-110 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-300 animate-pulse" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-300 animate-pulse" />
          )}
        </button>
      

      {/* Categories Section */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-10">
          {/* Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full border border-teal-300/30">
              <Star className="w-5 h-5 text-cyan-200 animate-spin-slow" />
              <h1 className={`text-2xl sm:text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Explore Cosmic Realms
              </h1>
            </div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} max-w-2xl mx-auto`}>
              Journey through enchanting story worlds filled with wonder.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-xl opacity-50 hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-3 border border-teal-300/30 hover:border-cyan-300/50 transition-all duration-500">
                <Search className="w-5 h-5 text-cyan-200 animate-pulse" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search story realms..."
                  className={`bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-300' : 'text-gray-900 placeholder-gray-500'} ml-3 flex-1 outline-none text-sm`}
                  aria-label="Search categories"
                />
              </div>
            </div>
            <div className="relative group">
              <button
                className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full border border-teal-300/30 hover:border-cyan-300/50 transition-all duration-500"
                aria-label="Toggle filter menu"
              >
                <Filter className="w-5 h-5 text-cyan-200 mr-2" />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Filter</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <button
                  onClick={() => setFilter('none')}
                  className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  No Filter
                </button>
                <button
                  onClick={() => setFilter('articleCount')}
                  className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Most Stories
                </button>
                <button
                  onClick={() => setFilter('alphabetical')}
                  className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Alphabetical
                </button>
              </div>
            </div>
          </div>

          {/* Masonry Category Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/articles?category=${category.name}`}
                  className={`group relative bg-gray-800/50 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-${category.color}-300/40 transition-all duration-500 hover:scale-105 mb-6 break-inside-avoid`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-[20px]`}></div>
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover rounded-t-[20px] transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-5 space-y-3">
                      <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white group-hover:text-cyan-200' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>
                        {category.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'} line-clamp-2`}>{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                          {animatedCounts[category.id] || 0} Stories
                        </span>
                        <Tag className="w-4 h-4 text-cyan-200 animate-pulse" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-1 bg-${category.color}-300/20 rounded-full ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'} group-hover:bg-${category.color}-300/40 transition-all duration-300`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Article Preview */}
                      <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-5">
                        <div className="text-center">
                          <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {category.previewArticle.title}
                          </h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 mt-1`}>
                            {category.previewArticle.snippet}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className={`text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'} col-span-full`}>No story realms found.</p>
            )}
          </div>

          {/* Playful CTA */}
          <div className="text-center">
            <Link
              href="/write"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-300 to-rose-300 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative"
            >
              <PenTool className="w-5 h-5 mr-2 animate-pulse" />
              <span>Spin Your Tale</span>
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent dark:bg-gradient-to-t dark:from-gray-900 dark:to-transparent"></div>
    </div>
  );
}
