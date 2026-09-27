"use client";
import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/seo";

import React from "react";

const MetaData = () => {
  const pathname = usePathname();
  return (
    <>
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="JNTUK RESULTS" />
      <meta
        property="og:description"
        content="Check your JNTUK exam results online instantly! Access Academic Results, All Results, Backlog Report, Class Results, Credit Checker, Grace Marks Eligibility, Syllabus, Jobs & Careers, and Notifications. Official JNTUK Results portal for Jawaharlal Nehru Technological University Kakinada."
      />
      <meta
        property="og:image"
        content={`${SITE_URL}/jntuhresults_md.png`}
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="JNTUK RESULTS Logo" />
      <meta
        property="keywords"
        content="jntuk results, jntuk results online, jntuk results portal, check jntuk results, jntuk, jntuk Results, jntuk vercel, vercel jntuk, jntuk results vercel, jntukresults, jntuk notifications, JNTUK Results Engineering, JNTUK Engineering Results, jntuk bpharmacy results, jntuk bphar results, jntuk mtech results, jntuk mba results, jntuk mca results, jntuk all semester results"
      />
      <meta name="publisher" content="Adepu Sukumar" />
      <meta name="creator" content="Adepu Sukumar" />
      <meta name="author" content="Adepu Sukumar" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="twitter:title"
        content="JNTUK RESULTS"
      />
      <meta
        property="twitter:description"
        content="Check your JNTUK exam results online instantly! Access Academic Results, All Results, Backlog Report, Class Results, Credit Checker, Grace Marks, Syllabus, Jobs & Careers, and Notifications. Get your JNTUK results for UG & PG courses including B.Tech, M.Tech, MBA, MCA, B.Pharmacy."
      />
      {/* <meta */}
      {/*   name="description" */}
      {/*   content="Easily access your JNTUK results for {relevant course and semester} - Find out your grades, CGPA, backlogs, Jobs, Internships and more in one place. Check now!" */}
      {/* /> */}
      <meta
        name="google-site-verification"
        content="19aqihOrD-qf3lECIogsri3a8H8WCd2piEQ7xdq2Akg"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="canonical"
        href={`${SITE_URL}${pathname}`}
      />

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5512897194230969"
        crossOrigin="anonymous"
      ></script> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Inter:wght@300&family=Roboto+Slab&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default MetaData;
