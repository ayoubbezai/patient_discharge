'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, MapPin, Edit2, Save, X,
  Calendar, Shield, Stethoscope, Clock, Briefcase,
  Bell, Settings, LogOut, Smartphone, Globe,
  Linkedin, Facebook, Instagram, Twitter, MessageSquare
} from "lucide-react";
import NavBar from "../components/NavBar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data for the profile
  const [profileData, setProfileData] = useState({
    id: "DOC-001",
    name: "Dr. John Doe",
    email: "john.doe@medicare-hospital.org",
    phone: "+1 (555) 123-4567",
    department: "Cardiology",
    role: "Senior Physician",
    specialization: "Interventional Cardiology",
    licenseNumber: "MD-123456",
    joinedDate: "2021-03-15",
    location: "New York, NY",
    bio: "Senior physician specializing in interventional cardiology with 12 years of experience.",
  });

  const [editableData, setEditableData] = useState({ ...profileData });

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProfileData({ ...editableData });
      setIsEditing(false);
      setIsLoading(false);
    }, 800);
  };

  const handleCancel = () => {
    setEditableData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditableData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stats = [
    { label: "Total Patients", value: "1,284" },
    { label: "Discharges This Month", value: "47" },
    { label: "Avg Patient Stay", value: "4.2 days" },
    { label: "Patient Satisfaction", value: "94%" },
  ];

  const quickActions = [
    { label: "Schedule Appointment", icon: Calendar },
    { label: "View Schedule", icon: Clock },
    { label: "Patient Records", icon: User },
    { label: "Discharge Forms", icon: Briefcase },
  ];

  const socialLinks = [
    { platform: "linkedin", icon: Linkedin, color: "text-blue-700" },
    { platform: "facebook", icon: Facebook, color: "text-blue-600" },
    { platform: "instagram", icon: Instagram, color: "text-pink-600" },
    { platform: "twitter", icon: Twitter, color: "text-blue-400" },
  ];

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 text-xs mt-1">Manage your account and professional information</p>
            </div>
            
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-1.5 h-9 text-sm"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-orange-600 hover:bg-orange-700 gap-1.5 h-9 text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="gap-1.5 h-9 text-sm"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">

                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm border">
                        <Edit2 className="h-3 w-3 text-gray-600" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="text-base font-bold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-500 w-full mb-1 text-sm"
                      />
                    ) : (
                      <h2 className="text-base font-bold text-gray-800">{profileData.name}</h2>
                    )}
                    
                    <div className="flex items-center gap-1.5 mb-1">
                      <Stethoscope className="h-3.5 w-3.5 text-orange-600" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.role}
                          onChange={(e) => handleChange('role', e.target.value)}
                          className="text-xs text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-500 w-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-600">{profileData.role}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        License: {profileData.licenseNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Professional Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editableData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs min-h-[80px]"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 text-xs leading-relaxed">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Contact Information</h3>
              </div>
              
              <div className="p-3">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editableData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <span className="truncate">{profileData.email}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editableData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                          <span>{profileData.department}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Specialization</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.specialization}
                          onChange={(e) => handleChange('specialization', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Stethoscope className="h-3.5 w-3.5 text-gray-400" />
                          <span>{profileData.specialization}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Joined Date</label>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{formatDate(profileData.joinedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Performance Stats</h3>
              </div>
              
              <div className="p-3">
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{stat.label}</span>
                      <span className="font-semibold text-gray-800 text-sm">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Quick Actions</h3>
              </div>
              
              <div className="p-3">
                <div className="space-y-1.5">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-8 p-2 rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                        <action.icon className="h-1.5 w-1.5 text-orange-600" />
                      </div>
                      <span className="text-xs  ml-3 font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings & Social */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Settings & Preferences</h3>
              </div>
              
              <div className="p-3 space-y-2">
                <button className="w-full flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Bell className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs text-gray-700">Notifications</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Settings className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs text-gray-700">Account Settings</span>
                  </div>
                </button>
                
                <div className="pt-2 border-t">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 mb-1 block">Connect with me</span>
                    <div className="flex gap-1.5">
                      {socialLinks.map((social, index) => (
                        <button
                          key={index}
                          className="h-7 w-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <social.icon className={`h-3.5 w-3.5 ${social.color}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-8 text-xs"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}