'use client';

import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar, MapPin, Star, Activity, ArrowUp, ArrowDown } from 'lucide-react';

// Hardcoded Analytics Data
const bookingTrendData = [
  { month: 'Jan', bookings: 45, revenue: 225000 },
  { month: 'Feb', bookings: 52, revenue: 260000 },
  { month: 'Mar', bookings: 48, revenue: 240000 },
  { month: 'Apr', bookings: 61, revenue: 305000 },
  { month: 'May', bookings: 55, revenue: 275000 },
  { month: 'Jun', bookings: 67, revenue: 335000 },
];

const stadiumPerformanceData = [
  { name: 'Stade 5 Juillet', bookings: 28, revenue: 224000, rating: 4.8 },
  { name: 'Stade El Harrach', bookings: 22, revenue: 110000, rating: 4.2 },
  { name: 'Stade Mustapha', bookings: 18, revenue: 144000, rating: 4.5 },
  { name: 'Stade Olympique', bookings: 15, revenue: 120000, rating: 4.1 },
  { name: 'Stade Municipal', bookings: 12, revenue: 96000, rating: 3.9 },
];

const bookingStatusData = [
  { name: 'Completed', value: 145, color: '#10b981' },
  { name: 'Pending', value: 32, color: '#f59e0b' },
  { name: 'Cancelled', value: 18, color: '#ef4444' },
];

const revenueByStadium = [
  { stadium: 'Stade 5 Juillet', revenue: 224000 },
  { stadium: 'Stade El Harrach', revenue: 110000 },
  { stadium: 'Stade Mustapha', revenue: 144000 },
  { stadium: 'Stade Olympique', revenue: 120000 },
  { stadium: 'Stade Municipal', revenue: 96000 },
];

const dailyBookingsData = [
  { day: 'Mon', bookings: 12 },
  { day: 'Tue', bookings: 15 },
  { day: 'Wed', bookings: 10 },
  { day: 'Thu', bookings: 18 },
  { day: 'Fri', bookings: 22 },
  { day: 'Sat', bookings: 28 },
  { day: 'Sun', bookings: 16 },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: 'up' | 'down';
  trendValue?: string;
  color: string;
}) => (
  <Card className="border-slate-200 shadow-sm">
    <CardContent className="p-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-xs font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AnalyticsPage() {
  const totalRevenue = 694000;
  const totalBookings = 195;
  const totalStadiums = 5;
  const averageRating = 4.3;

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen pb-12">
        <TopNavBar title="Analytics & Reports" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Revenue"
              value={`${(totalRevenue / 1000).toFixed(0)}K DA`}
              icon={DollarSign}
              trend="up"
              trendValue="+12.5%"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatCard
              title="Total Bookings"
              value={totalBookings}
              icon={Calendar}
              trend="up"
              trendValue="+8.2%"
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              title="Active Stadiums"
              value={totalStadiums}
              icon={MapPin}
              trend="up"
              trendValue="+1"
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <StatCard
              title="Avg Rating"
              value={averageRating}
              icon={Star}
              trend="up"
              trendValue="+0.3"
              color="bg-gradient-to-br from-amber-500 to-orange-600"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Booking Trends */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-slate-200">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Booking Trends (6 Months)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Booking Status */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50 border-b border-slate-200">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Booking Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Stadium */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-50 border-b border-slate-200">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Revenue by Stadium
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByStadium}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="stadium" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Bookings */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-slate-200">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Daily Bookings (This Week)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyBookingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Bar dataKey="bookings" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stadium Performance Table */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-50 border-b border-slate-200">
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-slate-600" />
                Stadium Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Stadium</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">Bookings</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">Revenue</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">Rating</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stadiumPerformanceData.map((stadium, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-900 font-medium">{stadium.name}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-blue-100 text-blue-700">{stadium.bookings}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-900 font-semibold">
                          {(stadium.revenue / 1000).toFixed(0)}K DA
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-slate-900">{stadium.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-emerald-900 mb-2">Total Earnings</h3>
                <p className="text-3xl font-bold text-emerald-700">{(totalRevenue / 1000).toFixed(0)}K DA</p>
                <p className="text-xs text-emerald-600 mt-2">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Avg Booking Value</h3>
                <p className="text-3xl font-bold text-blue-700">{(totalRevenue / totalBookings).toFixed(0)} DA</p>
                <p className="text-xs text-blue-600 mt-2">Per booking average</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-purple-900 mb-2">Occupancy Rate</h3>
                <p className="text-3xl font-bold text-purple-700">78%</p>
                <p className="text-xs text-purple-600 mt-2">Average across all stadiums</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
