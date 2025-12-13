'use client';

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Search, Filter, Plus, Users, Briefcase, Clock, CheckCircle, Phone, Mail, Calendar, Star, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StaffTable from "./StaffTable";

// Sample data types
interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
  shift: string;
  status: string;
  hire_date: string;
  experience_years: number;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Header stats data
  const stats = [
    {
      title: "Total Staff",
      value: "87",
      change: "+5%",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-50",
      description: "Active staff members"
    },
    {
      title: "On Duty",
      value: "42",
      change: "+8",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      color: "bg-green-50",
      description: "Currently working"
    },
    {
      title: "Doctors",
      value: "28",
      change: "+2",
      icon: <Briefcase className="h-4 w-4 text-purple-600" />,
      color: "bg-purple-50",
      description: "Medical professionals"
    },
    {
      title: "Nurses",
      value: "45",
      change: "-1",
      icon: <Users className="h-4 w-4 text-pink-600" />,
      color: "bg-pink-50",
      description: "Nursing staff"
    }
  ];

  // Function to generate random color for staff avatars
  const getRandomColor = (name: string): string => {
    const colors = [
      "bg-orange-500",
      "bg-blue-500", 
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-red-500",
      "bg-amber-500",
      "bg-indigo-500"
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample data
        const sampleData: Staff[] = [
          {
            id: 1,
            first_name: "Sarah",
            last_name: "Miller",
            email: "sarah.miller@medicare.com",
            phone_number: "+1 (555) 123-4567",
            department: "Cardiology",
            role: "Senior Doctor",
            shift: "Day Shift",
            status: "active",
            hire_date: "2018-06-15",
            experience_years: 12
          },
          {
            id: 2,
            first_name: "James",
            last_name: "Wilson",
            email: "james.wilson@medicare.com",
            phone_number: "+1 (555) 234-5678",
            department: "Orthopedics",
            role: "Lead Surgeon",
            shift: "Day Shift",
            status: "active",
            hire_date: "2015-03-22",
            experience_years: 15
          },
          {
            id: 3,
            first_name: "Emma",
            last_name: "Chen",
            email: "emma.chen@medicare.com",
            phone_number: "+1 (555) 345-6789",
            department: "Neurology",
            role: "Head Nurse",
            shift: "Night Shift",
            status: "on-leave",
            hire_date: "2020-11-30",
            experience_years: 8
          },
          {
            id: 4,
            first_name: "David",
            last_name: "Lee",
            email: "david.lee@medicare.com",
            phone_number: "+1 (555) 456-7890",
            department: "Pediatrics",
            role: "Pediatrician",
            shift: "Day Shift",
            status: "active",
            hire_date: "2019-09-12",
            experience_years: 9
          },
          {
            id: 5,
            first_name: "Lisa",
            last_name: "Taylor",
            email: "lisa.taylor@medicare.com",
            phone_number: "+1 (555) 567-8901",
            department: "Oncology",
            role: "Oncologist",
            shift: "Day Shift",
            status: "active",
            hire_date: "2016-07-18",
            experience_years: 14
          },
          {
            id: 6,
            first_name: "Michael",
            last_name: "Brown",
            email: "michael.brown@medicare.com",
            phone_number: "+1 (555) 678-9012",
            department: "Emergency",
            role: "Emergency Doctor",
            shift: "Night Shift",
            status: "active",
            hire_date: "2021-02-14",
            experience_years: 7
          },
          {
            id: 7,
            first_name: "Sophia",
            last_name: "Garcia",
            email: "sophia.garcia@medicare.com",
            phone_number: "+1 (555) 789-0123",
            department: "Radiology",
            role: "Radiologist",
            shift: "Day Shift",
            status: "off-duty",
            hire_date: "2017-08-25",
            experience_years: 11
          },
          {
            id: 8,
            first_name: "Robert",
            last_name: "Davis",
            email: "robert.davis@medicare.com",
            phone_number: "+1 (555) 890-1234",
            department: "Surgery",
            role: "Surgeon",
            shift: "Day Shift",
            status: "active",
            hire_date: "2014-12-05",
            experience_years: 16
          }
        ];

        setStaff(sampleData);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err);
        console.error("Error loading staff data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter staff based on search term
  const filteredStaff = staff.filter(staffMember => {
    const searchLower = searchTerm.toLowerCase();
    return (
      staffMember.first_name.toLowerCase().includes(searchLower) ||
      staffMember.last_name.toLowerCase().includes(searchLower) ||
      staffMember.email.toLowerCase().includes(searchLower) ||
      staffMember.department.toLowerCase().includes(searchLower) ||
      staffMember.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs font-medium text-gray-700">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Page Header */}
        <div className="flex my-4 py-4 flex-row justify-between items-start md:items-center gap-3 mb-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-sm text-gray-600">Manage and monitor hospital staff information</p>
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 h-9">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add New Staff
          </Button>
        </div>

        {/* Search and Filter Bar */}
       

        {/* Staff Table Section */}
        <div className="mt-3">

          
          <StaffTable
            data={filteredStaff}
            isLoading={isLoading}
            isError={isError}
            error={error}
            getRandomColor={getRandomColor}
          />
        </div>
      </div>
    </NavBar>
  );
}