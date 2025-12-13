'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  X, Menu, ChevronLeft, LogOut, Home, MessageSquare, 
  TrendingUp, List, MapPin, BarChart, User, Settings, 
  HelpCircle, Bell, Search, Globe, Maximize, Minimize, 
  ChevronDown, PlusCircle, Calendar, Activity,
  Users, UserPlus, ClipboardCheck, Clock, AlertCircle,
  CheckCircle, FileText, Stethoscope, Shield
} from "lucide-react";
import { toast } from "sonner";

interface NavBarInterface {
  children: React.ReactNode;
}

export default function NavBar({ children }: NavBarInterface) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  
  // Fake auth (hardcoded) — no external auth provider
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    user_type: "Doctor",
    department: "Cardiology",
  } as const;
  const isLoading = false;
  const isAuthenticated = true;
  const authLogout = async () => {
    // simulate async logout
    return new Promise<void>((resolve) => setTimeout(resolve, 150));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(window.innerWidth < 1024);
      }
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
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Use real user data from auth context
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserFirstName = () => {
    if (!user?.name) return "User";
    return user.name.split(' ')[0];
  };

  const logout = async () => {
    try {
      await authLogout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  // Languages for dropdown
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇩🇿" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  // Main navigation items - Updated for hospital discharge
  const mainNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart,
    },
    {
      href: "/staff",
      label: "Staff",
      icon: Users,
      mobileLabel: "Staff"
    },
    {
      href: "/patients",
      label: "Patient Care",
      icon: UserPlus,
      mobileLabel: "Patients"
    },
    {
      href: "/discharges",
      label: "Discharges",
      icon: ClipboardCheck,
    },
    {
      href: "/reports",
      label: "Reports",
      icon: FileText,
    },
  ];

  // Settings navigation items
  const settingsNavItems = [
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      href: "/help",
      label: "Help",
      icon: HelpCircle,
      mobileLabel: "Help"
    },
  ];

  // Show loading state while checking authentication
  if (isLoading && !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 rounded-full bg-orange-100 animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex flex-row justify-between items-center px-3 py-2 bg-orange-600 border-b sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 p-1.5 flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-sm font-bold text-white">MediCare</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="h-8 w-8 text-white/80 hover:bg-white/20"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo and Toggle */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-3"
          } border-b`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">MC</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-800">Medi<span className="text-orange-600">Care</span></h1>
                <p className="text-[10px] text-gray-500">Discharge Management</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-7 w-7 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`h-3.5 w-3.5 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-3">
          <div className="px-2 mb-3">
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Main Navigation
              </p>
            )}
            <ul className="space-y-0.5">
              {mainNavItems.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-orange-50 text-orange-700 border-l-2 border-orange-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center p-2" : "px-3 py-2 gap-2"}`}
                      title={isCollapsed ? item.label : ""}
                    >
                      <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                      {!isCollapsed && (
                        <span className="truncate text-sm">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Settings Navigation */}
          <div className="px-2 mt-4">
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Account & Settings
              </p>
            )}
            <ul className="space-y-0.5">
              {settingsNavItems.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-orange-50 text-orange-700 border-l-2 border-orange-500"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center p-2" : "px-3 py-2 gap-2"}`}
                      title={isCollapsed ? item.label : ""}
                    >
                      <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                      {!isCollapsed && (
                        <span className="truncate text-sm">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer with Logout */}
        <div
          className={`border-t p-2 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Button
            variant="outline"
            className={`gap-2 text-sm h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-200 ${
              isCollapsed ? "w-9 px-0" : "w-full justify-start px-3"
            }`}
            onClick={logout}
            title={isCollapsed ? "Logout" : ""}
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="md:hidden fixed top-0 left-0 h-full w-72 bg-white border-r z-50 shadow-2xl">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-orange-100 p-2 flex items-center justify-center">
                  <div className="rounded-lg">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-xs">MC</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold text-gray-800">MediCare</h1>
                  <p className="text-[10px] text-gray-500">Discharge Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="h-8 w-8 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile User Profile */}
            {user && (
              <div className="p-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {user.name || "Welcome"}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || ""}
                    </p>
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs bg-orange-100 text-orange-800 rounded-full">
                      {user.user_type || "Staff"}
                    </span>
                  </div>
                </div>
                {user.department && (
                  <div className="mt-1.5 text-xs text-gray-600">
                    <span className="font-medium">Department:</span> {user.department}
                  </div>
                )}
              </div>
            )}

            <div className="h-[calc(100vh-180px)] overflow-y-auto py-2">
              <div className="px-2 mb-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Main Navigation
                </p>
                <ul className="space-y-0.5">
                  {mainNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-700 border-l-3 border-orange-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                          <span className="text-sm">{item.mobileLabel || item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="px-2 mt-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Account & Settings
                </p>
                <ul className="space-y-0.5">
                  {settingsNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-700 border-l-3 border-orange-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                          <span className="text-sm">{item.mobileLabel || item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="border-t p-2">
              <Button
                variant="outline"
                className="w-full gap-2 text-sm h-10 justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-200"
                onClick={logout}
                disabled={isLoading}
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar - Desktop */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-gray-800 truncate max-w-md">
              {pathname === "/dashboard" ? "Discharge Dashboard" : 
               pathname === "/staff" ? "Staff Management" :
               pathname === "/patients" ? "Patient Care" :
               pathname === "/discharges" ? "Discharge Management" :
               pathname === "/reports" ? "Reports" :
               pathname === "/profile" ? "Profile" :
               pathname === "/settings" ? "Settings" :
               pathname === "/help" ? "Help & Support" : "Discharge Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search Bar - Hidden on small desktop */}
            <div className="hidden lg:block relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-56"
              />
            </div>

            {/* Language Selector - Hidden on small desktop */}
            <div className="hidden lg:block relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 h-8"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-sm">EN</span>
                <ChevronDown className="h-2.5 w-2.5" />
              </Button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-md shadow-lg border overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-2.5 py-1.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowLanguageDropdown(false)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Divider */}
            <div className="hidden lg:block h-5 w-px bg-gray-300"></div>
            
            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8"
              title="Toggle Fullscreen (F)"
            >
              {isFullScreen ? (
                <Minimize className="h-3.5 w-3.5" />
              ) : (
                <Maximize className="h-3.5 w-3.5" />
              )}
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Divider */}
            <div className="h-5 w-px bg-gray-300"></div>
            
            {/* Add New Button - Hidden on small desktop */}
            <Button className="bg-orange-600 hover:bg-orange-700 h-8 px-3 hidden lg:flex">
              <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-sm">New Discharge</span>
            </Button>
            
            {/* User Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 h-8 px-2"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {getUserInitials()}
                  </span>
                </div>
                {user && (
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                      {getUserFirstName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[100px]">
                      {user.user_type || "Hospital Staff"}
                    </p>
                  </div>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
              </Button>
              
              {showAccountDropdown && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-md shadow-lg border overflow-hidden z-50">
                  {user && (
                    <div className="p-2.5 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {getUserInitials()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          {user.department && (
                            <p className="text-xs text-gray-500 truncate">Dept: {user.department}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Link href="/profile">
                    <button 
                      className="w-full text-left px-2.5 py-1.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Profile</span>
                    </button>
                  </Link>
                  
                  <Link href="/settings">
                    <button 
                      className="w-full text-left px-2.5 py-1.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <Settings className="h-3.5 w-3.5" />
                      <span>Settings</span>
                    </button>
                  </Link>
                  
                  <div className="border-t">
                    <button
                      className="w-full text-left px-2.5 py-1.5 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                      onClick={() => {
                        setShowAccountDropdown(false);
                        logout();
                      }}
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-3 py-2 bg-white border-b">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-800 truncate">
              {pathname === "/dashboard" ? "Dashboard" : 
               pathname === "/staff" ? "Staff" :
               pathname === "/patients" ? "Patients" :
               pathname === "/discharges" ? "Discharges" :
               pathname === "/reports" ? "Reports" :
               pathname === "/profile" ? "Profile" :
               pathname === "/settings" ? "Settings" :
               pathname === "/help" ? "Help" : "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </Button>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {getUserInitials()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-2 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}