"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, Filter, Download, FileText, BarChart, 
  TrendingUp, Calendar, Users, Stethoscope, Clock,
  PieChart, DownloadCloud, Eye, Printer, Share2,
  ChevronDown, X, ArrowUpDown, AlertCircle,
  CheckCircle, Plus, FileBarChart, FileSpreadsheet,Trash2
} from "lucide-react";
import NavBar from "../components/NavBar";

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState("last30");

  // Mock data for reports
  const reports = [
    { id: 1, name: "Monthly Discharge Summary", type: "summary", department: "All", status: "generated", date: "2024-01-20", size: "2.4 MB", downloads: 45 },
    { id: 2, name: "Cardiology Performance", type: "analytics", department: "Cardiology", status: "pending", date: "2024-01-19", size: "1.8 MB", downloads: 28 },
    { id: 3, name: "Patient Satisfaction Q4", type: "survey", department: "All", status: "generated", date: "2024-01-18", size: "3.2 MB", downloads: 67 },
    { id: 4, name: "Staff Productivity Report", type: "performance", department: "HR", status: "generated", date: "2024-01-17", size: "1.5 MB", downloads: 32 },
    { id: 5, name: "Financial Reconciliation", type: "financial", department: "Finance", status: "processing", date: "2024-01-16", size: "4.1 MB", downloads: 18 },
    { id: 6, name: "Medication Compliance", type: "compliance", department: "Pharmacy", status: "generated", date: "2024-01-15", size: "2.1 MB", downloads: 39 },
    { id: 7, name: "Emergency Room Metrics", type: "analytics", department: "ER", status: "generated", date: "2024-01-14", size: "2.7 MB", downloads: 51 },
    { id: 8, name: "Quarterly Audit Report", type: "audit", department: "All", status: "pending", date: "2024-01-13", size: "5.3 MB", downloads: 23 },
  ];

  const filters = [
    { id: "all", label: "All Reports" },
    { id: "generated", label: "Generated" },
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "analytics", label: "Analytics" },
    { id: "financial", label: "Financial" },
  ];

  const dateRanges = [
    { id: "today", label: "Today" },
    { id: "last7", label: "Last 7 days" },
    { id: "last30", label: "Last 30 days" },
    { id: "last90", label: "Last 90 days" },
    { id: "custom", label: "Custom Range" },
  ];

  const stats = [
    { label: "Total Reports", value: "246", change: "+8%", color: "bg-blue-500", icon: FileText },
    { label: "Generated Today", value: "14", change: "+12%", color: "bg-green-500", icon: CheckCircle },
    { label: "Pending Review", value: "8", change: "-2%", color: "bg-orange-500", icon: AlertCircle },
    { label: "Avg. Download", value: "42", change: "+15%", color: "bg-purple-500", icon: DownloadCloud },
  ];

  const reportTypes = [
    { type: "summary", label: "Summary", color: "bg-blue-100 text-blue-800", icon: FileText },
    { type: "analytics", label: "Analytics", color: "bg-green-100 text-green-800", icon: BarChart },
    { type: "survey", label: "Survey", color: "bg-purple-100 text-purple-800", icon: Users },
    { type: "performance", label: "Performance", color: "bg-orange-100 text-orange-800", icon: TrendingUp },
    { type: "financial", label: "Financial", color: "bg-red-100 text-red-800", icon: FileBarChart },
    { type: "compliance", label: "Compliance", color: "bg-indigo-100 text-indigo-800", icon: CheckCircle },
    { type: "audit", label: "Audit", color: "bg-gray-100 text-gray-800", icon: FileSpreadsheet },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "generated":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Generated" };
      case "pending":
        return { color: "bg-orange-100 text-orange-800", icon: Clock, label: "Pending" };
      case "processing":
        return { color: "bg-blue-100 text-blue-800", icon: Clock, label: "Processing" };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: Clock, label: "Pending" };
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = reportTypes.find(t => t.type === type) || reportTypes[0];
    return typeConfig;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredReports = reports.filter(report => {
    if (selectedFilter === "all") return true;
    return report.status === selectedFilter || report.type === selectedFilter;
  }).filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(filteredReports.map(r => r.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, id]);
    } else {
      setSelectedReports(selectedReports.filter(reportId => reportId !== id));
    }
  };

  return (
    <NavBar>
      <div className="min-h-screen bg-gray-50 p-3 md:p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600 text-sm mt-0.5">Generate and manage hospital reports and analytics</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Quick Report
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                New Report
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
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
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedFilter === filter.id 
                      ? "bg-orange-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-none sm:w-40">
                  <input
                    type="text"
                    placeholder="Search reports..."
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
                
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1.5 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    {dateRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        {selectedReports.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {selectedReports.length} report{selectedReports.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-red-600 hover:text-red-700">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reports Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2 px-3">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map(report => {
                  const statusConfig = getStatusBadge(report.status);
                  const StatusIcon = statusConfig.icon;
                  const typeConfig = getTypeBadge(report.type);
                  const TypeIcon = typeConfig.icon;
                  
                  return (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={(e) => handleRowSelect(report.id, e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                            <FileText className="h-3.5 w-3.5 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{report.name}</div>
                            <div className="text-xs text-gray-500">{report.size} • PDF</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${typeConfig.color}`}>
                          <TypeIcon className="h-3 w-3" />
                          {typeConfig.label}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <Stethoscope className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">{report.department}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">{formatDate(report.date)}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <DownloadCloud className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-800">{report.downloads}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Download">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Share">
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700" title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
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
          {filteredReports.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No reports found</h3>
              <p className="text-sm text-gray-500 mb-3">
                {searchTerm ? "Try adjusting your search" : "No reports match the selected filter"}
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
          {filteredReports.length > 0 && (
            <div className="px-3 py-3 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredReports.length}</span> of{' '}
                  <span className="font-medium">246</span> results
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
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
          {/* Report Types Distribution */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Report Types Distribution</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View Details
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { type: "Analytics", count: 42, color: "bg-green-500", percentage: 35 },
                { type: "Summary", count: 38, color: "bg-blue-500", percentage: 31 },
                { type: "Financial", count: 18, color: "bg-red-500", percentage: 15 },
                { type: "Performance", count: 12, color: "bg-orange-500", percentage: 10 },
                { type: "Compliance", count: 8, color: "bg-indigo-500", percentage: 7 },
                { type: "Other", count: 4, color: "bg-gray-500", percentage: 3 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-10 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800">Most Downloaded</h3>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Monthly Summary</span>
                  <span className="text-sm font-medium text-gray-800">67 downloads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Patient Satisfaction</span>
                  <span className="text-sm font-medium text-gray-800">51 downloads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">ER Metrics</span>
                  <span className="text-sm font-medium text-gray-800">45 downloads</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800">Generation Time</h3>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">2.4</span>
                <span className="text-sm text-gray-600 mb-0.5">minutes avg.</span>
                <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-auto">
                  -0.8 min
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Average report generation time</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <button className="bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">Custom Analytics</span>
            </div>
            <p className="text-xs text-gray-500">Create custom analytics reports</p>
          </button>
          
          <button className="bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <DownloadCloud className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">Export Data</span>
            </div>
            <p className="text-xs text-gray-500">Export data in multiple formats</p>
          </button>
          
          <button className="bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <PieChart className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">Visualizations</span>
            </div>
            <p className="text-xs text-gray-500">Create data visualizations</p>
          </button>
          
          <button className="bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">Schedule Reports</span>
            </div>
            <p className="text-xs text-gray-500">Schedule automated reports</p>
          </button>
        </div>
      </div>
    </NavBar>
  );
}