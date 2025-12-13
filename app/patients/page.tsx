'use client';

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Search, Filter, Plus, Users, Activity, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PatientTable from "./PatientTable";

// Sample data types
interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  address: string;
  department: string;
  status: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Header stats data - Made smaller
  const stats = [
    {
      title: "Total Patients",
      value: "156",
      change: "+12%",
      icon: <Users className="h-4 w-4 text-blue-600" />, // Smaller icon
      color: "bg-blue-50",
      description: "Active patients"
    },
    {
      title: "Today's Discharges",
      value: "18",
      change: "+3",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />, // Smaller icon
      color: "bg-green-50",
      description: "Scheduled for today"
    },
    {
      title: "Pending Clearance",
      value: "12",
      change: "-2",
      icon: <Clock className="h-4 w-4 text-orange-600" />, // Smaller icon
      color: "bg-orange-50",
      description: "Awaiting approval"
    },
    {
      title: "Critical Cases",
      value: "7",
      change: "+1",
      icon: <Activity className="h-4 w-4 text-red-600" />, // Smaller icon
      color: "bg-red-50",
      description: "Require attention"
    }
  ];

  // Function to generate random color for patient avatars
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
        const sampleData: Patient[] = [
          {
            id: 1,
            first_name: "John",
            last_name: "Smith",
            email: "john.smith@example.com",
            phone_number: "+1 (555) 123-4567",
            date_of_birth: "1985-03-15",
            address: "123 Main St, New York",
            department: "Cardiology",
            status: "active"
          },
          {
            id: 2,
            first_name: "Maria",
            last_name: "Garcia",
            email: "maria.garcia@example.com",
            phone_number: "+1 (555) 234-5678",
            date_of_birth: "1978-11-22",
            address: "456 Oak Ave, Los Angeles",
            department: "Orthopedics",
            status: "pending"
          },
          {
            id: 3,
            first_name: "Robert",
            last_name: "Chen",
            email: "robert.chen@example.com",
            phone_number: "+1 (555) 345-6789",
            date_of_birth: "1992-07-30",
            address: "789 Pine Rd, Chicago",
            department: "Neurology",
            status: "discharged"
          },
          {
            id: 4,
            first_name: "Sarah",
            last_name: "Johnson",
            email: "sarah.j@example.com",
            phone_number: "+1 (555) 456-7890",
            date_of_birth: "1989-12-05",
            address: "101 Elm St, Houston",
            department: "Pediatrics",
            status: "critical"
          },
          {
            id: 5,
            first_name: "David",
            last_name: "Brown",
            email: "david.brown@example.com",
            phone_number: "+1 (555) 567-8901",
            date_of_birth: "1975-05-18",
            address: "202 Maple Dr, Phoenix",
            department: "Oncology",
            status: "active"
          },
          {
            id: 6,
            first_name: "Lisa",
            last_name: "Wang",
            email: "lisa.wang@example.com",
            phone_number: "+1 (555) 678-9012",
            date_of_birth: "1990-09-25",
            address: "303 Cedar Ln, Philadelphia",
            department: "Surgery",
            status: "pending"
          },
          {
            id: 7,
            first_name: "Michael",
            last_name: "Taylor",
            email: "michael.t@example.com",
            phone_number: "+1 (555) 789-0123",
            date_of_birth: "1982-02-14",
            address: "404 Birch St, San Antonio",
            department: "Cardiology",
            status: "active"
          },
          {
            id: 8,
            first_name: "Emma",
            last_name: "Davis",
            email: "emma.davis@example.com",
            phone_number: "+1 (555) 890-1234",
            date_of_birth: "1995-08-08",
            address: "505 Spruce Ave, San Diego",
            department: "Maternity",
            status: "discharged"
          }
        ];

        setPatients(sampleData);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err);
        console.error("Error loading patient data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name.toLowerCase().includes(searchLower) ||
      patient.last_name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.department.toLowerCase().includes(searchLower) ||
      patient.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto p-3 md:p-4"> {/* Reduced padding */}
        {/* Page Header - Made smaller */}


        {/* Stats Cards - Made smaller */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-4"> {/* Reduced gap and margin */}
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border p-3 shadow-sm"> {/* Reduced padding */}
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${stat.color}`}> {/* Smaller padding */}
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-2"> {/* Reduced margin */}
                <p className="text-lg font-bold text-gray-900">{stat.value}</p> {/* Smaller text */}
                <p className="text-xs font-medium text-gray-700">{stat.title}</p> {/* Smaller text */}
                <p className="text-xs text-gray-500 mt-0.5">{stat.description}</p> {/* Smaller text */}
              </div>
            </div>
          ))}
        </div>

                <div className="flex my-4 py-4 flex-row justify-between items-start md:items-center gap-3 mb-4"> {/* Reduced gap and margin */}
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold text-gray-900">Patient Management</h1> {/* Smaller text */}
            <p className="text-sm text-gray-600">Manage and monitor patient information</p> {/* Smaller text */}
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 h-9"> {/* Smaller button */}
            <Plus className="h-3.5 w-3.5 mr-1.5" /> {/* Smaller icon */}
            Add New Patient
          </Button>
        </div>

        {/* Search and Filter Bar - Made smaller */}
       

        {/* Patients Table Section - Made smaller */}
        <div className="mt-3"> {/* Reduced margin */}
          
          <PatientTable
            data={filteredPatients}
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