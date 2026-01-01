'use client';

import { useRouter, useParams } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, User, Phone, Mail, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id;

  const booking = {
    id: bookingId,
    bookingNumber: 'BK-2026-001234',
    stadium: 'Stade 5 Juillet 1962',
    address: 'Ouled Fayet, Algiers',
    date: 'January 15, 2026',
    startTime: '18:00',
    endTime: '20:00',
    duration: 2,
    price: 16000,
    status: 'confirmed',
    paymentStatus: 'paid',
    user: {
      name: 'أحمد محمد',
      email: 'user@example.com',
      phone: '+213555123456',
    },
    notes: 'Professional match preparation',
    createdAt: 'January 10, 2026',
  };

  const handleCancel = () => {
    toast.success('Booking cancelled successfully');
    router.push('/bookings');
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Booking Details" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{booking.stadium}</h1>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {booking.address}
              </p>
            </div>
            <Badge className={`text-xs font-semibold ${
              booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
              booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          {/* Booking Info */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-600 font-semibold">Booking ID</p>
                  <p className="text-sm font-mono font-bold text-slate-900 mt-0.5">{booking.bookingNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold">Booking Date</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{booking.createdAt}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Date</p>
                    <p className="text-sm font-semibold text-slate-900">{booking.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Time</p>
                    <p className="text-sm font-semibold text-slate-900">{booking.startTime} - {booking.endTime} ({booking.duration}h)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-emerald-200 shadow-sm bg-emerald-50">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Price per hour</span>
                <span className="font-semibold text-slate-900">8,000 DA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Duration</span>
                <span className="font-semibold text-slate-900">{booking.duration} hours</span>
              </div>
              <div className="border-t border-emerald-200 pt-2 flex justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-lg font-bold text-emerald-600">{booking.price} DA</span>
              </div>
              <div className="pt-2 border-t border-emerald-200">
                <Badge className="bg-emerald-600 text-white text-xs">
                  {booking.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Booking Information</h3>
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Name</p>
                  <p className="text-sm font-semibold text-slate-900">{booking.user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Email</p>
                  <p className="text-sm font-semibold text-slate-900">{booking.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Phone</p>
                  <p className="text-sm font-semibold text-slate-900">{booking.user.phone}</p>
                </div>
              </div>
              {booking.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold">Special Requests</p>
                  <p className="text-sm text-slate-700 mt-1">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                const element = document.createElement('a');
                element.href = '#';
                element.download = `booking-${booking.bookingNumber}.pdf`;
                element.click();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 h-9 text-sm gap-2"
            >
              <Download className="w-3 h-3" />
              Download Invoice
            </Button>
            <Button
              onClick={() => router.push(`/bookings/${bookingId}/cancel`)}
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50 h-9 text-sm gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Cancel Booking
            </Button>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
