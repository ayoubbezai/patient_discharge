"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Settings, Save, Bell, Globe, Moon, Shield,
  User, Lock, Eye, EyeOff, Smartphone, Mail,
  Download, Trash2, Database, ChevronRight,
  X, CheckCircle, AlertCircle, Clock, Info
} from "lucide-react";
import NavBar from "../components/NavBar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Settings data
  const [settingsData, setSettingsData] = useState({
    // Account settings
    email: "john.doe@medicare-hospital.org",
    phone: "+1 (555) 123-4567",
    language: "en",
    timezone: "America/New_York",
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    dischargeAlerts: true,
    patientUpdates: true,
    systemAlerts: true,
    
    // Security settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    loginAlerts: true,
    deviceManagement: true,
    
    // Privacy settings
    activityTracking: true,
    dataSharing: false,
    analytics: true,
    
    // Appearance
    theme: "light",
    compactMode: false,
    fontSize: "medium",
  });

  const [tempSettings, setTempSettings] = useState({ ...settingsData });

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSettingsData({ ...tempSettings });
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setTempSettings({ ...settingsData });
  };

  const handleChange = (field: string, value: any) => {
    setTempSettings(prev => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "data", label: "Data & Backup", icon: Database },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
  ];

  const timezones = [
    { id: "America/New_York", name: "Eastern Time (ET)" },
    { id: "America/Chicago", name: "Central Time (CT)" },
    { id: "America/Denver", name: "Mountain Time (MT)" },
    { id: "America/Los_Angeles", name: "Pacific Time (PT)" },
    { id: "Europe/London", name: "Greenwich Mean Time (GMT)" },
    { id: "Europe/Paris", name: "Central European Time (CET)" },
  ];

  const themes = [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
    { id: "auto", name: "Auto" },
  ];

  const sessionOptions = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 60, label: "1 hour" },
    { value: 120, label: "2 hours" },
    { value: 240, label: "4 hours" },
  ];

  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Email Address</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={tempSettings.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="tel"
                      value={tempSettings.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Regional Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Language</label>
                  <select
                    value={tempSettings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Timezone</label>
                  <select
                    value={tempSettings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {timezones.map(tz => (
                      <option key={tz.id} value={tz.id}>{tz.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Notification Channels</h3>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                  { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive critical alerts via SMS' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleChange(item.key as keyof typeof tempSettings, !tempSettings[item.key as keyof typeof tempSettings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Notification Types</h3>
              <div className="space-y-3">
                {[
                  { key: 'dischargeAlerts', label: 'Discharge Alerts', description: 'Get notified about new discharges' },
                  { key: 'patientUpdates', label: 'Patient Updates', description: 'Receive updates about assigned patients' },
                  { key: 'systemAlerts', label: 'System Alerts', description: 'Important system notifications' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleChange(item.key as keyof typeof tempSettings, !tempSettings[item.key as keyof typeof tempSettings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Two-Factor Authentication</h3>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-800">2FA Status</span>
                  </div>
                  <button
                    onClick={() => handleChange('twoFactorAuth', !tempSettings.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      tempSettings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      tempSettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {tempSettings.twoFactorAuth 
                    ? "Two-factor authentication is enabled for your account." 
                    : "Enable two-factor authentication for enhanced security."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Session Settings</h3>
              <div className="p-3 border border-gray-200 rounded-lg">
                <label className="block text-xs text-gray-700 mb-2">Session Timeout</label>
                <select
                  value={tempSettings.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {sessionOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Your session will automatically expire after {tempSettings.sessionTimeout} minutes of inactivity.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Security Features</h3>
              <div className="space-y-3">
                {[
                  { key: 'loginAlerts', label: 'Login Alerts', description: 'Get notified of new logins' },
                  { key: 'deviceManagement', label: 'Device Management', description: 'Manage connected devices' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleChange(item.key as keyof typeof tempSettings, !tempSettings[item.key as keyof typeof tempSettings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Data & Privacy</h3>
              <div className="space-y-3">
                {[
                  { key: 'activityTracking', label: 'Activity Tracking', description: 'Track your activity for personalized experience' },
                  { key: 'dataSharing', label: 'Data Sharing', description: 'Share anonymous data for research' },
                  { key: 'analytics', label: 'Analytics', description: 'Allow usage analytics' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleChange(item.key as keyof typeof tempSettings, !tempSettings[item.key as keyof typeof tempSettings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        tempSettings[item.key as keyof typeof tempSettings] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Theme Settings</h3>
              <div className="p-3 border border-gray-200 rounded-lg">
                <label className="block text-xs text-gray-700 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => handleChange('theme', theme.id)}
                      className={`p-3 border rounded-lg text-center ${
                        tempSettings.theme === theme.id
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Moon className={`h-5 w-5 mx-auto mb-1 ${
                        tempSettings.theme === theme.id ? 'text-orange-600' : 'text-gray-400'
                      }`} />
                      <span className="text-xs">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Display Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Compact Mode</p>
                    <p className="text-xs text-gray-500">Reduce spacing for more content</p>
                  </div>
                  <button
                    onClick={() => handleChange('compactMode', !tempSettings.compactMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      tempSettings.compactMode ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      tempSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs text-gray-700 mb-2">Font Size</label>
                  <div className="flex gap-2">
                    {fontSizeOptions.map(size => (
                      <button
                        key={size.value}
                        onClick={() => handleChange('fontSize', size.value)}
                        className={`flex-1 py-2 border rounded text-xs ${
                          tempSettings.fontSize === size.value
                            ? 'border-orange-600 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Data Management</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Export Data</p>
                      <p className="text-xs text-gray-500">Download all your data</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Backup Settings</p>
                      <p className="text-xs text-gray-500">Create a backup of your settings</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 text-red-600">Danger Zone</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Delete Account</p>
                      <p className="text-xs text-red-500">Permanently delete your account</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Settings className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600 text-xs mt-0.5">Manage your account preferences and settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-4">
              <div className="p-3">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                          activeTab === tab.id
                            ? "bg-orange-50 text-orange-700 border-l-3 border-orange-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isLoading}
                    className="flex-1 text-xs h-8"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs h-8"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white mr-1"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5 mr-1" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h2>
              </div>
              
              <div className="p-4">
                {renderTabContent()}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-4 w-4 text-blue-600" />
                  <h4 className="text-xs font-semibold text-blue-800">Need Help?</h4>
                </div>
                <p className="text-xs text-blue-700">
                  Visit our help center or contact support for assistance.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="text-xs font-semibold text-green-800">Settings Status</h4>
                </div>
                <p className="text-xs text-green-700">
                  {Object.values(tempSettings).filter(v => v === true).length} settings enabled
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <h4 className="text-xs font-semibold text-gray-800">Last Updated</h4>
                </div>
                <p className="text-xs text-gray-700">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}