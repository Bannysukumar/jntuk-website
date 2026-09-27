"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="mt-2">
        <div className="mt-1 block text-left text-gray-500 dark:text-gray-400 ml-[17%] text-[55%] md:text-[80%]">
          Includes RCRV results when JNTUK has published them
        </div>
        <div className="mt-1 block text-left text-gray-500 dark:text-gray-400 ml-[17%] mb-4 text-[55%] md:text-[80%]">
          Common JNTUK regulations: R16, R19, R20, R23
        </div>
        <center>
          <hr className="w-[64%] mt-4 mb-1 " />
        </center>
        <center>
          <hr className="w-[64%]  text-[#808080]" />
        </center>

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

        <div className="flex flex-wrap justify-center mt-6 mb-4 gap-x-6 gap-y-2">
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            Contact
          </Link>
          <Link href="/disclaimer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            Disclaimer
          </Link>
          <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            Privacy Policy
          </Link>
          <Link href="/guide" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            Guide
          </Link>
          <Link href="/student-resources" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            Student Resources
          </Link>
          <Link href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm">
            FAQ
          </Link>
        </div>

        <div className="text-center mb-4 space-y-2">
          <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 max-w-xl mx-auto px-2">
            JNTUK Results is an independent student portal for Jawaharlal Nehru Technological University, Kakinada.
            We are not affiliated with JNTUK; official documents from the university remain the authority for marks and eligibility.
          </p>
          <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300">
            © 2026 jntuk-website.vercel.app
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
