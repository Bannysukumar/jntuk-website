"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { homeLinks, moreToolLinks } from "@/constants/homeLinks";
import { SITELINK_URLS } from "@/lib/seo";
import { SEO_LANDING_PAGE_LIST } from "@/constants/seoLandingPages";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeButton } from "@/components/native/native-button";
import {
  GraduationCap,
  FileText,
  BookOpen,
  Briefcase,
  BarChart3,
  Users,
  Calendar,
  Bell,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Ticket,
} from "lucide-react";
import { isValidRollNumber, normalizeRollNumber, ROLL_NUMBER_LENGTH } from "@/lib/jntuk-api";

const iconMap: { [key: string]: any } = {
  Backlogs: FileText,
  "All attempts": FileText,
  Credits: BarChart3,
  Notifications: Bell,
  "Result Contrast": TrendingUp,
  "Class results": Users,
  "Grace marks": HelpCircle,
  "Jobs & Careers": Briefcase,
  Calendars: Calendar,
  Syllabus: BookOpen,
};

export default function Home() {
  const router = useRouter();
  const [hallTicket, setHallTicket] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const ready = isValidRollNumber(hallTicket);

  const onSubmit = () => {
    if (!ready || submitting) return;
    setSubmitting(true);
    router.push("/academicresult/result?htno=" + hallTicket);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 dark:from-[#05070d] dark:via-[#0a1020] dark:to-[#0b1426]">
      <div className="max-w-3xl mx-auto px-4 pt-10 md:pt-16 pb-8">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 text-center">
          JNTUK Results · Kakinada
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white text-center mb-3">
          JNTUK exam results
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-8">
          An independent student tool for Jawaharlal Nehru Technological University, Kakinada.
          Enter a 10-character hall ticket to open Academic Result.
        </p>

        <Card className="p-5 md:p-7 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/80">
          <label htmlFor="home-htno" className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">
            <Ticket className="h-4 w-4" />
            Hall ticket
          </label>
          <Input
            id="home-htno"
            value={hallTicket}
            onChange={(event) => setHallTicket(normalizeRollNumber(event.target.value))}
            maxLength={ROLL_NUMBER_LENGTH}
            placeholder="226Q1A4304"
            className="h-12 text-center text-lg font-mono tracking-wider mb-2"
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
          />
          <p className="text-xs text-gray-600 dark:text-gray-300 text-center mb-4">
            {hallTicket.length} / {ROLL_NUMBER_LENGTH} characters · letters and numbers only
          </p>
          <NativeButton
            type="button"
            onClick={onSubmit}
            disabled={!ready || submitting}
            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-700 dark:disabled:text-slate-200 disabled:opacity-100"
          >
            {submitting ? "Processing…" : "Get Results"}
          </NativeButton>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            Only exams currently published by JNTUK (and previously saved for this hall ticket) are shown.
            Older semesters appear only if they were scraped while live.
          </p>
        </Card>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {homeLinks.map((item) => {
            const Icon = iconMap[item.title] || FileText;
            return (
              <Link href={item.link} key={item.link}>
                <Card className="h-full p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </section>

        <details className="mb-10 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
            More tools
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {moreToolLinks.map((item) => {
              const Icon = iconMap[item.title] || GraduationCap;
              return (
                <Link href={item.link} key={item.link} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>
                    <span className="block font-medium text-gray-900 dark:text-white">{item.title}</span>
                    <span className="block text-sm text-gray-700 dark:text-gray-300">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </details>

        <details className="mb-10 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
            About this portal
          </summary>
          <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Jawaharlal Nehru Technological University, Kakinada (JNTUK) publishes results for
              currently live exams. This site fetches those results through the JNTUK results API
              and shows college name, branch, CGPA, and semester tables exactly as returned.
            </p>
            <p>
              Regulations commonly used here are R16, R19, R20, and R23. We do not claim official
              university status. University documents remain the authority for marks and eligibility.
            </p>
          </div>
        </details>

        <details className="mb-10 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
            Popular JNTUK result pages
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {SEO_LANDING_PAGE_LIST.filter(
              (page) => !page.path.includes("r18") && !page.path.includes("r22")
            ).map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 hover:border-blue-500"
              >
                <span>{page.h1.replace(/R18|R22/g, "R16 / R19 / R20 / R23")}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </details>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {SITELINK_URLS.filter((s) => s.path !== "/").map((s) => (
            <Link
              key={s.path}
              href={s.path}
              className="text-blue-700 dark:text-blue-300 hover:underline underline-offset-2"
            >
              {s.name}
            </Link>
          ))}
        </nav>
      </main>

      <footer className="border-t border-gray-200 dark:border-slate-800 py-6">
        <p className="text-center text-xs text-gray-600 dark:text-gray-300">
          © 2026 jntuk-website.vercel.app · Independent JNTUK student tool
        </p>
      </footer>
    </div>
  );
}
