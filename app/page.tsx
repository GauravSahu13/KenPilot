import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen ai-bg dark:bg-gray-900">
      <div className="ai-glow primary top-[-120px] left-[-140px]" />
      <div className="ai-glow accent bottom-[-200px] right-[-140px]" />
      <div className="container relative mx-auto px-4 lg:px-8 py-16 space-y-16 max-w-6xl">
        {/* Hero */}
        <header className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                KenPilot : One-stop shop for all your IT solutions
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                Hosting, full-stack development, design, branding, marketing, consultancy, and AI-driven solutions—built
                to launch and scale with confidence.

                Comprehensive IT services with cutting-edge technology and exceptional support—reliable hosting, modern
                engineering, and design-forward experiences to help you grow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
      
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur shadow-xl dark:bg-gray-900/70 dark:border-gray-800">
            <div className="relative p-6 space-y-4">

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="p-3 rounded-lg bg-white/60 border border-white/70 shadow-sm dark:bg-gray-800/60 dark:border-gray-700/60">
                  <h4 className="font-bold text-gray-900 dark:text-white">Reliable Hosting</h4>
                  <p>Shared, VPS, and dedicated servers with 24x7 support.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/60 border border-white/70 shadow-sm dark:bg-gray-800/60 dark:border-gray-700/60">
                  <h4 className="font-bold text-gray-900 dark:text-white">Full-Stack Development</h4>
                  <p>Web, mobile, eCommerce, ERP, and custom builds.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/60 border border-white/70 shadow-sm dark:bg-gray-800/60 dark:border-gray-700/60">
                  <h4 className="font-bold text-gray-900 dark:text-white">Design & Branding</h4>
                  <p>UI/UX, graphics, landing pages, and brand identity.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/60 border border-white/70 shadow-sm dark:bg-gray-800/60 dark:border-gray-700/60">
                  <h4 className="font-bold text-gray-900 dark:text-white">Marketing & Consultancy</h4>
                  <p>SEO, SMM, integrated campaigns, and technical advisory.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Comprehensive services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Web Hosting", desc: "Shared, VPS, and dedicated hosting to keep your business online 24x7." },
              { title: "Development", desc: "Web, mobile, eCommerce, ERP, blockchain, and custom solutions." },
              { title: "Design", desc: "UI/UX and graphics to bring your product vision to life." },
              { title: "Branding", desc: "Identity, messaging, and creative assets tailored to your brand." },
              { title: "Marketing", desc: "SEO, SMM, integrated campaigns to drive traffic and growth." },
              { title: "Consultancy", desc: "Technical guidance, reviews, and roadmaps to de-risk delivery." },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur shadow-sm p-5 dark:bg-gray-900/70 dark:border-gray-800 hover:-translate-y-1 transition-transform"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
                  {item.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Industries we serve</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["IT", "Arts", "Food & Beverages", "Health & Fitness", "Real Estate", "Security", "Public Sector", "Marine"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/80 border border-white/70 text-gray-800 shadow-sm backdrop-blur dark:bg-gray-900/70 dark:border-gray-700 dark:text-gray-100"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Toolkit</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              "Node.js",
              "Express",
              "Bootstrap",
              "MySQL",
              "Flutter",
              "Angular",
              "Next.js",
              "React.js",
              "Tailwind CSS",
              "MongoDB",
              "WordPress",
              "Figma",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full bg-white/80 border border-white/70 text-gray-800 shadow-sm backdrop-blur dark:bg-gray-900/70 dark:border-gray-700 dark:text-gray-100"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur p-6 shadow-sm dark:bg-gray-900/70 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to transform?</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed max-w-3xl">
            Whether you need reliable hosting, a new product build, or end-to-end digital transformation, our team is
            ready to help. Chat with the assistant or reach out to our team to get started.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://kenmarkitan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:brightness-110 text-white text-sm font-semibold shadow"
            >
              Visit kenmarkitan.com
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

