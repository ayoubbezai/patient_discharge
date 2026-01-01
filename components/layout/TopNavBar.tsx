"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  ChevronDown,
  Globe,
  Maximize,
  Minimize,
  UserPlus,
  X,
  LogOut,
  
} from "lucide-react";

interface TopNavBarProps {
  title: string;
  search_placeholder?: string;
  showSearch?: boolean;
  setSearch?: (value: string) => void;
  value?: string;
}

export default function TopNavBar({
  title,
  search_placeholder = "Search bookings, matches, stadiums...",
  showSearch = true,
  setSearch,
  value,
}: TopNavBarProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");

  // Hardcoded user data
  const user = {
    name: "Admin User",
    email: "admin@footballapp.com",
    role: "admin",
    image: null,
  };

  // Hardcoded languages
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇩🇿" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];

  // Hardcoded accounts data
  const accounts = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@footballapp.com",
      role: "admin",
      image: null,
      is_current: true,
    },
    {
      id: 2,
      name: "Stadium Manager",
      email: "manager@footballapp.com",
      role: "manager",
      image: null,
      is_current: false,
    },
    {
      id: 3,
      name: "Player Account",
      email: "player@footballapp.com",
      role: "player",
      image: null,
      is_current: false,
    },
  ];

  const currentLang = "EN"; // Hardcoded current language

  // Toggle fullscreen function
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

  // Handle language change
  const handleLanguageChange = (code: string) => {
    console.log(`Language changed to: ${code}`);
    setShowLanguageDropdown(false);
  };

  // Handle search
  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
    setSearch?.(query);
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would redirect to login
    window.location.href = "/login";
  };

  // Handle add account (mock)
  const handleAddAccount = () => {
    console.log("Adding account with:", addEmail, addPassword);
    setAddEmail("");
    setAddPassword("");
    setShowAddAccountModal(false);
    alert("Account added successfully (demo mode)");
  };

  // Get initials for avatar
  const getInitials = (name?: string, email?: string) => {
    if (name) return name[0].toUpperCase();
    if (email) return email[0].toUpperCase();
    return "A";
  };

  // Get user display name
  const getUserName = () => {
    return user.name || user.email?.split('@')[0] || "Admin";
  };

  // Get account display name
  const getAccountName = (account: any) => {
    return account.name || account.email?.split('@')[0] || "User";
  };

  // Get status color based on role
  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return "bg-green-100 text-green-700 border-green-200";
      case 'manager':
        return "bg-blue-100 text-blue-700 border-blue-200";
      case 'player':
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
      {/* Left: Title + Search */}
      <div className="flex items-center w-full sm:w-auto">
        <h1 className="text-lg font-semibold text-gray-900 mr-3 truncate max-w-[140px] sm:max-w-none">
          {title}
        </h1>
        {showSearch && (
          <div className="relative w-full sm:w-64 flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-gray-400" />
            <Input
              type="search"
              value={value}
              onChange={(e) => handleSearch?.(e.target.value)}
              placeholder={search_placeholder}
              className="w-full pl-8 py-1 text-xs bg-white rounded-md border-gray-300 focus-visible:ring-1 focus-visible:ring-green-500 h-8 placeholder:text-xs placeholder:text-gray-500"
            />
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end sm:justify-start w-full sm:w-auto flex-wrap gap-1 sm:gap-2 sm:space-x-2">
        {/* Language Selector */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-900 transition-colors px-1.5 py-1 rounded-md hover:bg-gray-100"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="text-xs hidden xs:inline-block">
              {currentLang}
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showLanguageDropdown && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-green-50 transition-colors flex items-center gap-2 ${
                    currentLang === lang.code.toUpperCase()
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="flex-1 truncate">{lang.name}</span>
                  <span className="text-xs font-mono text-gray-400">
                    {lang.code.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-5 w-[1.5px] bg-gray-300 hidden sm:block"></div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullScreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>

        {/* Divider */}
        <div className="h-5 w-[1.5px] bg-gray-300 hidden sm:block"></div>

        {/* Bell/Notifications */}
        <button 
          className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors relative"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-5 w-[1.5px] bg-gray-300 hidden sm:block"></div>

        {/* User Profile with Account Switching */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-md transition-colors"
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
          >
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-700 border border-green-200">
                {getInitials(user.name, user.email)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-white"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-medium text-gray-900 leading-tight">
                {getUserName()}
              </span>
              <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full border ${getRoleColor(user.role)} leading-tight capitalize`}>
                {user?.role || "User"}
              </span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-600 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {showAccountDropdown && (
            <div className="absolute right-0 mt-1 w-72 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
              {/* Current User Header */}
              <div className="px-3 py-3 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-sm font-medium text-green-700 border border-green-200">
                      {getInitials(user.name, user.email)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border border-white"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{getUserName()}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">Current</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Switchable Accounts Section */}
              <div className="max-h-48 overflow-y-auto">
                <div className="px-3 py-2 border-b">
                  <span className="text-xs font-medium text-gray-500">Switch Account</span>
                </div>
                
                {accounts.filter(account => !account.is_current).length === 0 ? (
                  <div className="px-3 py-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">No other accounts</div>
                    <div className="text-xs text-gray-400">Add accounts to switch quickly</div>
                  </div>
                ) : (
                  accounts
                    .filter(account => !account.is_current)
                    .map(account => (
                      <div
                        key={account.id}
                        className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          console.log(`Switching to account: ${account.email}`);
                          setShowAccountDropdown(false);
                          alert(`Switching to ${account.name} (demo mode)`);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${getRoleColor(account.role)}`}>
                              {getInitials(account.name, account.email)}
                            </div>
                            <div>
                              <div className="text-xs font-medium">{getAccountName(account)}</div>
                              <div className="text-xs text-gray-500">{account.email}</div>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(account.role)}`}>
                            {account.role}
                          </span>
                        </div>
                      </div>
                    ))
                )}
              </div>

              {/* Actions Section */}
              <div className="border-t">
                <button
                  className="w-full px-3 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-sm"
                  onClick={() => {
                    setShowAddAccountModal(true);
                    setShowAccountDropdown(false);
                  }}
                >
                  <UserPlus className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Add Account</span>
                </button>
                
                <button
                  className="w-full px-3 py-2.5 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-sm border-t"
                  onClick={() => {
                    handleLogout();
                    setShowAccountDropdown(false);
                  }}
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Add Account</h3>
              <button
                onClick={() => setShowAddAccountModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Email</label>
                <input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full h-8 text-xs border border-gray-300 rounded px-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Password</label>
                <input
                  type="password"
                  value={addPassword}
                  onChange={(e) => setAddPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-8 text-xs border border-gray-300 rounded px-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
                  onClick={() => setShowAddAccountModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-xs px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddAccount}
                  disabled={!addEmail || !addPassword}
                >
                  Add Account
                </button>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 text-center">
                  Demo mode: Accounts are not actually saved
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}