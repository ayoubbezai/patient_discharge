'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CancelBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const booking = {
    bookingNumber: 'BK-2026-001234',
    stadium: 'Stade 5 Juillet 1962',
    date: 'January 15, 2026',
    time: '18:00 - 20:00',
    price: 16000,
  };

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Booking cancelled successfully. Refund will be processed within 3-5 business days.');
      router.push('/bookings');
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Cancel Booking" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Warning */}
          <Card className="border-red-200 shadow-sm bg-red-50">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-900">Are you sure?</h3>
                <p className="text-xs text-red-700 mt-1">Cancelling this booking cannot be undone. You will receive a refund within 3-5 business days.</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Booking Details</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Booking ID</span>
                  <span className="font-mono font-semibold text-slate-900">{booking.bookingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Stadium</span>
                  <span className="font-semibold text-slate-900">{booking.stadium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date & Time</span>
                  <span className="font-semibold text-slate-900">{booking.date}, {booking.time}</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between">
                  <span className="font-semibold text-slate-900">Refund Amount</span>
                  <span className="text-lg font-bold text-emerald-600">{booking.price} DA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Reason */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <label className="text-sm font-semibold text-slate-900">Cancellation Reason (Required)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us why you're cancelling..."
                disabled={isLoading}
                rows={3}
                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
              />
              <p className="text-xs text-slate-500">This helps us improve our service</p>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card className="border-blue-200 shadow-sm bg-blue-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Refund Policy</h3>
              <ul className="space-y-1 text-xs text-blue-700">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Full refund if cancelled 24 hours before booking</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>50% refund if cancelled 12-24 hours before</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>No refund if cancelled less than 12 hours before</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 h-9 text-sm"
            >
              Keep Booking
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isLoading || !reason.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 h-9 text-sm gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Confirm Cancellation'
              )}
            </Button>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
