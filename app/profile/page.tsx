"use client";

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
    avatar: "/api/placeholder/100/100",
  });

  const [editableData, setEditableData] = useState({ ...profileData });

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProfileData({ ...editableData });
      setIsEditing(false);
      setIsLoading(false);
      alert("Profile updated successfully!");
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
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your account and professional information</p>
            </div>
            
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-orange-600 hover:bg-orange-700 gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border">
                        <Edit2 className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="text-xl font-bold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-500 w-full mb-2"
                      />
                    ) : (
                      <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
                    )}
                    
                    <div className="flex items-center gap-2 mb-1">
                      <Stethoscope className="h-4 w-4 text-orange-600" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.role}
                          onChange={(e) => handleChange('role', e.target.value)}
                          className="text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-500 w-full"
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{profileData.role}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        License: {profileData.licenseNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editableData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm min-h-[100px]"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editableData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{profileData.email}</span>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-gray-400" />
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Specialization</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData.specialization}
                          onChange={(e) => handleChange('specialization', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Stethoscope className="h-4 w-4 text-gray-400" />
                          <span>{profileData.specialization}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Joined Date</label>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(profileData.joinedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Performance Stats</h3>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className="font-semibold text-gray-800">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              </div>
              
              <div className="p-5">
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                        <action.icon className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings & Social */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Settings & Preferences</h3>
              </div>
              
              <div className="p-5 space-y-3">
                <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Notifications</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Account Settings</span>
                  </div>
                </button>
                
                <div className="pt-3 border-t">
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 mb-2 block">Connect with me</span>
                    <div className="flex gap-2">
                      {socialLinks.map((social, index) => (
                        <button
                          key={index}
                          className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <social.icon className={`h-4 w-4 ${social.color}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <LogOut className="h-4 w-4" />
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