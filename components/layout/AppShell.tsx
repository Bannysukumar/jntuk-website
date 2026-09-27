"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar/navbar";
import SideMenubar from "@/components/sidemenubar/sidemenubar";
import { SidebarProvider } from "@/customhooks/sidebarhook";
import { NavBarProvider } from "@/customhooks/navbarhook";

const NotificationPopUp = dynamic(
  () => import("@/components/notifications/popup").then((m) => m.default),
  { ssr: false }
);

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NavBarProvider>
        <Navbar />
        <main className="pt-16">
          <SideMenubar />
          <div className="lg:ml-64">
            <NotificationPopUp />
            {children}
          </div>
        </main>
      </NavBarProvider>
    </SidebarProvider>
  );
}
