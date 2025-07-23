A Next.js blogging platform that takes you on a cosmic journey through the stars! With a playful, innocent aesthetic featuring pastel gradients and smooth animations, Cosmic Blog offers a delightful experience for writers and readers alike. Built with accessibility, security, and robustness in mind, it includes social sign-in, protected routes, and comprehensive error handling.

🚀 Features





Interactive Pages: Explore Home, Features, Categories, Authors, Write, Signup, and Login pages with cosmic-themed UI.



Cosmic Aesthetic: Pastel gradients (teal-400, lavender-400, rose-400), animations (animate-bounce-slow, animate-comet-trail), and playful messaging.



Authentication: Social sign-in (Twitter, GitHub) via next-auth, with middleware protecting routes like /write and /authors/[id].



Error Handling: Robust system with ErrorBoundary.jsx, error.jsx, 404.jsx, error-handler.js, and custom-errors.js for consistent error management.



API Responses: Standardized responses with api-response.js for success and error cases.



Input Validation: Centralized validation with validateInput.js for forms and API payloads.



Security: Middleware (middleware.js) enforces security headers (X-Content-Type-Options, X-Frame-Options, Content-Security-Policy).



Logging: Sentry integration for error and response logging, with PKT timestamps (e.g., 04:04 PM, July 23, 2025).



Responsive Design: Mobile, tablet, and desktop-friendly layouts with max-w-md mx-auto.



Accessibility: ARIA labels, role="alert", and aria-live="assertive" for screen reader compatibility.

🪐 Getting Started

Prerequisites





Node.js (>= 18.x)



npm (>= 9.x)



GitHub account for repository access



Sentry account for error logging (optional)



Twitter and GitHub API credentials for social sign-in

Installation





Clone the Repository:

git clone https://github.com/your-username/cosmic-blog.git
cd cosmic-blog



Install Dependencies:

npm install



Set Up Environment Variables: Create a .env.local file in the project root and add:

NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret



Run the Development Server:

npm run dev

Visit http://localhost:3000 in your browser.

Configuration





Sentry: Configure in next.config.js and .env.local for error logging.



Next.js: Uses App Router (src/app) with jsconfig.json for path aliases (@/*).



Tailwind CSS: Custom styles in globals.css and tailwind.config.js for cosmic gradients and animations.

🌠 Project Structure

cosmic-blog/
├── src/
│   ├── app/
│   │   ├── authors/
│   │   ├── categories/
│   │   ├── features/
│   │   ├── write/
│   │   ├── signup/
│   │   │   └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── api/
│   │   │   ├── authors/
│   │   │   │   └── route.js
│   │   │   └── auth/[...nextauth]/
│   │   │       └── route.js
│   │   ├── error.jsx
│   │   ├── 404.jsx
│   │   ├── globals.css
│   │   └── page.jsx (HomePage)
│   ├── components/
│   │   ├── BlogHeader.jsx
│   │   ├── Footer.jsx
│   │   └── ErrorBoundary.jsx
│   ├── utils/
│   │   ├── error-handler.js
│   │   ├── api-response.js
│   │   ├── custom-errors.js
│   │   └── validateInput.js
├── middleware.js
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
├── package.json
├── .env.local
└── README.md

🌟 Usage





Home Page: Visit / to explore featured posts and cosmic visuals.



Signup/Login: Register at /signup or log in at /login using email/password or social sign-in (Twitter, GitHub).



Write Posts: Access /write (authenticated users only) to create blog posts.



Protected Routes: /write and /authors/[id] require authentication, enforced by middleware.js.



Error Handling: Invalid routes trigger 404.jsx, and errors are caught by ErrorBoundary.jsx or error.jsx.



Validation: Form inputs and API payloads are validated via validateInput.js.

🛠️ Testing





Form Validation:





Submit empty or invalid forms in SignupPage.jsx or LoginPage.jsx to verify cosmic-themed error messages (e.g., “Cosmic Username Misaligned!”).



Check rose-400 styling and ARIA attributes.



API Routes:





Test GET /api/authors and POST /api/authors with valid/invalid payloads.



Verify standardized responses via api-response.js.



Middleware:





Access /write without auth_token to confirm redirect to /login?redirectReason=cosmic-auth.



Pass invalid query parameters (e.g., /login?email=invalid) to test validation.



Error Pages:





Navigate to /invalid to test 404.jsx.



Trigger errors in pages or API routes to test error.jsx and ErrorBoundary.jsx.



Sentry Logging:





Check Sentry dashboard for validation, API, and middleware errors with PKT timestamps (e.g., 04:04 PM, July 23, 2025).



Responsive Design:





Test on mobile, tablet, and desktop to ensure max-w-md mx-auto layouts work.



Accessibility:





Use a screen reader to verify role="alert" and aria-live="assertive" functionality.

📡 Contributing





Fork the repository.



Create a feature branch: git checkout -b feature/your-feature.



Commit changes: git commit -m "Add your feature".



Push to the branch: git push origin feature/your-feature.



Open a pull request with a detailed description.

Please follow the cosmic theme in UI/UX changes and ensure new features include validation (validateInput.js) and error handling (custom-errors.js).

🌑 Dependencies





next: Next.js framework for server-side rendering and routing.



react, react-dom: React for building UI components.



lucide-react: Icon library for cosmic-themed icons (e.g., Rocket, Star).



@sentry/nextjs: Error and response logging.



next-auth: Authentication for social sign-in (Twitter, GitHub).

Install dependencies:

npm install next react react-dom lucide-react @sentry/nextjs next-auth

📝 Notes





Cosmic Theme: Maintain pastel gradients (teal-400, rose-400, cyan-400) and animations (animate-orbit, animate-comet-trail) in new features.



Time Zone: Logs use Pakistan Standard Time (PKT, e.g., 04:04 PM, July 23, 2025) for consistency.



Subscription: The “Subscribe” button in BlogHeader.jsx links to https://x.ai/grok. Update to /subscribe if implementing a custom subscription page.



Customization: Add more validation rules in validateInput.js, error types in custom-errors.js, or API routes as needed.



Issues: Report bugs or feature requests in the GitHub Issues section.

🌍 License

MIT License. See LICENSE for details.



Built with 💫 by the Cosmic Blog team. Launch into the cosmos and start blogging today!