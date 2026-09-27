"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { fetchSyllabus } from "@/components/api/fetchResults";
import Footer from "@/components/footer/footer";

export default function SyllabusPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSyllabus();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Syllabus</h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Syllabus files from the JNTUK API. Choose a file only after the API returns options.
          </p>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-gray-700 dark:text-gray-300">Loading syllabus…</Card>
        ) : items.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              JNTUK syllabus not loaded yet
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The API did not return syllabus files. Hyderabad PDFs are not shown here.
            </p>
            <Button onClick={load} className="bg-blue-600 hover:bg-blue-700 text-white">
              Retry
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const title = item.title || item.name || item.subject || `Syllabus ${index + 1}`;
              const href = item.link || item.url || item.pdf;
              return (
                <Card key={index} className="p-4">
                  <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                  {item.branch || item.regulation ? (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {[item.branch, item.regulation, item.year].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-blue-700 dark:text-blue-300 underline text-sm"
                    >
                      Open PDF
                    </a>
                  ) : null}
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
