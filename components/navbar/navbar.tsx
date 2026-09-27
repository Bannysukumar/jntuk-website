"use client";
import Link from "next/link";
import {
  MdNotificationsActive,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { ModeToggle } from "../ui/toggle";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import { useNavBarContext } from "@/customhooks/navbarhook";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  const { toggleSidebar } = useSidebarContext();
  const { navbar } = useNavBarContext();
  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 w-full z-50 px-4 lg:px-8 py-2 dark:bg-[#09090B] bg-white grid grid-cols-3 lg:grid-cols-2 border-b items-center ${
        navbar ? "block" : "hidden"
      }`}
    >
      <div className="justify-start flex items-center lg:hidden cursor-pointer">
        <button
          onClick={toggleSidebar}
          className="curso-pointer"
          aria-label="sidebarhook"
          role="button"
        >
          <HiOutlineBars3BottomLeft size={26} />
        </button>
      </div>
      <Link
        className="flex justify-center lg:justify-start items-center cursor-pointer h-full max-h-16 overflow-hidden"
        href="/"
      >
        <div className="md:hidden h-full flex items-center">
          <span
            className="flex flex-col justify-center leading-none text-center select-none max-h-12"
            aria-label="JNTUK RESULTS"
          >
            <span className="font-extrabold tracking-wide text-[#2563eb] dark:text-[#60a5fa] text-[11px]">
              JNTUK
            </span>
            <span className="font-extrabold tracking-wide text-[#2563eb] dark:text-[#60a5fa] text-[11px]">
              RESULTS
            </span>
          </span>
        </div>
        <div className="hidden md:flex h-full items-center">
          <span
            className="flex flex-col justify-center leading-none text-left select-none max-h-14"
            aria-label="JNTUK RESULTS"
          >
            <span className="font-extrabold tracking-wide text-[#2563eb] dark:text-[#60a5fa] text-lg">
              JNTUK
            </span>
            <span className="font-extrabold tracking-wide text-[#2563eb] dark:text-[#60a5fa] text-lg">
              RESULTS
            </span>
          </span>
        </div>
      </Link>
      <div className="flex justify-end items-center">
        <span className="flex gap-4 items-center">
          <span className="hidden items-center md:block">
            <ModeToggle />
          </span>
          {path === "/notifications" ? (
            <Link href="/" aria-label="home link">
              <MdOutlineNotificationsActive size={24} />
            </Link>
          ) : (
            <Link href="/notifications" aria-label="notifications link">
              <MdNotificationsActive size={24} />
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
