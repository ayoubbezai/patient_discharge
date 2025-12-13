"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, Filter, Download, Plus, Clock, CheckCircle, 
  AlertCircle, User, Stethoscope, Calendar, FileText,
  ChevronDown, MoreVertical, Eye, Edit, Trash2,
  ArrowUpDown, X, Users, ClipboardCheck
} from "lucide-react";
import NavBar from "../components/NavBar";

export default function DischargePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Mock data for discharges
  const discharges = [
    { id: 1, patientName: "John Smith", mrn: "MRN-001234", department: "Cardiology", doctor: "Dr. Sarah Chen", status: "completed", admissionDate: "2024-01-15", dischargeDate: "2024-01-19", room: "304A", priority: "high" },
    { id: 2, patientName: "Emma Wilson", mrn: "MRN-001235", department: "Pediatrics", doctor: "Dr. Michael Brown", status: "in-progress", admissionDate: "2024-01-16", dischargeDate: "2024-01-20", room: "208B", priority: "medium" },
    { id: 3, patientName: "Robert Johnson", mrn: "MRN-001236", department: "Orthopedics", doctor: "Dr. James Wilson", status: "pending", admissionDate: "2024-01-14", dischargeDate: null, room: "412C", priority: "high" },
    { id: 4, patientName: "Maria Garcia", mrn: "MRN-001237", department: "Surgery", doctor: "Dr. Lisa Taylor", status: "completed", admissionDate: "2024-01-10", dischargeDate: "2024-01-14", room: "105D", priority: "low" },
    { id: 5, patientName: "David Chen", mrn: "MRN-001238", department: "Neurology", doctor: "Dr. Sarah Chen", status: "in-progress", admissionDate: "2024-01-17", dischargeDate: null, room: "309A", priority: "high" },
    { id: 6, patientName: "Sophia Williams", mrn: "MRN-001239", department: "Cardiology", doctor: "Dr. Michael Brown", status: "pending", admissionDate: "2024-01-18", dischargeDate: null, room: "204B", priority: "medium" },
    { id: 7, patientName: "James Miller", mrn: "MRN-001240", department: "Oncology", doctor: "Dr. Lisa Taylor", status: "completed", admissionDate: "2024-01-12", dischargeDate: "2024-01-16", room: "401C", priority: "low" },
    { id: 8, patientName: "Olivia Davis", mrn: "MRN-001241", department: "Pediatrics", doctor: "Dr. James Wilson", status: "in-progress", admissionDate: "2024-01-19", dischargeDate: null, room: "107D", priority: "high" },
  ];

  const filters = [
    { id: "all", label: "All Discharges" },
    { id: "pending", label: "Pending" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "today", label: "Today's Discharges" },
  ];

  const stats = [
    { label: "Total Discharges", value: "124", change: "+12%", color: "bg-blue-500" },
    { label: "Pending Review", value: "18", change: "-3%", color: "bg-orange-500" },
    { label: "In Progress", value: "24", change: "+8%", color: "bg-yellow-500" },
    { label: "Completed Today", value: "14", change: "+15%", color: "bg-green-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Completed" };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", icon: Clock, label: "In Progress" };
      case "pending":
        return { color: "bg-orange-100 text-orange-800", icon: AlertCircle, label: "Pending" };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: Clock, label: "Pending" };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high":
        return { color: "bg-red-100 text-red-800", label: "High" };
      case "medium":
        return { color: "bg-yellow-100 text-yellow-800", label: "Medium" };
      case "low":
        return { color: "bg-green-100 text-green-800", label: "Low" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Normal" };
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredDischarges = discharges.filter(discharge => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "today") {
      const today = new Date().toISOString().split('T')[0];
      return discharge.dischargeDate === today;
    }
    return discharge.status === selectedFilter;
  }).filter(discharge => 
    discharge.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discharge.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredDischarges.map(d => d.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  return (
    <NavBar>
      <div className="min-h-screen bg-gray-50 p-3 md:p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Discharge Management</h1>
              <p className="text-gray-600 text-sm mt-0.5">Manage patient discharges and track progress</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                New Discharge
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpDown className={`h-3 w-3 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-2 rounded-md flex items-center justify-center`}>
                    <ClipboardCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                    selectedFilter === filter.id 
                      ? "bg-orange-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <div className="relative flex-1 md:flex-none md:w-48">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1.5 focus:ring-orange-500 focus:border-transparent w-full"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        {selectedRows.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {selectedRows.length} discharge{selectedRows.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mark Complete
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Print Summary
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-red-600 hover:text-red-700">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Discharges Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2 px-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredDischarges.length && filteredDischarges.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Attending Doctor
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Discharge Date
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDischarges.map(discharge => {
                  const StatusIcon = getStatusBadge(discharge.status).icon;
                  const statusConfig = getStatusBadge(discharge.status);
                  const priorityConfig = getPriorityBadge(discharge.priority);
                  
                  return (
                    <tr key={discharge.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(discharge.id)}
                          onChange={(e) => handleRowSelect(discharge.id, e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{discharge.patientName}</div>
                            <div className="text-xs text-gray-500">{discharge.mrn} • Room {discharge.room}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <Stethoscope className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">{discharge.department}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-sm text-gray-700">{discharge.doctor}</div>
                        <div className="text-xs text-gray-500">
                          Adm: {formatDate(discharge.admissionDate)}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {discharge.dischargeDate ? formatDate(discharge.dischargeDate) : "Pending"}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Edit">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700" title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredDischarges.length === 0 && (
            <div className="py-12 text-center">
              <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No discharges found</h3>
              <p className="text-sm text-gray-500 mb-3">
                {searchTerm ? "Try adjusting your search" : "No discharges match the selected filter"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredDischarges.length > 0 && (
            <div className="px-3 py-3 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDischarges.length}</span> of{' '}
                  <span className="font-medium">124</span> results
                </div>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-orange-600 text-white hover:bg-orange-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Average Discharge Time</h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-800">4.2</span>
              <span className="text-sm text-gray-600 mb-0.5">days</span>
              <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-auto">
                -0.5 days
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">From admission to discharge</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Most Active Department</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-800">Cardiology</span>
              </div>
              <span className="text-sm font-bold text-gray-800">24 discharges</span>
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Discharge Compliance</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Documentation Complete</span>
              <span className="text-sm font-bold text-green-600">94%</span>
            </div>
            <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}