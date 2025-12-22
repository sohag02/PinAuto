import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardLayout({ children, title, subtitle, activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <main className="pl-64 min-h-screen transition-all duration-300">
        <Header title={title} subtitle={subtitle} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
