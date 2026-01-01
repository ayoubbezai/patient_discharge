'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, Clock, DollarSign, Loader2 } from 'lucide-react';

export default function CreateBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stadiumId = searchParams.get('stadiumId');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: 1,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseFloat(value) : value,
    }));
  };

  const pricePerHour = 8000;
  const totalPrice = formData.duration * pricePerHour;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Booking created! Proceeding to payment...');
      router.push(`/bookings/new/payment?amount=${totalPrice}`);
    } catch (error) {
      toast.error('Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="New Booking" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Stadium Info */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-2">Stade 5 Juillet 1962</h3>
                <p className="text-xs text-slate-600">Ouled Fayet, Algiers</p>
                <Badge className="mt-2 bg-emerald-100 text-emerald-700 text-xs">8000 DA/hour</Badge>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">Date</label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">Start Time</label>
                    <Input
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Duration (hours)</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full h-9 px-2 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map(h => (
                      <option key={h} value={h}>{h} hour{h !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Special Requests</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requests..."
                    disabled={isLoading}
                    rows={2}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="border-emerald-200 shadow-sm bg-emerald-50">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Price per hour</span>
                  <span className="font-semibold text-slate-900">{pricePerHour} DA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">{formData.duration}h</span>
                </div>
                <div className="border-t border-emerald-200 pt-2 flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-emerald-600">{totalPrice} DA</span>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs">
              <input type="checkbox" required className="mt-0.5" />
              <span className="text-slate-600">I agree to the booking terms and conditions</span>
            </label>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="flex-1 h-9 text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-9 text-sm gap-2 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-3 h-3" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
}
