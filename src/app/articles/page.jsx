
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Search, Tag, PenTool, Sparkles } from 'lucide-react';
import Link from 'next/link';


export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleArticles, setVisibleArticles] = useState(6);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Sample article data (replace with API fetch in production)
  const articles = [
    {
      id: 1,
      title: 'Stardust Stories: Crafting Magic with Code',
      excerpt: 'Discover how coding weaves enchanting tales in the digital cosmos.',
      author: 'Luna Starlight',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/2954199/pexels-photo-2954199.jpeg?_gl=1*1pbrfhb*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExMDA1JGo1MCRsMCRoMA..',
      gradient: 'from-teal-400 to-cyan-400',
      color: 'teal',
      date: '2025-07-20',
      height: 'h-96',
    },
    {
      id: 2,
      title: 'Dreamy Holograms: A Playful Narrative',
      excerpt: 'Explore the whimsical world of holographic storytelling.',
      author: 'Orion Spark',
      category: 'Innovation',
      image: 'https://images.pexels.com/photos/3166841/pexels-photo-3166841.jpeg?_gl=1*12in3de*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExMTE0JGo2JGwwJGgw',
      gradient: 'from-purple-400 to-indigo-400',
      color: 'purple',
      date: '2025-07-18',
      height: 'h-80',
    },
    {
      id: 3,
      title: 'AI Whispers: Tales from the Future',
      excerpt: 'Listen to the gentle hum of AI crafting creative stories.',
      author: 'Nova Breeze',
      category: 'AI',
      image: 'https://images.pexels.com/photos/5473957/pexels-photo-5473957.jpeg?_gl=1*7u6857*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExMjIwJGoxNyRsMCRoMA..',
      gradient: 'from-amber-400 to-orange-400',
      color: 'amber',
      date: '2025-07-15',
      height: 'h-104',
    },
    {
      id: 4,
      title: 'Metaverse Meadows: Storytelling Adventures',
      excerpt: 'Wander through vibrant metaverse fields filled with stories.',
      author: 'Luna Starlight',
      category: 'Metaverse',
      image: 'https://images.pexels.com/photos/1741231/pexels-photo-1741231.jpeg?_gl=1*rse92c*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExMzM5JGoyOSRsMCRoMA..',
      gradient: 'from-pink-400 to-rose-400',
      color: 'pink',
      date: '2025-07-10',
      height: 'h-80',
    },
    {
      id: 5,
      title: 'Neural Dreams: Where Minds Meet Stories',
      excerpt: 'A playful fusion of neural networks and narrative magic.',
      author: 'Orion Spark',
      category: 'AI',
      image: 'https://images.pexels.com/photos/6956352/pexels-photo-6956352.jpeg?_gl=1*mntvdf*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExNDA0JGo0MSRsMCRoMA..',
      gradient: 'from-cyan-400 to-blue-400',
      color: 'cyan',
      date: '2025-07-05',
      height: 'h-96',
    },
    {
      id: 6,
      title: 'Augmented Wonders: Stories in AR',
      excerpt: 'Dance through augmented reality with whimsical narratives.',
      author: 'Nova Breeze',
      category: 'Innovation',
      image: 'https://images.pexels.com/photos/1809651/pexels-photo-1809651.jpeg?_gl=1*x0fcxj*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMDk0OTIkbzM2JGcxJHQxNzUzMjExNjA5JGoyMiRsMCRoMA..',
      gradient: 'from-lime-400 to-emerald-400',
      color: 'lime',
      date: '2025-07-01',
      height: 'h-104',
    },
  ];

  // Sample categories
  const categories = ['All', 'Technology', 'Innovation', 'AI', 'Metaverse'];

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleArticles < filteredArticles.length) {
          setVisibleArticles((prev) => prev + 6);
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredArticles.length, visibleArticles]);

  // Reset visible articles when filters change
  useEffect(() => {
    setVisibleArticles(6);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-800">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-float delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-gradient-to-r from-lime-400/15 to-emerald-400/15 rounded-full blur-3xl animate-float delay-3000"></div>
      </div>

      

      {/* Articles Section */}
      <section className="relative z-40 container mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-8">
              {/* Floating Search Bar */}
              <div className="relative group max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative flex items-center bg-white/10 backdrop-blur-lg rounded-full px-4 py-3 border border-teal-400/40 group-hover:border-cyan-400/60 transition-all duration-500">
                  <Search className="w-5 h-5 text-cyan-300 animate-pulse" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cosmic stories..."
                    className="bg-transparent text-white placeholder-gray-400 ml-3 flex-1 outline-none text-sm"
                    aria-label="Search articles"
                  />
                </div>
              </div>

              {/* Article Masonry Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredArticles.slice(0, visibleArticles).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className={`group relative bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-${article.color}-400/50 transition-all duration-500 hover:scale-105 transform perspective-1000 hover:rotate-y-3 hover:shadow-2xl hover:shadow-${article.color}-400/30 break-inside-avoid ${article.height}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${article.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`}></div>
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-t-3xl transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="p-5 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-gray-300 animate-pulse" />
                          <span className="text-xs text-gray-300">{article.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-200 text-sm line-clamp-2">{article.excerpt}</p>
                        <div className="flex justify-between text-xs text-gray-300">
                          <span>By {article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {filteredArticles.length === 0 && (
                  <p className="text-center text-gray-400 col-span-full">No stories found in the cosmos.</p>
                )}
              </div>

              {/* Load More Trigger */}
              {visibleArticles < filteredArticles.length && (
                <div ref={loadMoreRef} className="h-10"></div>
              )}
            </div>
          </div>

          {/* Sidebar with Orbiting Categories */}
          <aside className="lg:w-80 space-y-8">
            <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                <span>Explore Categories</span>
              </h3>
              <div className="relative">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-3 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-white'
                        : 'bg-white/10 text-gray-200 hover:bg-white/20'
                    } animate-orbit-${index}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Weave Your Story</h3>
              <p className="text-gray-200 text-sm mb-4">
                Sprinkle your magic and join our cosmic community of storytellers.
              </p>
              <Link
                href="/write"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold rounded-full hover:scale-110 transition-all duration-500 animate-bounce-slow"
              >
                <PenTool className="w-5 h-5 mr-2 animate-pulse" />
                <span>Start Crafting</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
}
