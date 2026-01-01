"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { X, Menu, PanelRight, LogOut } from "lucide-react";
import {
  Home,
  Calendar,
  MapPin,
  Users,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  
} from "lucide-react";

interface NavBarInterface {
  children: React.ReactNode;
}

// Hardcoded navigation items for Stadium Admin Dashboard - with stronger colors
const navItems = [
  {
    label: "Dashboard",
    href: "/overview",
    icon: Home,
    color: "text-emerald-600 hover:text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-600",
  },
  {
    label: "Stadiums",
    href: "/stadiums",
    icon: Users,
    color: "text-blue-600 hover:text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-600",
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: Calendar,
    color: "text-purple-600 hover:text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-600",
  },
  {
    label: "Matchmaking",
    href: "/matchmaking",
    icon: Users,
    color: "text-green-600 hover:text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-600",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    color: "text-orange-600 hover:text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-600",
  },
  {
    label: "Map View",
    href: "/map",
    icon: MapPin,
    color: "text-red-600 hover:text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-600",
  },
  {
    label: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
    color: "text-yellow-600 hover:text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-600",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    color: "text-pink-600 hover:text-pink-700",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-600",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-gray-600 hover:text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-600",
  },
];

export default function NavBar({ children }: NavBarInterface) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Hardcoded user data
  const user = {
    name: "Admin User",
    email: "admin@footballapp.com",
    role: "admin",
    subscription: {
      current_best_plan: "premium"
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (event.key.toLowerCase() === "w") {
        event.preventDefault();
        setIsCollapsed(!isCollapsed);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  const handleCloseMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Hardcoded logout function
  const logout = () => {
    console.log("Logging out...");
    // In a real app, this would clear tokens and redirect
    window.location.href = "/login";
  };

  // For demo purposes, show all nav items
  const filteredNavItems = navItems;

  return (
    <div
      className={`flex ${
        isMobile && "flex-col"
      } h-screen overflow-hidden bg-neutral-50 scrollbar-custom`}
    >
      {/* Mobile Header */}
      <div className="md:hidden flex flex-row justify-between items-center p-2 bg-card border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-6">
            {/* Placeholder for logo */}
          </div>
          <h1 className="text-sm font-medium text-foreground/70">Football Matchmaking</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="h-7 w-7 text-muted-foreground/60 hover:text-neutral-100"
        >
          {mobileMenuOpen ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <Menu className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-card border-r transition-all duration-300 ease-in-out ${
          isCollapsed ? "min-w-12" : "min-w-52"
        }`}
      >
        {/* Logo and Toggle */}
        <div
          className={`flex items-center py-4.5 ${
            isCollapsed ? "justify-center p-1.5" : "justify-between p-2.5"
          } border-b py-3.5 mb-2`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6">
                {/* Placeholder for logo */}
              </div>
              <h1 className="text-sm font-medium text-foreground/70">Football Matchmaking</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 text-muted-foreground/60 hover:text-foreground hover:bg-neutral-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelRight
              className={`h-3 w-3 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-1.5">
          <ul className="space-y-2 px-1.5">
            {filteredNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    passHref
                    className={`flex items-center rounded-md text-xs font-normal transition-all ${
                      isActive
                        ? `${item.bgColor} ${item.color} border-l-2 ${item.borderColor}`
                        : "text-muted-foreground/60 hover:bg-neutral-100 hover:text-foreground"
                    } ${isCollapsed ? "justify-center p-1.5 py-2" : "p-2 gap-2"}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? item.color : "text-current"}`} />
                    {!isCollapsed && (
                      <span className="truncate text-xs">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer - User Info */}
        {!isCollapsed && (
          <div className="border-t p-2.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer - Logout */}
        <div
          className={`border-t p-1.5 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Button
            variant="outline"
            className={`gap-2 text-xs font-normal h-8 text-muted-foreground/60 hover:text-foreground ${
              isCollapsed ? "w-8 px-0" : "w-full justify-start"
            }`}
            onClick={logout}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="h-3 w-3" />
            {!isCollapsed && <span className="text-xs">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {(mobileMenuOpen || isClosing) && (
        <>
          <div
            className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
              isClosing ? "opacity-0" : "opacity-100 bg-black/20"
            }`}
            onClick={handleCloseMobileMenu}
          />
          <aside
            ref={mobileMenuRef}
            className={`md:hidden fixed top-0 left-0 h-full w-56 bg-card border-r z-50 shadow-xl transition-all duration-300 ease-in-out ${
              isClosing ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between p-2.5 border-b">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6">
                  {/* Placeholder for logo */}
                </div>
                <h1 className="text-sm font-medium text-foreground/70">
                  Football Matchmaking
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseMobileMenu}
                className="h-6 w-6 text-muted-foreground/60 hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* User Info in Mobile Menu */}
            <div className="border-t p-2.5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="h-full overflow-y-auto py-2">
              <ul className="space-y-0.5 px-1.5">
                {filteredNavItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const IconComponent = item.icon;
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        passHref
                        onClick={handleCloseMobileMenu}
                        className={`flex items-center gap-2 p-2 rounded-md text-xs font-normal transition-colors ${
                          isActive
                            ? `${item.bgColor} ${item.color} border-l-2 ${item.borderColor}`
                            : "text-muted-foreground/60 hover:bg-neutral-100 hover:text-foreground"
                        }`}
                      >
                        <IconComponent className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? item.color : "text-current"}`} />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t p-1.5">
              <Button
                variant="outline"
                className="w-full gap-2 text-xs font-normal h-8 justify-start text-muted-foreground/60 hover:text-foreground"
                onClick={() => {
                  handleCloseMobileMenu();
                  logout();
                }}
              >
                <LogOut className="h-3 w-3" />
                <span className="text-xs">Logout</span>
              </Button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-auto bg-background scrollbar-custom`}>
        {children}
      </main>
    </div>
  );
}