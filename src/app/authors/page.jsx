
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect, useRef } from 'react';
import { User, Star, Filter, Sparkles, Rocket, Twitter, Github, Globe } from 'lucide-react';
import Link from 'next/link';


export default function AuthorsPage() {
  const [filter, setFilter] = useState('all'); // all, technology, innovation, ai, metaverse, augmented reality
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Sample author data (replace with API fetch)
  const authors = [
    {
      id: 1,
      name: 'Stella Nova',
      bio: 'A cosmic storyteller weaving tales of AI and the metaverse.',
      categories: ['AI', 'Metaverse'],
      posts: 25,
      engagement: 80,
      avatar: 'https://images.pexels.com/photos/8193488/pexels-photo-8193488.jpeg?_gl=1*1ko0h69*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMTYwMzIkbzM3JGcxJHQxNzUzMjE2MDYzJGoyOSRsMCRoMA..', // Replace with real image path
      social: { twitter: 'stellanova', github: 'https://github.com/sk-technology801?tab=repositories', website: 'https://office-wmem.vercel.app/' },
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Luna Spark',
      bio: 'Exploring the frontiers of technology with a creative twist.',
      categories: ['Technology', 'Innovation'],
      posts: 15,
      engagement: 65,
      avatar: 'https://images.pexels.com/photos/19590514/pexels-photo-19590514.jpeg?_gl=1*iinw45*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMTYwMzIkbzM3JGcxJHQxNzUzMjE2MzA3JGo0OCRsMCRoMA..',
      social: { twitter: 'lunaspark', github: 'https://github.com/sk-technology801?tab=repositories',  website: 'https://hub-orpin.vercel.app/' },
      isFeatured: false,
    },
    {
      id: 3,
      name: 'Orion Blaze',
      bio: 'Crafting immersive stories in augmented reality.',
      categories: ['Augmented Reality', 'Technology'],
      posts: 10,
      engagement: 70,
      avatar: 'https://images.pexels.com/photos/3422053/pexels-photo-3422053.jpeg?_gl=1*1jv2ek5*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMyMTYwMzIkbzM3JGcxJHQxNzUzMjE2NDc4JGoyOSRsMCRoMA..',
      social: { twitter: 'orionblaze', github: 'https://github.com/sk-technology801?tab=repositories', website: 'https://own-portfolio-blond.vercel.app/' },
      isFeatured: false,
    },
  ];

  // Sample category data (sync with CategoriesPage.jsx, replace with API fetch)
  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Innovation' },
    { id: 3, name: 'AI' },
    { id: 4, name: 'Metaverse' },
    { id: 5, name: 'Augmented Reality' },
  ];

  // Filter and search authors
  const filteredAuthors = authors.filter(
    (author) =>
      (filter === 'all' || author.categories.includes(filter)) &&
      (searchQuery === '' ||
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Cosmic Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_2%)] bg-repeat bg-[length:12px_12px] animate-twinkle"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-teal-400/25 to-cyan-400/25 rounded-full blur-3xl animate-nebula"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-lavender-400/20 to-indigo-400/20 rounded-full blur-3xl animate-nebula delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/15 to-rose-400/15 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      

      {/* Authors Section */}
      <section ref={sectionRef} className="relative z-40 container mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-12">
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 animate-pulse">
              <Sparkles className="w-6 h-6 text-cyan-300 animate-spin-slow" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                Meet Our Cosmic Authors
              </h1>
            </div>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Discover the storytellers lighting up our universe.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search authors..."
                className="w-full bg-gray-900/50 rounded-full border border-teal-400/40 text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60"
                aria-label="Search authors"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-200" />
            </div>
            <div className="relative group max-w-xs w-full">
              <button
                className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 hover:border-cyan-400/60 transition-all duration-500 w-full"
                aria-label="Toggle category filter"
              >
                <Filter className="w-5 h-5 text-cyan-300 mr-2" />
                <span className="text-white">Filter by Category</span>
              </button>
              <div className="absolute left-0 mt-2 w-full bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <button
                  onClick={() => setFilter('all')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  All Authors
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Author Spotlight */}
          {authors.find((author) => author.isFeatured) && (
            <div className="relative bg-gray-800/50 backdrop-blur-md rounded-[20px] p-8 border border-teal-400/40 mb-12">
              <h2 className="text-2xl font-medium text-white mb-6 text-center">Author Spotlight</h2>
              {authors
                .filter((author) => author.isFeatured)
                .map((author) => (
                  <div
                    key={author.id}
                    className="flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400/50 animate-pulse-slow">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                      <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin-slow" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-medium text-white">{author.name}</h3>
                      <p className="text-sm text-gray-200 mt-2">{author.bio}</p>
                      <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                        {author.social.twitter && (
                          <a
                            href={`https://twitter.com/${author.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-200 hover:text-teal-100"
                            aria-label={`${author.name}'s Twitter`}
                          >
                            <Twitter className="w-5 h-5 animate-orbit-0" />
                          </a>
                        )}
                        {author.social.github && (
                          <a
                            href={`https://github.com/${author.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-200 hover:text-teal-100"
                            aria-label={`${author.name}'s GitHub`}
                          >
                            <Github className="w-5 h-5 animate-orbit-1" />
                          </a>
                        )}
                        {author.social.website && (
                          <a
                            href={author.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-200 hover:text-teal-100"
                            aria-label={`${author.name}'s Website`}
                          >
                            <Globe className="w-5 h-5 animate-orbit-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Authors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuthors.map((author, index) => (
              <div
                key={author.id}
                className={`relative bg-gray-800/60 backdrop-blur-lg rounded-[20px] border border-teal-400/40 group hover:shadow-teal-400/30 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-1000 delay-${index * 200}`}
                style={{ zIndex: 10 }}
              >
                {/* Front Face */}
                <div className="relative p-6 text-center group-hover:opacity-0 group-hover:rotate-y-180 transition-all duration-700">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-teal-400/50">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-white mt-4">{author.name}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{author.bio}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-700/50 flex items-center justify-center">
                      <div
                        className="text-xs text-teal-200 font-medium"
                        style={{
                          background: `conic-gradient(teal-400 ${Math.min(author.posts * 4, 100)}%, transparent ${Math.min(author.posts * 4, 100)}%)`,
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {author.posts} Posts
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-700/50 flex items-center justify-center">
                      <div
                        className="text-xs text-lavender-200 font-medium"
                        style={{
                          background: `conic-gradient(lavender-400 ${author.engagement}%, transparent ${author.engagement}%)`,
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {author.engagement}%
                      </div>
                    </div>
                  </div>
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-[20px] p-6 text-center opacity-0 group-hover:opacity-100 group-hover:rotate-y-0 rotate-y-180 transition-all duration-700">
                  <h3 className="text-lg font-medium text-white">{author.name}</h3>
                  <p className="text-sm text-gray-200 mt-2">{author.bio}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    {author.social.twitter && (
                      <a
                        href={`https://twitter.com/${author.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-200 hover:text-teal-100"
                        aria-label={`${author.name}'s Twitter`}
                      >
                        <Twitter className="w-6 h-6 animate-orbit-0" />
                      </a>
                    )}
                    {author.social.github && (
                      <a
                        href={`https://github.com/${author.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-200 hover:text-teal-100"
                        aria-label={`${author.name}'s GitHub`}
                      >
                        <Github className="w-6 h-6 animate-orbit-1" />
                      </a>
                    )}
                    {author.social.website && (
                      <a
                        href={author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-200 hover:text-teal-100"
                        aria-label={`${author.name}'s Website`}
                      >
                        <Globe className="w-6 h-6 animate-orbit-2" />
                      </a>
                    )}
                  </div>
                  <Link
                    href={`/authors/${author.id}`}
                    className="inline-flex items-center px-4 py-2 mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white text-sm rounded-full hover:scale-105 transition-all duration-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative overflow-hidden group"
            >
              <Rocket className="w-5 h-5 mr-2 animate-pulse" />
              <span>Join the Cosmos</span>
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
