"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: number;
  booking_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  stadium: {
    name: string;
    location: string;
  };
  user: {
    first_name: string;
    last_name: string;
    image: string | null;
  };
  match_details: string;
  status: string;
  total_amount: number;
  payment_status: string;
}

interface RecentBookingsTableProps {
  isLoading?: boolean;
  data?: Booking[];
  isError?: boolean;
  error?: any;
  getRandomColor?: (name: string) => string;
}

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs font-medium px-2 py-0.5 rounded-[4px] capitalize">
          Confirmed
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs font-medium px-2 py-0.5 rounded-[4px] capitalize">
          Pending
        </Badge>
      );
    case 'canceled':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs font-medium px-2 py-0.5 rounded-[4px] capitalize">
          Canceled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs font-medium px-2 py-0.5 rounded-[4px] capitalize">
          {status}
        </Badge>
      );
  }
};

const getPaymentBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">
          Paid
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">
          Pending
        </Badge>
      );
    case 'refunded':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">
          Refunded
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">
          {status}
        </Badge>
      );
  }
};

export default function RecentBookingsTable({
  isLoading = false,
  data = [],
  isError = false,
  error = null,
  getRandomColor = () => 'bg-green-500',
}: RecentBookingsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <p className="text-sm text-red-600">Error loading bookings</p>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()} DA`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-gray-200">
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">Time</TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">User</TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">Stadium</TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">Match Details</TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">Amount</TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-gray-800 whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">No bookings found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((booking) => (
                <TableRow key={booking.id} className="border-gray-200 hover:bg-gray-50/50">
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-800">
                          {booking.start_time} - {booking.end_time}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs ${getRandomColor(booking.user?.first_name || '')}`}>
                        {booking.user?.first_name?.[0] || '?'}{booking.user?.last_name?.[0] || '?'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-800">
                          {booking.user ? 
                            `${booking.user.first_name} ${booking.user.last_name}` : 
                            '—'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-800">
                        {booking.stadium.name}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{booking.stadium.location}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-xs text-gray-600">
                      {booking.match_details || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-gray-800">
                        {formatAmount(booking.total_amount)}
                      </span>
                      {getPaymentBadge(booking.payment_status)}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {getStatusBadge(booking.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}