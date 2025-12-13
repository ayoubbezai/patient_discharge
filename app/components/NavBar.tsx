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
      label: "Staff Management",
      icon: Users,
    },
    {
      href: "/patients",
      label: "Patient Care",
      icon: UserPlus,
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
      label: "Help & Support",
      icon: HelpCircle,
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
      <div className="md:hidden flex flex-row justify-between items-center p-3 bg-orange-600 border-b sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 p-1.5 flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white">MediCare</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="h-9 w-9 text-white/80 hover:bg-white/20"
        >
          {mobileMenuOpen ? (
            <X className="w-4.5 h-4.5" />
          ) : (
            <Menu className="w-4.5 h-4.5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed ? "min-w-16" : "min-w-64"
        }`}
      >
        {/* Logo and Toggle */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center p-3" : "justify-between p-4"
          } border-b py-4`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="rounded-xl">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-orange-600 font-bold">MC</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-800">Medi<span className="text-orange-600">Care</span></h1>
                <p className="text-xs text-gray-500">Discharge Management</p>
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
              className={`h-4 w-4 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-4">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Main Navigation
              </p>
            )}
            <ul className="space-y-1">
              {mainNavItems.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-orange-50 text-orange-700 border-l-2 border-orange-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center p-3" : "p-3 gap-3"}`}
                      title={isCollapsed ? item.label : ""}
                    >
                      <IconComponent className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
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
          <div className="px-3 mt-6">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Account & Settings
              </p>
            )}
            <ul className="space-y-1">
              {settingsNavItems.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-orange-50 text-orange-700 border-l-4 border-orange-500"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center p-3" : "p-3 gap-3"}`}
                      title={isCollapsed ? item.label : ""}
                    >
                      <IconComponent className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
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
          className={`border-t p-3 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Button
            variant="outline"
            className={`gap-2 text-sm font-medium h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-200 ${
              isCollapsed ? "w-10 px-0" : "w-full justify-start"
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
          <aside className="md:hidden fixed top-0 left-0 h-full w-64 bg-white border-r z-50 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-orange-100 p-2 flex items-center justify-center">
                  <div className="rounded-xl">
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                      <span className="text-orange-600 font-bold">MC</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-gray-800">MediCare</h1>
                  <p className="text-xs text-gray-500">Discharge Management</p>
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
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
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
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-orange-100 text-orange-800 rounded-full">
                      {user.user_type || "Staff"}
                    </span>
                  </div>
                </div>
                {user.department && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-medium">Department:</span> {user.department}
                  </div>
                )}
              </div>
            )}

            <div className="h-full overflow-y-auto py-4">
              <div className="px-3 mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Main Navigation
                </p>
                <ul className="space-y-1">
                  {mainNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-700 border-l-4 border-orange-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <IconComponent className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="px-3 mt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Account & Settings
                </p>
                <ul className="space-y-1">
                  {settingsNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-700 border-l-4 border-orange-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <IconComponent className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="border-t p-3">
              <Button
                variant="outline"
                className="w-full gap-3 text-sm font-medium h-10 justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-200"
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
        {/* Top Navigation Bar */}
        <div className="hidden md:flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">
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
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
            </div>
            

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">EN</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
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
            <div className="h-6 w-px bg-gray-300"></div>
            
            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen (F)"
            >
              {isFullScreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>
            
            {/* Add New Button - Hospital version */}
            <Button className="bg-orange-600 hover:bg-orange-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>New Discharge</span>
            </Button>
            
            {/* User Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {getUserInitials()}
                  </span>
                </div>
                {user && (
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                      {getUserFirstName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                      {user.user_type || "Hospital Staff"}
                    </p>
                  </div>
                )}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
              
              {showAccountDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                  {user && (
                    <div className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
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
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                  </Link>
                  
                  <Link href="/settings">
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                  </Link>
                  
                  <div className="border-t">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                      onClick={() => {
                        setShowAccountDropdown(false);
                        logout();
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-3 bg-white border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {getUserInitials()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}