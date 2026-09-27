import { SITE_URL } from "@/lib/seo";

export type SeoLandingSlug =
  | "jntuk-results"
  | "jntuk-btech-results"
  | "jntuk-r18-results"
  | "jntuk-r22-results"
  | "jntuk-1-1-results"
  | "jntuk-1-2-results"
  | "jntuk-2-1-results"
  | "jntuk-3-1-results"
  | "jntuk-supply-results"
  | "jntuk-revaluation-results"
  | "jntuk-4-1-results"
  | "jntuk-bpharmacy-results"
  | "jntuk-mtech-results";

export interface SeoLandingPageConfig {
  slug: SeoLandingSlug;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  howToTitle: string;
  howToSteps: string[];
  aboutTitle: string;
  aboutParagraphs: string[];
  resultCtaLabel: string;
  resultCtaHref: string;
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
  relatedSlugs: SeoLandingSlug[];
}

export const SEO_LANDING_PAGES: Record<SeoLandingSlug, SeoLandingPageConfig> = {
  "jntuk-results": {
    slug: "jntuk-results",
    path: "/jntuk-results",
    metaTitle: "JNTUK Results 2025 – All Semesters & Branches | JNTUK RESULTS",
    metaDescription:
      "Check all JNTUK results 2025 in one place – B.Tech, B.Pharmacy, M.Tech, MBA, MCA and more. Fast, mobile-friendly JNTUK results portal with academic, backlog and class results.",
    h1: "JNTUK Results 2025 – All Courses & Semesters",
    intro: [
      "This page is your starting point for all JNTUK results. Whether you are a B.Tech, B.Pharmacy, M.Tech, MBA or MCA student, you can quickly navigate to the correct JNTUK result tool from here.",
      "JNTUK RESULTS connects you to academic results, all-semester consolidated reports, backlog reports, class-wise results and more, using your original hall ticket number.",
    ],
    howToTitle: "How to Check JNTUK Results Online",
    howToSteps: [
      "Click on the result tool that matches what you need – Academic Result, All Results, Backlog Report or Class Result.",
      "Enter your 10-character JNTUK hall ticket carefully (for example: 226Q1A4304).",
      "Submit the form and wait a few seconds while we fetch data from the official JNTUK servers.",
      "View or download your result safely from your mobile or desktop device.",
    ],
    aboutTitle: "About JNTUK Results on JNTUK RESULTS",
    aboutParagraphs: [
      "JNTUK publishes results regulation-wise and semester-wise. During peak result days, the official site may be slow. JNTUK RESULTS helps you access the same results using a clean and fast interface.",
      "We do not modify your marks or grades. All data is fetched directly from official JNTUK result servers and only presented in a more student-friendly way.",
    ],
    resultCtaLabel: "Go to Academic Result Search",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK Results – Frequently Asked Questions",
    faqs: [
      {
        question: "Which JNTUK results can I check from this page?",
        answer:
          "From this page you can navigate to Academic Result, All-Semester Result, Backlog Report, Class Result, Credit Checker, Grace Marks tools and more. Each tool uses your hall ticket number to fetch official JNTUK data.",
      },
      {
        question: "Are these JNTUK results official?",
        answer:
          "Yes. JNTUK RESULTS uses the same official JNTUK result APIs and endpoints. We only present the information in a faster and more user-friendly interface.",
      },
    ],
    relatedSlugs: [
      "jntuk-btech-results",
      "jntuk-supply-results",
      "jntuk-revaluation-results",
      "jntuk-r18-results",
      "jntuk-r22-results",
    ],
  },
  "jntuk-btech-results": {
    slug: "jntuk-btech-results",
    path: "/jntuk-btech-results",
    metaTitle: "JNTUK B.Tech Results 2025 – R16, R19, R20, R23 | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK B.Tech results 2025 for R16, R19, R20 and R23 regulations – regular and supply. Fast B.Tech JNTUK results with academic, all-semester and backlog views.",
    h1: "JNTUK B.Tech Results – R16, R19, R20, R23",
    intro: [
      "This page is dedicated to JNTUK B.Tech students who want a single place to understand and check their semester-wise results.",
      "Whether you belong to R16, R19, R20 or R23 (R20 is current for the 2022 regular batch), you can use our Academic Result and All Results tools to see your current semester performance and complete history.",
    ],
    howToTitle: "How to Check JNTUK B.Tech Results",
    howToSteps: [
      "Keep your JNTUK B.Tech hall ticket number ready.",
      "Click on the Academic Result or All Results tool from this page.",
      "Enter your hall ticket number exactly as printed on your ID card or hall ticket.",
      "Submit and wait a few seconds to view your B.Tech results for the selected regulation and semester.",
    ],
    aboutTitle: "About JNTUK B.Tech Result Tools",
    aboutParagraphs: [
      "B.Tech results are released regulation-wise (R16, R19, R20, R23) and semester-wise when JNTUK publishes them. Our tools help you navigate this easily without confusion.",
      "Using the same hall ticket number, you can also check backlogs, compare class results and verify grace marks eligibility from other sections of the site.",
    ],
    resultCtaLabel: "Check B.Tech Academic Result",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK B.Tech Results – FAQs",
    faqs: [
      {
        question: "Can I see all my B.Tech semester results at once?",
        answer:
          "Yes. Use the All Results tool to view all your B.Tech semester results in a single consolidated view for easier analysis.",
      },
      {
        question: "Does this page support R16, R19, R20 and R23?",
        answer:
          "Yes. JNTUK B.Tech commonly uses R16, R19, R20 and R23. R20 is current for the 2022 regular batch. As long as your hall ticket is valid, the tools fetch the regulation and semester data JNTUK has published.",
      },
    ],
    relatedSlugs: [
      "jntuk-results",
      "jntuk-r18-results",
      "jntuk-r22-results",
      "jntuk-supply-results",
    ],
  },
  "jntuk-r18-results": {
    slug: "jntuk-r18-results",
    path: "/jntuk-r18-results",
    metaTitle: "JNTUK R16 Results – B.Tech & B.Pharmacy | JNTUK RESULTS",
    metaDescription:
      "Check published JNTUK R16 results for B.Tech and B.Pharmacy – regular and supply when the university has released them.",
    h1: "JNTUK R16 Results – All Semesters",
    intro: [
      "R16 is one of the JNTUK B.Tech and B.Pharmacy regulations. This page points you to the result tools for published R16 exams.",
      "From here you can jump to Academic Result, All Results and Backlog Report. Official results remain at https://jntukresults.edu.in.",
    ],
    howToTitle: "How to Check JNTUK R16 Results",
    howToSteps: [
      "Identify your regulation as R16 from your college or official documents.",
      "Click on the Academic Result or All Results section from this page.",
      "Enter your 10-character hall ticket and submit.",
      "View published R16 results, including regular and supply attempts when available.",
    ],
    aboutTitle: "Understanding JNTUK R16 Results",
    aboutParagraphs: [
      "Under R16, grading and credit rules are defined by JNTUK. Our tools only fetch and display what JNTUK publishes.",
      "You can also combine this with Credit Checker, Grace Marks and Backlog Report when those tools have data.",
    ],
    resultCtaLabel: "Open R16 Academic Result Search",
    resultCtaHref: "/academicresult",
    faqTitle: "R16 Results – FAQs",
    faqs: [
      {
        question: "How do I confirm that I am an R16 student?",
        answer:
          "Your hall ticket, college notifications or exam timetables usually mention the regulation.",
      },
    ],
    relatedSlugs: [
      "jntuk-btech-results",
      "jntuk-results",
      "jntuk-1-1-results",
      "jntuk-1-2-results",
      "jntuk-2-1-results",
    ],
  },
  "jntuk-r22-results": {
    slug: "jntuk-r22-results",
    path: "/jntuk-r22-results",
    metaTitle: "JNTUK R20 / R23 Results – Current Regulations | JNTUK RESULTS",
    metaDescription:
      "Check published JNTUK R20 and R23 results. R20 is current for the 2022 regular batch.",
    h1: "JNTUK R20 / R23 Results – Current Regulations",
    intro: [
      "R20 and R23 are current JNTUK regulations. R20 is current for the 2022 regular batch. This page points you to result tools for published exams.",
      "Use Academic Result or All Results. Official results remain at https://jntukresults.edu.in.",
    ],
    howToTitle: "How to Check JNTUK R20 and R23 Results",
    howToSteps: [
      "Confirm that your batch follows R20 or R23.",
      "Use the Academic Result or All Results tools linked from this page.",
      "Enter your 10-character hall ticket and submit the form.",
      "Review subject-wise grades and the values JNTUK has published.",
    ],
    aboutTitle: "About JNTUK R20 and R23 Results",
    aboutParagraphs: [
      "R20 and R23 have their own syllabus and evaluation patterns. This site fetches what JNTUK publishes and presents it as returned.",
      "Track credits and backlogs with the matching tools when those APIs have data.",
    ],
    resultCtaLabel: "Check R20 / R23 Academic Result",
    resultCtaHref: "/academicresult",
    faqTitle: "R20 / R23 Results – FAQs",
    faqs: [
      {
        question: "Are R20 and R23 results supported for all branches?",
        answer:
          "If JNTUK has published the result for your branch and semester, the tools can display it. Official source: https://jntukresults.edu.in.",
      },
    ],
    relatedSlugs: [
      "jntuk-btech-results",
      "jntuk-results",
      "jntuk-1-1-results",
      "jntuk-1-2-results",
      "jntuk-2-1-results",
    ],
  },
  "jntuk-1-1-results": {
    slug: "jntuk-1-1-results",
    path: "/jntuk-1-1-results",
    metaTitle: "JNTUK 1-1 Results – First Year First Semester | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK 1-1 results for B.Tech and B.Pharmacy. First year first semester regular and supply results with fast, mobile-friendly access.",
    h1: "JNTUK 1-1 Results – First Year, First Semester",
    intro: [
      "The first semester (1-1) is very important for any JNTUK student. This page helps you quickly access JNTUK 1-1 results without confusion.",
      "Use the links below to open the Academic Result tool and check your first semester performance.",
    ],
    howToTitle: "How to Check JNTUK 1-1 Results",
    howToSteps: [
      "Click on the Academic Result tool from this page.",
      "Enter your hall ticket number and submit the form.",
      "Select the appropriate exam (regular or supply) if required.",
      "View your subject-wise marks and total SGPA for 1-1.",
    ],
    aboutTitle: "About JNTUK 1-1 Results",
    aboutParagraphs: [
      "1-1 results set the foundation for your entire degree. Tracking your performance early helps you plan improvements and avoid backlogs.",
      "You can revisit this page whenever new 1-1 regular or supply results are released by JNTUK.",
    ],
    resultCtaLabel: "Open 1-1 Academic Result Tool",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK 1-1 Results – FAQs",
    faqs: [
      {
        question: "Can I see both regular and supply 1-1 results here?",
        answer:
          "Yes. Once JNTUK publishes the supply result, you can use the same Academic Result tool to check your updated marks.",
      },
    ],
    relatedSlugs: [
      "jntuk-1-2-results",
      "jntuk-btech-results",
      "jntuk-r18-results",
      "jntuk-r22-results",
      "jntuk-results",
    ],
  },
  "jntuk-1-2-results": {
    slug: "jntuk-1-2-results",
    path: "/jntuk-1-2-results",
    metaTitle: "JNTUK 1-2 Results – First Year Second Semester | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK 1-2 results for first year second semester – regular and supply. Fast access to 1-2 JNTUK results, backlogs and credits.",
    h1: "JNTUK 1-2 Results – First Year, Second Semester",
    intro: [
      "This page is focused on JNTUK 1-2 results for first year students. You can quickly access your second semester performance from here.",
      "Use our tools to view subject-wise marks, SGPA and overall progress at the end of your first year.",
    ],
    howToTitle: "How to Check JNTUK 1-2 Results",
    howToSteps: [
      "Navigate to the Academic Result tool using the button below.",
      "Enter your hall ticket number carefully.",
      "Submit and wait a few seconds while the result is fetched from JNTUK.",
      "Review your 1-2 semester performance and note any backlogs to clear in future exams.",
    ],
    aboutTitle: "About JNTUK 1-2 Semester Results",
    aboutParagraphs: [
      "1-2 completes your first year at JNTUK. Combining 1-1 and 1-2 results gives you a clear picture of your starting academic position.",
      "From here, you can also move on to higher semester result tools like 2-1 and 2-2 as your course progresses.",
    ],
    resultCtaLabel: "Open 1-2 Academic Result Tool",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK 1-2 Results – FAQs",
    faqs: [
      {
        question: "Do I need a different hall ticket number for 1-2?",
        answer:
          "No. The same JNTUK hall ticket number is used for all semesters including 1-1 and 1-2. Just make sure you enter it correctly.",
      },
    ],
    relatedSlugs: [
      "jntuk-1-1-results",
      "jntuk-2-1-results",
      "jntuk-btech-results",
      "jntuk-results",
    ],
  },
  "jntuk-2-1-results": {
    slug: "jntuk-2-1-results",
    path: "/jntuk-2-1-results",
    metaTitle: "JNTUK 2-1 Results – Second Year First Semester | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK 2-1 results for B.Tech and B.Pharmacy – regular and supply. Track your second year first semester performance easily.",
    h1: "JNTUK 2-1 Results – Second Year, First Semester",
    intro: [
      "The 2-1 semester is where core engineering subjects start to become more intensive. This page helps you directly reach your JNTUK 2-1 results.",
      "Use our Academic Result and All Results tools to monitor your progress in the second year.",
    ],
    howToTitle: "How to Check JNTUK 2-1 Results",
    howToSteps: [
      "Click the result search button below to open the Academic Result tool.",
      "Enter your 10-character hall ticket and submit.",
      "Once the page loads, verify you are viewing the correct 2-1 exam session.",
      "Save or screenshot your result for future reference.",
    ],
    aboutTitle: "About JNTUK 2-1 Results",
    aboutParagraphs: [
      "2-1 results usually include several core subjects that heavily influence your CGPA. Monitoring these results early helps you balance future semesters.",
      "You can also combine 2-1 data with our Credit Checker, Backlog Report and Grace Marks tools to understand your academic position.",
    ],
    resultCtaLabel: "Open 2-1 Academic Result Tool",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK 2-1 Results – FAQs",
    faqs: [
      {
        question: "Can I see my backlogs from earlier semesters here?",
        answer:
          "For a full view of backlogs across all semesters, use the Backlog Report tool. 2-1 results by themselves will only show that specific exam.",
      },
    ],
    relatedSlugs: [
      "jntuk-1-2-results",
      "jntuk-3-1-results",
      "jntuk-results",
      "jntuk-btech-results",
    ],
  },
  "jntuk-3-1-results": {
    slug: "jntuk-3-1-results",
    path: "/jntuk-3-1-results",
    metaTitle: "JNTUK 3-1 Results – Third Year First Semester | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK 3-1 results for third year first semester. Track your 3-1 performance, backlogs and progress towards final year.",
    h1: "JNTUK 3-1 Results – Third Year, First Semester",
    intro: [
      "By 3-1, most students are deep into core subjects and electives. This page focuses on helping you quickly check your JNTUK 3-1 results.",
      "Use the result tools from here to see how you are progressing towards your final year and graduation requirements.",
    ],
    howToTitle: "How to Check JNTUK 3-1 Results",
    howToSteps: [
      "Use the button below to open the Academic Result tool.",
      "Enter your hall ticket number and submit.",
      "Confirm that the exam session and semester shown correspond to 3-1.",
      "Analyze your grades and identify any subjects that might need improvement next semester.",
    ],
    aboutTitle: "About JNTUK 3-1 Semester Results",
    aboutParagraphs: [
      "3-1 is often a turning point where students start focusing on placements, higher studies and internships. Strong 3-1 performance improves your overall profile.",
      "Make use of our other tools like Credit Checker and Backlog Report to ensure you are on track for a smooth final year.",
    ],
    resultCtaLabel: "Open 3-1 Academic Result Tool",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK 3-1 Results – FAQs",
    faqs: [
      {
        question: "Do 3-1 marks affect my final CGPA?",
        answer:
          "Yes. All semester results including 3-1 contribute to your final CGPA as per JNTUK regulations. Tracking them early helps you plan better.",
      },
    ],
    relatedSlugs: [
      "jntuk-2-1-results",
      "jntuk-results",
      "jntuk-btech-results",
      "jntuk-supply-results",
    ],
  },
  "jntuk-supply-results": {
    slug: "jntuk-supply-results",
    path: "/jntuk-supply-results",
    metaTitle: "JNTUK Supply Results – Supplementary Exams | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK supply results for B.Tech, B.Pharmacy and other courses. Track supplementary exam performance and backlog clearance status.",
    h1: "JNTUK Supply Results – Supplementary Examinations",
    intro: [
      "If you have appeared for JNTUK supplementary exams, this page helps you understand how to track your supply results.",
      "JNTUK RESULTS allows you to see updated marks after supply exams and monitor which backlogs are cleared.",
    ],
    howToTitle: "How to Check JNTUK Supply Results",
    howToSteps: [
      "Use the Academic Result tool to fetch your latest result using your hall ticket number.",
      "Check whether the exam session indicates a supplementary attempt.",
      "Compare your previous result with the latest one to confirm backlog clearance.",
      "Optionally, use the Backlog Report tool to see a consolidated view of all remaining subjects.",
    ],
    aboutTitle: "About JNTUK Supplementary Results",
    aboutParagraphs: [
      "Supply exams are a chance to clear backlogs without losing an academic year. Our platform helps you quickly verify whether your backlog has been cleared in the latest attempt.",
      "We always fetch data from official JNTUK servers, so the status you see here matches the university records.",
    ],
    resultCtaLabel: "Check Latest Supply Result",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK Supply Results – FAQs",
    faqs: [
      {
        question: "How do I know if a backlog is cleared?",
        answer:
          "If a previously failed subject now shows a passing grade in your recent result, that backlog is considered cleared. You can also verify this using the Backlog Report tool.",
      },
    ],
    relatedSlugs: [
      "jntuk-results",
      "jntuk-btech-results",
      "jntuk-revaluation-results",
      "jntuk-r18-results",
    ],
  },
  "jntuk-revaluation-results": {
    slug: "jntuk-revaluation-results",
    path: "/jntuk-revaluation-results",
    metaTitle: "JNTUK Revaluation Results (RCRV) – Recounting & Revaluation | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK revaluation (RCRV) results for B.Tech, B.Pharmacy and other courses. Track recounting, revaluation and challenge valuation status online.",
    h1: "JNTUK Revaluation Results – RCRV & Recounting",
    intro: [
      "If you applied for recounting or revaluation (RCRV) of your JNTUK exam papers, this page explains how to verify the updated results.",
      "Revaluation results can change your marks and impact backlogs, so it is important to check them carefully using your hall ticket number.",
    ],
    howToTitle: "How to Check JNTUK Revaluation Results",
    howToSteps: [
      "Wait for the official JNTUK notification that revaluation results are released.",
      "Use the Academic Result tool linked below and enter your hall ticket number.",
      "Verify if the result page mentions RCRV or revaluation status for the subjects you applied for.",
      "Compare the new marks with your previous result and check if any backlogs are now cleared.",
    ],
    aboutTitle: "About JNTUK Revaluation (RCRV) Process",
    aboutParagraphs: [
      "Revaluation allows students to request re-checking of their answer scripts if they believe there is a valuation mistake. JNTUK publishes updated results after processing these requests.",
      "Our portal helps you quickly verify whether your marks have increased, decreased or remained the same after revaluation.",
    ],
    resultCtaLabel: "Check Latest Revaluation Result",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK Revaluation Results – FAQs",
    faqs: [
      {
        question: "Will revaluation always increase my marks?",
        answer:
          "No. Revaluation can increase, decrease or keep your marks unchanged. You should apply only if you strongly believe there is a valuation error.",
      },
    ],
    relatedSlugs: [
      "jntuk-supply-results",
      "jntuk-results",
      "jntuk-btech-results",
      "jntuk-bpharmacy-results",
    ],
  },
  "jntuk-4-1-results": {
    slug: "jntuk-4-1-results",
    path: "/jntuk-4-1-results",
    metaTitle: "JNTUK 4-1 Results – Final Year First Semester | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK 4-1 results for final year first semester. Track your 4-1 performance, backlogs and CGPA before graduation.",
    h1: "JNTUK 4-1 Results – Final Year, First Semester",
    intro: [
      "The 4-1 semester is a crucial stage in JNTUK where students get closer to graduation, placements and higher studies. This page is dedicated to helping you quickly check your JNTUK 4-1 results.",
      "Use our Academic Result and All Results tools to see how your 4-1 performance contributes to your final CGPA and graduation eligibility.",
    ],
    howToTitle: "How to Check JNTUK 4-1 Results",
    howToSteps: [
      "Click the result search button below to open the Academic Result tool.",
      "Enter your 10-character JNTUK hall ticket and submit.",
      "Confirm that the exam session and semester correspond to 4-1.",
      "Review your subject-wise grades and note any subjects that may need attention before 4-2 or supply exams.",
    ],
    aboutTitle: "About JNTUK 4-1 Semester Results",
    aboutParagraphs: [
      "4-1 usually contains important core and elective subjects that significantly influence your final CGPA. Monitoring your 4-1 result early helps you plan for placements and higher studies.",
      "You can combine your 4-1 result data with tools like Credit Checker, Backlog Report and Grace Marks Eligibility to understand your exact academic status before graduation.",
    ],
    resultCtaLabel: "Open 4-1 Academic Result Tool",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK 4-1 Results – FAQs",
    faqs: [
      {
        question: "Does my 4-1 result affect eligibility for placements?",
        answer:
          "Yes. Many companies consider your aggregate CGPA up to the latest semester including 4-1. Tracking your 4-1 result helps you know where you stand before campus placements.",
      },
    ],
    relatedSlugs: [
      "jntuk-3-1-results",
      "jntuk-btech-results",
      "jntuk-results",
      "jntuk-supply-results",
    ],
  },
  "jntuk-bpharmacy-results": {
    slug: "jntuk-bpharmacy-results",
    path: "/jntuk-bpharmacy-results",
    metaTitle: "JNTUK B.Pharmacy Results – R16, R19, R20, R23 | JNTUK RESULTS",
    metaDescription:
      "Check published JNTUK B.Pharmacy results for R16, R19, R20 and R23 – regular and supply when the university has released them.",
    h1: "JNTUK B.Pharmacy Results – All Semesters",
    intro: [
      "This page is designed specifically for JNTUK B.Pharmacy students who want a clear and simple way to access their semester-wise results.",
      "Using your hall ticket number, you can quickly open Academic Result and All Results tools to view your B.Pharmacy performance across all semesters and regulations.",
    ],
    howToTitle: "How to Check JNTUK B.Pharmacy Results",
    howToSteps: [
      "Keep your JNTUK B.Pharmacy hall ticket number ready.",
      "Click on the Academic Result or All Results tool from this page.",
      "Enter your hall ticket number exactly as printed on your college ID or hall ticket.",
      "Submit the form and wait a few seconds to see your B.Pharmacy subject-wise marks and grades.",
    ],
    aboutTitle: "About JNTUK B.Pharmacy Results",
    aboutParagraphs: [
      "JNTUK B.Pharmacy results are released semester-wise and regulation-wise, similar to B.Tech. Our tools give you a clean interface to access these results without confusion or delays.",
      "From this page, you can also navigate to other helpful tools like Backlog Report, Grace Marks Eligibility and Class Result to get a complete picture of your academic journey.",
    ],
    resultCtaLabel: "Check B.Pharmacy Academic Result",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK B.Pharmacy Results – FAQs",
    faqs: [
      {
        question: "Are B.Pharmacy results fetched from official JNTUK servers?",
        answer:
          "Yes. All B.Pharmacy results shown through JNTUK RESULTS are fetched from official JNTUK result endpoints. We only improve the speed and presentation.",
      },
    ],
    relatedSlugs: [
      "jntuk-results",
      "jntuk-btech-results",
      "jntuk-r18-results",
      "jntuk-supply-results",
    ],
  },
  "jntuk-mtech-results": {
    slug: "jntuk-mtech-results",
    path: "/jntuk-mtech-results",
    metaTitle: "JNTUK M.Tech Results – All Specializations | JNTUK RESULTS",
    metaDescription:
      "Check JNTUK M.Tech results for all specializations – regular and supply exams. Fast JNTUK M.Tech result access with a student-friendly interface.",
    h1: "JNTUK M.Tech Results – All Specializations",
    intro: [
      "Postgraduate M.Tech students at JNTUK often need a quick way to verify semester results across different specializations. This page is focused on M.Tech result access.",
      "Using your M.Tech hall ticket number, you can open the Academic Result tool and see your latest performance in a clear, responsive layout.",
    ],
    howToTitle: "How to Check JNTUK M.Tech Results",
    howToSteps: [
      "Click on the Academic Result search button below.",
      "Enter your JNTUK M.Tech hall ticket number and submit the form.",
      "Wait a few seconds while we fetch your official result from JNTUK servers.",
      "Review your subject-wise grades and semester performance.",
    ],
    aboutTitle: "About JNTUK M.Tech Result Access",
    aboutParagraphs: [
      "M.Tech results at JNTUK are published course-wise and semester-wise. JNTUK RESULTS helps you access these quickly without struggling with slow or overloaded servers.",
      "From here, you can also move to other tools on the site such as Notifications and Syllabus pages to stay updated about exam schedules and curriculum.",
    ],
    resultCtaLabel: "Check M.Tech Academic Result",
    resultCtaHref: "/academicresult",
    faqTitle: "JNTUK M.Tech Results – FAQs",
    faqs: [
      {
        question: "Can I use the same tool for all M.Tech branches?",
        answer:
          "Yes. As long as your hall ticket number is valid, the Academic Result tool can fetch M.Tech results for any specialization published by JNTUK.",
      },
    ],
    relatedSlugs: [
      "jntuk-results",
      "jntuk-btech-results",
      "jntuk-revaluation-results",
    ],
  },
};

export const SEO_LANDING_PAGE_LIST: SeoLandingPageConfig[] = Object.values(SEO_LANDING_PAGES);

export function getSeoLandingConfigBySlug(slug: string): SeoLandingPageConfig | null {
  const key = slug as SeoLandingSlug;
  return SEO_LANDING_PAGES[key] ?? null;
}

