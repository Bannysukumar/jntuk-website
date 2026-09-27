import { SITE_URL } from "@/lib/seo";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JNTUK RESULTS",
    alternateName: ["JNTUK Results", "JNTUK Results Portal", "JNTUK RESULTS"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/icon-512x512.png`,
    description:
      "JNTUK RESULTS is an independent student tool for JNTUK (Jawaharlal Nehru Technological University, Kakinada) exam results. Official results: https://jntukresults.edu.in.",
    sameAs: [
      "https://github.com/Bannysukumar",
      "https://www.linkedin.com/in/adepusukumar",
      "https://www.instagram.com/hacking_with_banny",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      url: `${SITE_URL}/helpcenter`,
    },
    brand: {
      "@type": "Brand",
      name: "JNTUK RESULTS",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512x512.png`,
        width: 512,
        height: 512,
      },
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JNTUK RESULTS",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    description:
      "JNTUK RESULTS - Check JNTUK results 2025, JNTUK BTech results, RCRV, supply results online. JNTUK RESULTS for UG & PG including B.Tech, B.Pharmacy, M.Tech, MBA, MCA.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/academicresult?htno={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    url: SITE_URL,
    hasPart: [
      { "@type": "SiteNavigationElement", name: "All Results", url: `${SITE_URL}/academicallresult`, description: "View all semester results" },
      { "@type": "SiteNavigationElement", name: "Academic Result", url: `${SITE_URL}/academicresult`, description: "Access your overall academic performance with hall ticket" },
      { "@type": "SiteNavigationElement", name: "Backlog Report", url: `${SITE_URL}/backlogreport`, description: "Access your overall backlogs report with hall ticket" },
      { "@type": "SiteNavigationElement", name: "Class Result", url: `${SITE_URL}/classresult`, description: "View class results and compare performance" },
      { "@type": "SiteNavigationElement", name: "Credits Checker", url: `${SITE_URL}/creditchecker`, description: "Check credits required to promote or graduate" },
      { "@type": "SiteNavigationElement", name: "Result Contrast", url: `${SITE_URL}/resultcontrast`, description: "Compare performance across semesters with classmates" },
      { "@type": "SiteNavigationElement", name: "Grace Marks Eligibility", url: `${SITE_URL}/grace-marks/eligibility`, description: "Check grace marks eligibility" },
      { "@type": "SiteNavigationElement", name: "Grace Marks Proof", url: `${SITE_URL}/grace-marks/proof`, description: "Get grace marks proof document" },
      { "@type": "SiteNavigationElement", name: "Calendars", url: `${SITE_URL}/calendars`, description: "Academic calendars and exam schedules" },
      { "@type": "SiteNavigationElement", name: "Syllabus", url: `${SITE_URL}/syllabus`, description: "Access detailed syllabus subject wise" },
      { "@type": "SiteNavigationElement", name: "Jobs & Careers", url: `${SITE_URL}/carrers`, description: "Find internships and jobs" },
      { "@type": "SiteNavigationElement", name: "Notifications", url: `${SITE_URL}/notifications`, description: "Latest JNTUK notifications" },
      { "@type": "SiteNavigationElement", name: "Help Center", url: `${SITE_URL}/helpcenter`, description: "Get help and support" },
    ],
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is JNTUK RESULTS official?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JNTUK RESULTS is an independent portal that fetches and displays results from JNTUK (Jawaharlal Nehru Technological University Kakinada). It is not operated by JNTUK but provides fast, user-friendly access to official JNTUK result data.",
        },
      },
      {
        "@type": "Question",
        name: "How fast are JNTUK results updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JNTUK results are updated on JNTUK RESULTS as soon as they are published by the university. The portal checks for new results regularly so you can view your BTech, BPharmacy, RCRV, supply, and other exam results quickly.",
        },
      },
      {
        "@type": "Question",
        name: "Which JNTUK results are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JNTUK RESULTS supports Academic Result, All Results, Backlog Report, Class Results, Credit Checker, Grace Marks Eligibility and Proof, RCRV, supply results, and regular semester results for UG and PG courses including BTech, BPharmacy, MTech, MBA, MCA.",
        },
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JNTUK RESULTS - Main Features",
    description: "Key features and pages available on JNTUK RESULTS portal",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "All Results", url: `${SITE_URL}/academicallresult`, description: "View all semester results" },
      { "@type": "ListItem", position: 2, name: "Academic Result", url: `${SITE_URL}/academicresult`, description: "Check academic performance with hall ticket" },
      { "@type": "ListItem", position: 3, name: "Backlog Report", url: `${SITE_URL}/backlogreport`, description: "Get backlog report for all semesters" },
      { "@type": "ListItem", position: 4, name: "Class Result", url: `${SITE_URL}/classresult`, description: "Compare results with classmates" },
      { "@type": "ListItem", position: 5, name: "Credits Checker", url: `${SITE_URL}/creditchecker`, description: "Check credits required for graduation" },
      { "@type": "ListItem", position: 6, name: "Result Contrast", url: `${SITE_URL}/resultcontrast`, description: "Compare performance across semesters" },
      { "@type": "ListItem", position: 7, name: "Grace Marks Eligibility", url: `${SITE_URL}/grace-marks/eligibility`, description: "Check grace marks eligibility" },
      { "@type": "ListItem", position: 8, name: "Grace Marks Proof", url: `${SITE_URL}/grace-marks/proof`, description: "Get grace marks proof document" },
      { "@type": "ListItem", position: 9, name: "Calendars", url: `${SITE_URL}/calendars`, description: "Academic calendars" },
      { "@type": "ListItem", position: 10, name: "Syllabus", url: `${SITE_URL}/syllabus`, description: "Access syllabus for all courses" },
      { "@type": "ListItem", position: 11, name: "Jobs & Careers", url: `${SITE_URL}/carrers`, description: "Find internships and jobs" },
      { "@type": "ListItem", position: 12, name: "Notifications", url: `${SITE_URL}/notifications`, description: "Latest JNTUK notifications" },
      { "@type": "ListItem", position: 13, name: "Help Center", url: `${SITE_URL}/helpcenter`, description: "Get help and support" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

