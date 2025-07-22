
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect, useRef } from 'react';
import { PenTool, Star, Save, Sparkles, Rocket, Tag, Image as ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css'; // Use bubble theme for cosmic aesthetic

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample category data (sync with CategoriesPage.jsx, replace with API fetch)
  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Innovation' },
    { id: 3, name: 'AI' },
    { id: 4, name: 'Metaverse' },
    { id: 5, name: 'Augmented Reality' },
  ];

  // Sample tags (replace with API fetch)
  const availableTags = ['Gadgets', 'Innovation', 'AI Art', 'VR', 'Creativity', 'Tech Trends'];

  // Quill toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  // Update word count and reading time
  useEffect(() => {
    const words = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setReadingTime(Math.ceil(words / 200)); // Average reading speed: 200 WPM
  }, [content]);

  // Autosave draft every 10 seconds
  useEffect(() => {
    const autosave = setInterval(() => {
      if (title || content) {
        console.log('Autosaving draft:', { title, content, category, tags });
        // API call: POST to /api/drafts with { title, content, category, tags, image }
      }
    }, 10000);
    return () => clearInterval(autosave);
  }, [title, content, category, tags, image]);

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

  // Mock AI suggestion (replace with API call)
  const fetchAiSuggestion = () => {
    const suggestions = [
      'Try a vivid metaphor to describe your setting!',
      'Add a question to engage your readers.',
      'Use a conversational tone for better connection.',
      'Incorporate a surprising statistic to hook your audience.',
    ];
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
  };

  // Handle tag addition
  const addTag = (tag) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  // Handle tag removal
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission (replace with API call)
  const handlePublish = () => {
    console.log('Publishing:', { title, content, category, tags, image });
    // API call: POST to /api/posts with { title, content, category, tags, image }
  };

  // Handle draft save (replace with API call)
  const handleSaveDraft = () => {
    console.log('Saving draft:', { title, content, category, tags, image });
    // API call: POST to /api/drafts with { title, content, category, tags, image }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Cosmic Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_2%)] bg-repeat bg-[length:12px_12px] animate-twinkle"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-teal-400/25 to-cyan-400/25 rounded-full blur-3xl animate-nebula"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-lavender-400/20 to-indigo-400/20 rounded-full blur-3xl animate-nebula delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/15 to-rose-400/15 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

     

      {/* Write Section */}
      <section ref={sectionRef} className="relative z-40 container mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-12">
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 animate-pulse">
              <PenTool className="w-6 h-6 text-cyan-300 animate-spin-slow" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                Spin Your Cosmic Tale
              </h1>
            </div>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Craft stories that light up the universe.
            </p>
          </div>

          {/* Split-Screen Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Editor and Preview */}
            <div className="lg:col-span-3 bg-gray-800/60 backdrop-blur-lg rounded-[20px] border border-teal-400/40 p-6 space-y-6">
              {/* Title Input */}
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your story title..."
                  className="w-full bg-transparent text-white text-xl font-medium border-b border-teal-400/40 focus:border-cyan-400/60 outline-none py-2 px-4 transition-all duration-500"
                  aria-label="Story title"
                />
              </div>

              {/* Editor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[500px]">
                <div className="relative">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="bubble"
                    placeholder="Write your cosmic tale here..."
                    className="h-full bg-gray-900/30 rounded-[12px] border border-teal-400/30 text-gray-200 p-4 scrollbar-hidden"
                    aria-label="Rich text editor"
                  />
                </div>
                {/* Live Preview */}
                <div className="bg-gray-900/30 rounded-[12px] border border-teal-400/30 p-4 text-gray-200 prose prose-invert max-w-none overflow-auto scrollbar-hidden">
                  <h1 className="text-2xl font-medium">{title || 'Your Story Title'}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content || '<p>Your story will appear here...</p>' }} />
                </div>
              </div>

              {/* Image Upload */}
              <div
                className="relative bg-gray-900/50 rounded-[12px] border border-dashed border-teal-400/40 p-4 text-center cursor-pointer hover:border-cyan-400/60 transition-all duration-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                  aria-label="Upload cover image"
                />
                {image ? (
                  <img src={image} alt="Cover preview" className="w-full h-40 object-cover rounded-[12px]" />
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 text-teal-200 animate-pulse" />
                    <p className="text-sm text-gray-200 mt-2">Drag or click to upload a cover image</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 bg-gray-800/60 backdrop-blur-lg rounded-[20px] border border-teal-400/40 p-6 space-y-6">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-900/50 rounded-full border border-teal-400/40 text-gray-200 p-3 outline-none transition-all duration-500 hover:border-cyan-400/60"
                  aria-label="Select category"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Autocomplete */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center px-2 py-1 bg-teal-400/20 rounded-full text-xs text-gray-200"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-400 hover:text-gray-200"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    className="w-full bg-gray-900/50 rounded-full border border-teal-400/40 text-gray-200 p-3 outline-none transition-all duration-500 hover:border-cyan-400/60"
                    aria-label="Tag input"
                  />
                  {tagInput && (
                    <div className="absolute left-0 mt-2 w-full bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg z-50">
                      {availableTags
                        .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag))
                        .map((tag) => (
                          <button
                            key={tag}
                            onClick={() => addTag(tag)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          >
                            {tag}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Rings */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-200">Word Count</p>
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700/50 flex items-center justify-center">
                    <div
                      className="text-xs text-teal-200 font-medium"
                      style={{
                        background: `conic-gradient(teal-400 ${Math.min(wordCount / 10, 100)}%, transparent ${Math.min(wordCount / 10, 100)}%)`,
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {wordCount} Words
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-200">Reading Time</p>
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700/50 flex items-center justify-center">
                    <div
                      className="text-xs text-lavender-200 font-medium"
                      style={{
                        background: `conic-gradient(lavender-400 ${Math.min(readingTime * 10, 100)}%, transparent ${Math.min(readingTime * 10, 100)}%)`,
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {readingTime} Min
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Draft Button */}
              <button
                onClick={handleSaveDraft}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-500 relative overflow-hidden group"
              >
                <Save className="w-4 h-4 mr-2 animate-pulse" />
                Save Draft
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
              </button>
            </div>
          </div>

          {/* AI Assistant Orb */}
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => {
                setIsAiOpen(!isAiOpen);
                if (!isAiOpen) fetchAiSuggestion();
              }}
              className="flex items-center px-4 py-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full text-white hover:scale-110 transition-all duration-500 relative group animate-orbit-0"
              aria-label="Toggle AI assistant"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              AI Muse
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
            </button>
            {isAiOpen && (
              <div className="absolute bottom-16 right-0 w-80 bg-gray-800/90 backdrop-blur-md rounded-[12px] p-6 text-gray-200 text-sm border border-pink-400/40 max-h-96 overflow-auto scrollbar-hidden">
                <h3 className="text-base font-medium text-white mb-4">AI Muse Suggestions</h3>
                <p>{aiSuggestion || 'Click to generate a suggestion!'}</p>
                <button
                  onClick={fetchAiSuggestion}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-500"
                  aria-label="Generate new AI suggestion"
                >
                  New Suggestion
                </button>
                <button
                  onClick={() => setIsAiOpen(false)}
                  className="mt-2 text-pink-300 underline hover:text-pink-200"
                  aria-label="Close AI assistant"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Publish CTA */}
          <div className="text-center">
            <button
              onClick={handlePublish}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative overflow-hidden group"
            >
              <Rocket className="w-5 h-5 mr-2 animate-pulse" />
              <span>Launch Your Story</span>
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </div>
  );
}
