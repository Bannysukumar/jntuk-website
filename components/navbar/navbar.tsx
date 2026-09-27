"use client";
import Link from "next/link";
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { ModeToggle } from "../ui/toggle";
import { useSidebarContext } from "@/customhooks/sidebarhook";
import { useNavBarContext } from "@/customhooks/navbarhook";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchLatestNotifications } from "@/components/api/fetchResults";

const Navbar = () => {
  const path = usePathname();
  const { toggleSidebar } = useSidebarContext();
  const { navbar } = useNavBarContext();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchLatestNotifications()
      .then((items) => {
        if (!cancelled && Array.isArray(items) && items.length > 0) {
          setNotificationCount(items.length);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 w-full z-50 px-4 lg:px-8 py-2 dark:bg-[#09090B] bg-white grid grid-cols-3 lg:grid-cols-2 border-b items-center ${
        navbar ? "block" : "hidden"
      }`}
    >
      <div className="justify-start flex items-center lg:hidden cursor-pointer">
        <button onClick={toggleSidebar} aria-label="Open menu" type="button">
          <HiOutlineBars3BottomLeft size={26} />
        </button>
      </div>
      <Link
        className="flex flex-col justify-center lg:justify-start items-center lg:items-start"
        href="/"
      >
        <span className="text-base md:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          JNTUK Results
        </span>
        <span className="text-[11px] text-gray-600 dark:text-gray-300">Kakinada</span>
      </Link>
      <div className="flex justify-end items-center">
        <span className="flex gap-4 items-center">
          <span className="hidden items-center md:block">
            <ModeToggle />
          </span>
          <Link href="/notifications/" aria-label="Notifications" className="relative">
            <MdNotificationsActive size={24} />
            {path !== "/notifications" && notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
