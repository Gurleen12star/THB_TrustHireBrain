"use client";

import React, { useState } from "react";
import { Bell, HelpCircle, Sun, Moon, Search, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border h-16 px-6 flex items-center justify-between z-30 select-none">
      {/* Breadcrumb Path & Current Role Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150">Dashboard</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-semibold">AI Engineer</span>
        </div>
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Completed
        </span>
      </div>

      {/* Right Action Icons & Profile Info */}
      <div className="flex items-center gap-4">
        {/* Help Center */}
        <button
          className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-secondary transition-all duration-150"
          title="Help Center"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notifications Icon with Indicator */}
        <button
          className="relative text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-secondary transition-all duration-150"
          title="Notifications"
          onClick={() => setNotificationCount(0)}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border border-background scale-110">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Light/Dark Toggle */}
        <button
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-secondary transition-all duration-150"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <div className="h-6 w-[1px] bg-border" />

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="font-semibold text-sm text-foreground leading-none">Arjun Sharma</span>
            <span className="text-[10px] text-muted-foreground mt-0.5 font-medium">Recruiter</span>
          </div>
          <div className="h-9 w-9 rounded-full overflow-hidden border border-border relative">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face"
              alt="Arjun Sharma"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
