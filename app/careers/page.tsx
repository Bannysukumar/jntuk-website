"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, AlertCircle } from "lucide-react";
import { fetchJobs } from "@/components/api/fetchResults";
import Footer from "@/components/footer/footer";

const Careers = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadJobs = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const items = await fetchJobs();
      setJobs(Array.isArray(items) ? items : []);
    } catch {
      setErrorMsg("Could not load jobs from the JNTUK API.");
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              Jobs & Careers
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Listings from the JNTUK jobs API. This is not a university placement portal.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        {isLoading ? (
          <Card className="p-8 text-center text-gray-700 dark:text-gray-300">Loading jobs…</Card>
        ) : jobs.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No jobs loaded yet
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The jobs API returned no listings. Try again later.
            </p>
            <Button onClick={loadJobs} className="bg-blue-600 hover:bg-blue-700 text-white">
              Retry
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Card key={job.guid || job.id || index} className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.title || job.name || "Job"}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {job.companyName || job.company || job.organization || ""}
                </p>
                {job.description || job.excerpt ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                    {job.excerpt || String(job.description).slice(0, 220)}
                  </p>
                ) : null}
                {job.applicationLink || job.link ? (
                  <a
                    href={job.applicationLink || job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-blue-700 dark:text-blue-300 underline"
                  >
                    Open listing
                  </a>
                ) : null}
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
