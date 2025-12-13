'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users, Clock, CheckCircle, XCircle,
  TrendingUp, Activity, ArrowRight,
  UserPlus, FileText, Stethoscope, Shield
} from "lucide-react";
import Navbar from "../components/NavBar";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalDischarges: 0,
    pendingClearance: 0,
    successRate: 0,
    readmissions: 0
  });

  const [recentDischarges, setRecentDischarges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data
    setTimeout(() => {
      setStats({
        totalDischarges: 156,
        pendingClearance: 12,
        successRate: 94,
        readmissions: 3
      });

      setRecentDischarges([
        { id: 1, patient: "John Smith", department: "Cardiology", time: "09:30 AM", status: "Completed" },
        { id: 2, patient: "Maria Garcia", department: "Orthopedics", time: "10:15 AM", status: "In Process" },
        { id: 3, patient: "Robert Chen", department: "Neurology", time: "11:45 AM", status: "Completed" },
        { id: 4, patient: "Sarah Johnson", department: "Pediatrics", time: "01:20 PM", status: "Pending" },
      ]);

      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed": return 'text-green-600';
      case "In Process": return 'text-orange-600';
      case "Pending": return 'text-gray-600';
      default: return 'text-gray-600';
    };
  };

  const getDepartmentColor = (department: string) => {
    switch(department) {
      case "Cardiology": return "bg-red-100 text-red-800";
      case "Orthopedics": return "bg-blue-100 text-blue-800";
      case "Neurology": return "bg-purple-100 text-purple-800";
      case "Pediatrics": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    };
  };

  return (
    <Navbar>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-orange-50 border border-orange-200 p-2 flex items-center justify-center">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Discharge Dashboard</h1>
              <p className="text-sm text-gray-600">Patient discharge management system</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* Total Discharges */}
          <div className="bg-white rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Total Discharges</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalDischarges}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending Clearance */}
          <div className="bg-white rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Pending Clearance</p>
                <p className="text-xl font-bold text-gray-800">{stats.pendingClearance}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Success Rate</p>
                <p className="text-xl font-bold text-green-600">
                  {stats.successRate}%
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          {/* Readmissions */}
          <div className="bg-white rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">7-Day Readmissions</p>
                <p className="text-xl font-bold text-red-600">{stats.readmissions}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Recent Discharges */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-600" />
                  <h3 className="font-medium text-gray-800 text-sm">Recent Discharges</h3>
                </div>
                <Link href="/discharges">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              
              <div className="divide-y">
                {recentDischarges.map((discharge) => (
                  <div key={discharge.id} className="p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                          <UserPlus className="h-3 w-3 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">
                            {discharge.patient}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${getDepartmentColor(discharge.department)}`}>
                              {discharge.department}
                            </span>
                            <span className="text-xs text-gray-500">• {discharge.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-base font-bold ${getStatusColor(discharge.status)}`}>
                          {discharge.status}
                        </div>
                        <div className="text-xs text-gray-500">Status</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg border h-full">
              <div className="p-3 border-b">
                <h3 className="font-medium text-gray-800 text-sm">Quick Actions</h3>
              </div>
              
              <div className="p-3 space-y-2">
                <Link href="/discharges/new">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <UserPlus className="h-4 w-4" />
                    New Discharge
                  </Button>
                </Link>
                
                <Link href="/patients">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    View Patients
                  </Button>
                </Link>
                
                <Link href="/reports">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    Generate Reports
                  </Button>
                </Link>

                <Link href="/staff">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Staff Schedule
                  </Button>
                </Link>
              </div>

              {/* Today's Summary */}
              <div className="p-3 border-t">
                <h4 className="font-medium text-gray-800 text-xs mb-2">Today&apos;s Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Morning Shift</span>
                    <span className="font-medium">18 patients</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Afternoon Shift</span>
                    <span className="font-medium">24 patients</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Time</span>
                    <span className="font-medium text-orange-600">3.2h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-medium text-gray-800 mb-3">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">156 discharges this month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">94% discharge success rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">12 departments active</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">42 staff members online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Real-time patient tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Automated report generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}