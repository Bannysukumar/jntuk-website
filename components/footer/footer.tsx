"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import SiteHost from "./site-host";
// import AdComponent from "../ads/adcomponent";
const Footer = () => {
  const path = usePathname();

  return (
    <>
      <div className="mt-2">
        <div className="font-serif mt-1 block text-left text-[#808080] ml-[17%] text-[55%] md:text-[80%]">
          It does consider the RCRV Results
        </div>
        <div className="font-serif mt-1 block text-left text-[#808080] ml-[17%] mb-4 text-[55%] md:text-[80%]">
          It only works for JNTUK R16, R19, R20, R23 regulations
        </div>
        <center>
          <hr className="w-[64%] mt-4 mb-1 " />
        </center>
        <center>
          <hr className="w-[64%]  text-[#808080]" />
        </center>

        <span className="mt-4  text-center mx-[18%] mb-4 text-[75%] sm:text-[100%] hidden">
          Made with ❤ by &nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Bannysukumar"
            className=" underline	underline-offset-1"
          >
            Adepu Sukumar
          </a>
          <br />
          <p
          // className={` ${path == "/academicresult" ? "block" : "hidden"}`}
          >
            In collaboration with{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hemanth-kotagiri/"
              className=" underline	underline-offset-1"
            >
              Hemanth kotagiri
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Syed-Ansar/"
              className=" underline	underline-offset-1"
            >
              Syed Ansar
            </a>
          </p>
        </span>

        {/* Social Media Links */}
        <div className="flex justify-center mt-4 mb-4 gap-4">
          <a
            href="https://github.com/Bannysukumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/adepusukumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/hacking_with_banny"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        {/* <span className="mt-4 block text-center mx-[18%] mb-4 text-[75%] sm:text-[100%]">
          Join us on{" "}
          <Link
            href="https://t.me/s/jntuhvercel"
            className="underline underline-offset-1"
          >
            Telegram
          </Link>
          , thanks!
        </span> */}

        {/* Sitelinks Group */}
        <div className="flex flex-wrap justify-center mt-6 mb-4 gap-x-6 gap-y-2">
          <Link
            href="/about"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/disclaimer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            Disclaimer
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/guide"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            Guide
          </Link>
          <Link
            href="/student-resources"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            Student Resources
          </Link>
          <Link
            href="/faq"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* Attribution */}
        <div className="text-center mb-4 space-y-2">
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-500 max-w-xl mx-auto px-2">
            JNTUK RESULTS is an independent student portal with guides and tools for checking JNTUK exam results,
            credits, backlogs, and notifications. We are not affiliated with JNTUK; official documents from the university
            remain the authority for marks and eligibility.
          </p>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-500">
            &copy; 2026 <SiteHost /> - Your Premier JNTUK Results Portal
          </p>
        </div>
      </div>
      {/* <AdComponent /> */}
    </>
  );
};

export default Footer;
