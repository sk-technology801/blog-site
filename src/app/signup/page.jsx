
'use client'; // Ensure client-side rendering for dynamic interactions

import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, PenTool, Star, Rocket, Twitter, Github, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [formProgress, setFormProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!bio.trim()) newErrors.bio = 'Bio is required';
    return newErrors;
  };

  // Update form progress
  useEffect(() => {
    const fields = [username, email, password, bio];
    const filledFields = fields.filter((field) => field.trim()).length;
    setFormProgress((filledFields / 4) * 100);
  }, [username, email, password, bio]);

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

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Submitting:', { username, email, password, bio, avatar });
    // API call: POST to /api/signup with { username, email, password, bio, avatar }
    // Example:
    // const response = await fetch('https://your-api/signup', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, email, password, bio, avatar }),
    // });
    // if (response.ok) router.push('/write');
  };

  // Handle social sign-in (placeholder)
  const handleSocialSignIn = (platform) => {
    console.log(`Sign in with ${platform}`);
    // Redirect to OAuth flow, e.g., /api/auth/twitter
  };

  // Handle easter egg click
  const handleEasterEggClick = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 2000); // Hide after 2 seconds
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

     

      {/* Signup Section */}
      <section ref={sectionRef} className="relative z-40 container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-md mx-auto space-y-8">
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 animate-pulse">
              <Rocket className="w-6 h-6 text-cyan-300 animate-spin-slow" />
              <h1 className="text-3xl sm:text-4xl font-medium text-white">
                Join the Cosmic Crew
              </h1>
            </div>
            <p className="text-lg text-gray-200">
              Sign up to start weaving your cosmic tales.
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-[20px] border border-teal-400/40 p-6 space-y-6">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={`w-full bg-gray-900/50 rounded-full border ${errors.username ? 'border-rose-400/60' : 'border-teal-400/40'} text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60`}
                aria-label="Username"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-200" />
              {errors.username && <p className="text-xs text-rose-400 mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full bg-gray-900/50 rounded-full border ${errors.email ? 'border-rose-400/60' : 'border-teal-400/40'} text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60`}
                aria-label="Email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-200" />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full bg-gray-900/50 rounded-full border ${errors.password ? 'border-rose-400/60' : 'border-teal-400/40'} text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60`}
                aria-label="Password"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-200" />
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
            </div>

            {/* Bio */}
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className={`w-full bg-gray-900/50 rounded-[12px] border ${errors.bio ? 'border-rose-400/60' : 'border-teal-400/40'} text-gray-200 p-3 pl-10 outline-none transition-all duration-500 hover:border-cyan-400/60 resize-y min-h-[100px] scrollbar-hidden`}
                aria-label="Bio"
              />
              <PenTool className="absolute left-3 top-4 w-5 h-5 text-teal-200" />
              {errors.bio && <p className="text-xs text-rose-400 mt-1">{errors.bio}</p>}
            </div>

            {/* Avatar Upload */}
            <div
              className="relative bg-gray-900/50 rounded-[12px] border border-dashed border-teal-400/40 p-4 text-center cursor-pointer hover:border-cyan-400/60 transition-all duration-500"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarUpload}
                aria-label="Upload avatar"
              />
              {avatar ? (
                <img src={avatar} alt="Avatar preview" className="w-24 h-24 mx-auto rounded-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 text-teal-200 animate-pulse" />
                  <p className="text-sm text-gray-200 mt-2">Upload your cosmic avatar</p>
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="text-center">
              <p className="text-sm text-gray-200">Form Completion</p>
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700/50 flex items-center justify-center">
                <div
                  className="text-xs text-teal-200 font-medium"
                  style={{
                    background: `conic-gradient(teal-400 ${formProgress}%, transparent ${formProgress}%)`,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {Math.round(formProgress)}%
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 animate-bounce-slow relative overflow-hidden group"
            >
              <Rocket className="w-5 h-5 mr-2 animate-pulse" />
              Join the Cosmos
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-comet-trail"></div>
            </button>

            {/* Social Sign-In */}
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-200">Or sign up with</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSocialSignIn('Twitter')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 hover:border-cyan-400/60 transition-all duration-500"
                  aria-label="Sign up with Twitter"
                >
                  <Twitter className="w-5 h-5 text-teal-200 animate-orbit-0 mr-2" />
                  Twitter
                </button>
                <button
                  onClick={() => handleSocialSignIn('GitHub')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full border border-teal-400/40 hover:border-cyan-400/60 transition-all duration-500"
                  aria-label="Sign up with GitHub"
                >
                  <Github className="w-5 h-5 text-teal-200 animate-orbit-1 mr-2" />
                  GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-200">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
              Log in
            </Link>
          </p>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

    </div>
  );
}
