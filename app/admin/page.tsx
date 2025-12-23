"use client";

import { useEffect, useState } from "react";
import ExcelUpload from "@/components/ExcelUpload";

interface MostAskedItem {
  question: string;
  count: number;
}

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<MostAskedItem[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      if (data?.mostAsked) {
        setAnalytics(data.mostAsked);
      }
    } catch (error) {
      console.error("Failed to load analytics", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        <div className="text-center space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100 px-4 py-2 text-sm font-semibold">
            Knowledge Base Admin
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Upload Excel</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage FAQs, Services, About data via Excel to feed the RAG engine.
          </p>
        </div>

        <ExcelUpload />

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Most asked questions</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Based on user queries saved in MongoDB</p>
            </div>
            <button
              onClick={loadAnalytics}
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:underline"
              disabled={loadingAnalytics}
            >
              {loadingAnalytics ? "Loading..." : "Refresh"}
            </button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {analytics.length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 py-2">
                {loadingAnalytics ? "Loading..." : "No data yet"}
              </p>
            )}
            {analytics.map((item) => (
              <div key={item.question} className="py-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.question}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.count} times</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

