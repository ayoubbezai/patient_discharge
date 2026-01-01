'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Calendar, MapPin, Clock, DollarSign, ArrowLeft } from 'lucide-react';

export default function BookingConfirmationPage() {
  const router = useRouter();

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Booking Confirmed" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
            <p className="text-slate-600 text-sm">Your stadium booking has been successfully confirmed</p>
          </div>

          {/* Booking Details */}
          <Card className="border-slate-200 shadow-sm mb-4">
            <CardContent className="p-4 space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-xs text-emerald-600 font-semibold">BOOKING ID</p>
                <p className="text-lg font-bold text-emerald-700 font-mono">BK-2026-001234</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Stadium</p>
                    <p className="text-sm font-semibold text-slate-900">Stade 5 Juillet 1962</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Date</p>
                    <p className="text-sm font-semibold text-slate-900">January 15, 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Time</p>
                    <p className="text-sm font-semibold text-slate-900">18:00 - 20:00 (2 hours)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Total Amount</p>
                    <p className="text-sm font-semibold text-slate-900">16,000 DA</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">Confirmed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-slate-200 shadow-sm mb-4 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">What's Next?</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Arrive 15 minutes before your booking time</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Check in at the stadium reception</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                const element = document.createElement('a');
                element.href = '#';
                element.download = 'booking-invoice.pdf';
                element.click();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 h-9 text-sm gap-2"
            >
              <Download className="w-3 h-3" />
              Download Invoice
            </Button>
            <Button
              onClick={() => router.push('/bookings')}
              variant="outline"
              className="w-full h-9 text-sm"
            >
              View All Bookings
            </Button>
            <Button
              onClick={() => router.push('/stadiums')}
              variant="ghost"
              className="w-full h-9 text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Browse More Stadiums
            </Button>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
