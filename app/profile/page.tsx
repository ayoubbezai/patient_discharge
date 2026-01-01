'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/lib/authService';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Mail, Phone, Edit2, Save, X, LogOut, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('/auth/me');
      const user = response.data.user;
      setUserData(user);
      setEditData(user);
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsFetching(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(`/users/${userData.id}`, editData);
      setUserData(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (changePassword.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: changePassword.currentPassword,
        newPassword: changePassword.newPassword,
      });
      setChangePassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (isFetching) {
    return (
      <NavBar>
        <div className="px-2 py-2 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      </NavBar>
    );
  }

  if (!userData) {
    return (
      <NavBar>
        <div className="px-2 py-2 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen flex items-center justify-center">
          <p className="text-slate-600">Failed to load profile</p>
        </div>
      </NavBar>
    );
  }

  const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <NavBar>
      <div className="px-2 py-2 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen pb-6">
        <TopNavBar title="My Profile" showSearch={false} />
        <hr className="my-2 border-slate-200" />

        <div className="max-w-4xl mx-auto space-y-2">
          {/* Profile Header */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                      {userData.name?.charAt(0) || 'U'}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-slate-900">{userData.name}</h1>
                    <p className="text-slate-600 text-xs mt-0.5">Member since {memberSince}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {userData.position && (
                        <Badge className="bg-emerald-100 text-emerald-700 capitalize text-xs px-1.5 py-0">
                          {userData.position}
                        </Badge>
                      )}
                      {userData.skillLevel && (
                        <Badge className="bg-blue-100 text-blue-700 capitalize text-xs px-1.5 py-0">
                          {userData.skillLevel}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`gap-1 h-7 text-xs text-white ${
                    isEditing
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-3 h-3" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Section */}
          {isEditing && (
            <Card className="border-emerald-200 shadow-sm bg-emerald-50">
              <CardHeader className="bg-gradient-to-r from-emerald-100 to-emerald-50 border-b border-emerald-200 p-2">
                <CardTitle className="text-emerald-900 text-sm">Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-900">Full Name</label>
                    <Input
                      name="name"
                      value={editData.name || ''}
                      onChange={handleEditChange}
                      disabled={isLoading}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-900">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={editData.email || ''}
                      onChange={handleEditChange}
                      disabled={isLoading}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-900">Phone</label>
                    <Input
                      name="phoneNumber"
                      value={editData.phoneNumber || ''}
                      onChange={handleEditChange}
                      disabled={isLoading}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-900">Position</label>
                    <select
                      name="position"
                      value={editData.position || ''}
                      onChange={handleEditChange}
                      disabled={isLoading}
                      className="w-full h-7 px-2 border border-slate-300 rounded-md text-xs focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="">Select position</option>
                      <option value="goalkeeper">Goalkeeper</option>
                      <option value="defender">Defender</option>
                      <option value="midfielder">Midfielder</option>
                      <option value="forward">Forward</option>
                    </select>
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-slate-900">Skill Level</label>
                    <select
                      name="skillLevel"
                      value={editData.skillLevel || ''}
                      onChange={handleEditChange}
                      disabled={isLoading}
                      className="w-full h-7 px-2 border border-slate-300 rounded-md text-xs focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="">Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-emerald-200">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-1 h-7 text-xs text-white"
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(userData);
                    }}
                    disabled={isLoading}
                    variant="outline"
                    className="flex-1 h-7 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-slate-200 p-2">
              <CardTitle className="text-slate-900 text-sm">Contact</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <Mail className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Email</p>
                    <p className="font-semibold text-slate-900 text-xs">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <Phone className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Phone</p>
                    <p className="font-semibold text-slate-900 text-xs">{userData.phoneNumber || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50 border-b border-slate-200 p-2">
              <CardTitle className="text-slate-900 flex items-center gap-2 text-sm">
                <Lock className="w-3 h-3 text-purple-600" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-slate-900">Current Password</label>
                <div className="relative">
                  <Input
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={changePassword.currentPassword}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    className="h-7 text-xs pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-slate-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-slate-900">New Password</label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={changePassword.newPassword}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    className="h-7 text-xs pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-slate-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-slate-900">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={changePassword.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="h-7 text-xs"
                />
              </div>
              <Button
                onClick={handleChangePassword}
                disabled={isLoading || !changePassword.currentPassword || !changePassword.newPassword}
                className="w-full bg-purple-600 hover:bg-purple-700 h-7 text-xs text-white"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Update Password'}
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="border-red-200 shadow-sm bg-red-50">
            <CardContent className="p-2">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-100 h-7 text-xs gap-1"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavBar>
  );
}
