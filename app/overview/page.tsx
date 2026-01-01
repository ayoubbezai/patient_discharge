"use client";

import { useState } from "react";
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import StatsCards from "./components/StatsCards";
import BookingTrendsGraph from "./components/BookingTrendsGraph";
import TodayMatches from "./components/TodayMatches";
import RecentBookingsTable from "./components/RecentBookingsTable";
import PaginationFooter  from "@/components/PaginationFooter";

// Mock data for the overview
const mockStats = {
  totalRevenue: 450000, // DA
  totalBookings: 28,
  activeMatches: 12,
  registeredPlayers: 156,
};

const mockGraphData = [
  { date: "Jan 1", bookings: 8 },
  { date: "Jan 2", bookings: 12 },
  { date: "Jan 3", bookings: 10 },
  { date: "Jan 4", bookings: 15 },
  { date: "Jan 5", bookings: 18 },
  { date: "Jan 6", bookings: 22 },
  { date: "Jan 7", bookings: 20 },
];

const mockTodayMatches = [
  {
    id: 1,
    team1: "Algiers United",
    team2: "FC Blida",
    stadium: "July 5 Stadium",
    time: "18:00",
    skillLevel: "Advanced",
    status: "scheduled",
  },
  {
    id: 2,
    team1: "Casbah FC",
    team2: "Sahel Strikers",
    stadium: "El Annasser Stadium",
    time: "20:30",
    skillLevel: "Intermediate",
    status: "scheduled",
  },
  {
    id: 3,
    team1: "Oran Lions",
    team2: "Constantine Eagles",
    stadium: "Ahmed Zabana Stadium",
    time: "15:00",
    skillLevel: "Beginner",
    status: "completed",
  },
  {
    id: 4,
    team1: "Kabyle Warriors",
    team2: "Sahara FC",
    stadium: "August 20 Stadium",
    time: "16:30",
    skillLevel: "Intermediate",
    status: "in_progress",
  },
  {
    id: 5,
    team1: "Tlemcen FC",
    team2: "Annaba United",
    stadium: "Stade 19 Mai 1956",
    time: "19:00",
    skillLevel: "Advanced",
    status: "scheduled",
  },
];

const mockRecentBookings = [
  {
    id: 1,
    booking_id: "BK001",
    stadium_id: 1,
    user_id: 101,
    booking_date: new Date().toISOString(),
    start_time: "18:00",
    end_time: "20:00",
    status: "confirmed",
    total_amount: 15000,
    payment_status: "paid",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stadium: {
      id: 1,
      name: "July 5 Stadium",
      location: "Algiers",
      capacity: 64000,
      image: null,
    },
    user: {
      id: 101,
      first_name: "Karim",
      last_name: "Benzema",
      image: null,
    },
    match_details: "Team training session",
  },
  {
    id: 2,
    booking_id: "BK002",
    stadium_id: 2,
    user_id: 102,
    booking_date: new Date().toISOString(),
    start_time: "14:00",
    end_time: "16:00",
    status: "pending",
    total_amount: 12000,
    payment_status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stadium: {
      id: 2,
      name: "El Annasser Stadium",
      location: "Algiers",
      capacity: 15000,
      image: null,
    },
    user: {
      id: 102,
      first_name: "Riyad",
      last_name: "Mahrez",
      image: null,
    },
    match_details: "Friendly match",
  },
  {
    id: 3,
    booking_id: "BK003",
    stadium_id: 3,
    user_id: 103,
    booking_date: new Date().toISOString(),
    start_time: "09:00",
    end_time: "11:00",
    status: "confirmed",
    total_amount: 8000,
    payment_status: "paid",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stadium: {
      id: 3,
      name: "Ahmed Zabana Stadium",
      location: "Oran",
      capacity: 40000,
      image: null,
    },
    user: {
      id: 103,
      first_name: "Islam",
      last_name: "Slimani",
      image: null,
    },
    match_details: "Youth tournament",
  },
  {
    id: 4,
    booking_id: "BK004",
    stadium_id: 4,
    user_id: 104,
    booking_date: new Date().toISOString(),
    start_time: "20:00",
    end_time: "22:00",
    status: "canceled",
    total_amount: 18000,
    payment_status: "refunded",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stadium: {
      id: 4,
      name: "August 20 Stadium",
      location: "Constantine",
      capacity: 25000,
      image: null,
    },
    user: {
      id: 104,
      first_name: "Yacine",
      last_name: "Brahimi",
      image: null,
    },
    match_details: "Night league match",
  },
  {
    id: 5,
    booking_id: "BK005",
    stadium_id: 5,
    user_id: 105,
    booking_date: new Date().toISOString(),
    start_time: "16:00",
    end_time: "18:00",
    status: "confirmed",
    total_amount: 9000,
    payment_status: "paid",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stadium: {
      id: 5,
      name: "Stade 19 Mai 1956",
      location: "Annaba",
      capacity: 56000,
      image: null,
    },
    user: {
      id: 105,
      first_name: "Aïssa",
      last_name: "Mandi",
      image: null,
    },
    match_details: "Corporate tournament",
  },
];

const mockPagination = {
  current_page: 1,
  total_items: 45,
  total_pages: 9,
  per_page: 5,
};

export default function Dashboard() {
  const [graphType, setGraphType] = useState<"W" | "M" | "Y">("M");
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const getRandomColor = (name: string) => {
    if (!name) return 'bg-green-500';
    const colors = [
      'bg-green-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-teal-500',
      'bg-indigo-500',
      'bg-yellow-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <NavBar>
      <div className="px-2 py-2 bg-slate-50 min-h-screen">
        <TopNavBar
          title="Dashboard Overview"
          showSearch={true}
        />
        <hr className="my-2 border-gray-200" />

        {/* Top section with cards and sidebar - Equal height layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 h-full">
          {/* Main content area - 9 columns */}
          <div className="lg:col-span-9 space-y-2 h-full">
            {/* Stats Cards */}
            <div className="h-auto">
              <StatsCards stats={mockStats} isLoading={isLoading} />
            </div>
            
            {/* Booking Trends Graph - Fixed height */}
            <div className="h-64">
              <BookingTrendsGraph
                graphData={mockGraphData}
                graphType={graphType}
                setGraphType={setGraphType}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Right sidebar - Today's Matches - 3 columns */}
          <div className="lg:col-span-3 h-full">
            {/* Today's Matches with fixed height to match graph */}
              <TodayMatches
                matches={mockTodayMatches}
                isLoading={isLoading}
              />
          </div>
        </div>

        {/* Recent Bookings Table Section */}
        <div className="mt-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-semibold text-gray-900">Recent Bookings</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Latest stadium reservations</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Total: {mockPagination.total_items}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-0">
              <RecentBookingsTable
                data={mockRecentBookings}
                isLoading={isLoading}
                isError={false}
                error={null}
                getRandomColor={getRandomColor}
              />
              
              {/* Always show pagination footer */}
              <PaginationFooter
                currentPage={currentPage}
                totalItems={mockPagination.total_items}
                totalPages={mockPagination.total_pages}
                perPage={perPage}
                sortDirection={sortDirection}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setPerPage}
                onSortDirectionChange={setSortDirection}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}