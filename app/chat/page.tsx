import Link from "next/link";
import Chatbot from "@/components/Chatbot";

const navItems = [
  { label: "New chat", href: "/chat", primary: true },
  { label: "History", href: "#history" },
];

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">

          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  item.primary
                    ? "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/30 dark:bg-primary-900/30 dark:text-primary-100"
                    : "border-gray-200 text-gray-800 bg-white hover:border-primary-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
            Grounded on Kenmark ITan Solutions knowledge. Sessions persist in MongoDB.
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            {/* Top hero/search bar */}
            <div className="text-center space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100 px-4 py-2 text-sm font-semibold">
                 Kenmark AI Assistant
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Start your conversation with KenPilot.
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Ask anything about Kenmark ITan Solutions—services, hosting, design, branding, marketing, or consultancy.
              </p>
            </div>

            {/* Chatbot */}
            <Chatbot />
          </div>
        </section>
      </div>
    </main>
  );
}

