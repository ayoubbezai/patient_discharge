'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookings } from './hooks/useBookings';
import { Calendar, MapPin, Clock, Plus, Eye, Loader2, Download } from 'lucide-react';
import { format } from 'date-fns';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-emerald-100 text-emerald-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'refunded':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export default function BookingsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isLoading, error } = useBookings({ status: statusFilter !== 'all' ? statusFilter : undefined });

  const bookings = data?.bookings || [];
  const filteredBookings = bookings.filter((booking: any) =>
    booking.stadiumId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
  const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;

  if (isLoading) {
    return (
      <NavBar>
        <div className="px-2 py-2 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      </NavBar>
    );
  }

  if (error) {
    return (
      <NavBar>
        <div className="px-2 py-2 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
          <TopNavBar title="My Bookings" showSearch={false} />
          <hr className="my-2 border-slate-200" />
          <Card className="max-w-md mx-auto mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-4 text-center">
              <p className="text-red-700 font-medium text-sm">Failed to load bookings</p>
              <Button onClick={() => window.location.reload()} className="mt-3 bg-red-600 hover:bg-red-700 text-white h-7 text-xs">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </NavBar>
    );
  }

  return (
    <NavBar>
      <div className="px-2 py-2 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-6">
        <TopNavBar
          title="My Bookings"
          showSearch={true}
          search_placeholder="Search bookings..."
          setSearch={setSearchQuery}
          value={searchQuery}
        />
        <hr className="my-2 border-slate-200" />

        <div className="max-w-6xl mx-auto space-y-2">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-2">
                <p className="text-xs text-slate-600">Total Bookings</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{totalBookings}</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-2">
                <p className="text-xs text-slate-600">Total Spent</p>
                <p className="text-xl font-bold text-emerald-600 mt-0.5">{totalSpent.toLocaleString()} DA</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-2">
                <p className="text-xs text-slate-600">Completed</p>
                <p className="text-xl font-bold text-blue-600 mt-0.5">{completedBookings}</p>
              </CardContent>
            </Card>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-7 px-2 border border-slate-300 rounded-md text-xs focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <Button
              onClick={() => router.push('/bookings/new')}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs"
            >
              <Plus className="w-3 h-3" />
              New Booking
            </Button>
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredBookings.map((booking: any) => (
                <Card key={booking.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-900">Booking #{booking.id.slice(0, 8)}</p>
                        <p className="text-xs text-slate-600 mt-0.5">Stadium ID: {booking.stadiumId}</p>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} text-xs px-1.5 py-0`}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{booking.startTime} - {booking.endTime} ({booking.duration}h)</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600">Total</p>
                        <p className="text-sm font-bold text-emerald-600">{booking.totalPrice} DA</p>
                      </div>
                      <Badge className={`${getPaymentStatusColor(booking.paymentStatus)} text-xs px-1.5 py-0`}>
                        {booking.paymentStatus}
                      </Badge>
                    </div>

                    <div className="flex gap-1.5 pt-2 border-t border-slate-200">
                      <Button
                        onClick={() => router.push(`/bookings/${booking.id}`)}
                        variant="outline"
                        className="flex-1 h-7 text-xs gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-7 text-xs gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="pt-8 pb-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                <h3 className="text-base font-bold text-slate-900 mb-1">No Bookings Found</h3>
                <p className="text-slate-600 mb-4 text-sm">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No bookings match your filters.'
                    : "You haven't made any bookings yet."}
                </p>
                <Button
                  onClick={() => router.push('/bookings/new')}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  Create Your First Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </NavBar>
  );
}
