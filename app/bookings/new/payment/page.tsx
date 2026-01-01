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
import { ArrowLeft, CreditCard, Lock, Loader2 } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '8000';
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Payment successful!');
      router.push('/bookings/new/confirmation');
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Payment" showSearch={false} />
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
            {/* Order Summary */}
            <Card className="border-slate-200 shadow-sm bg-blue-50">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Order Summary</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stadium Booking</span>
                    <span className="font-semibold">{amount} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-semibold">0 DA</span>
                  </div>
                  <div className="border-t border-blue-200 pt-1 flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-base font-bold text-blue-600">{amount} DA</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card Details
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Card Number</label>
                  <Input
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Card Holder</label>
                  <Input
                    name="cardHolder"
                    placeholder="John Doe"
                    value={cardData.cardHolder}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">Expiry Date</label>
                    <Input
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardData.expiryDate}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">CVV</label>
                    <Input
                      name="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <div className="flex items-center gap-2 text-xs text-slate-600 p-3 bg-slate-100 rounded-lg">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Your payment is secure and encrypted</span>
            </div>

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
                    <Lock className="w-3 h-3" />
                    Pay {amount} DA
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
