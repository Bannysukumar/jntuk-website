"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { fetchCalendars } from "@/components/api/fetchResults";
import Footer from "@/components/footer/footer";

const Calendars = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCalendars();
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <Calendar className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              Academic calendars
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Files returned by the JNTUK calendars API. Degree and year filters appear only when the API sends them.
          </p>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-gray-700 dark:text-gray-300">Loading calendars…</Card>
        ) : items.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              JNTUK calendars not loaded yet
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The API did not return calendar files. Hyderabad PDFs are not shown here.
            </p>
            <Button onClick={load} className="bg-blue-600 hover:bg-blue-700 text-white">
              Retry
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const title = item.title || item.name || item.year || `Calendar ${index + 1}`;
              const href = item.link || item.url || item.pdf;
              return (
                <Card key={index} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                    {item.degree || item.regulation ? (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {[item.degree, item.regulation, item.year].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 dark:text-blue-300 underline text-sm"
                    >
                      Open
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
};

export default Calendars;
