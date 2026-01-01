'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Clock, Phone, Star, Loader2, ArrowLeft, Share2, Flag, ChevronLeft, ChevronRight, Users, DollarSign, Calendar } from 'lucide-react';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Stadium } from '@/lib/types';

export default function StadiumDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const stadiumId = params.id as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: stadium, isLoading, error } = useQuery<{ stadium: Stadium }>({
    queryKey: ['stadium', stadiumId],
    queryFn: async () => {
      const response = await api.get(`/stadiums/${stadiumId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <NavBar>
        <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
          <TopNavBar title="Stadium Details" showSearch={false} />
          <hr className="my-3 border-slate-200" />
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
          </div>
        </div>
      </NavBar>
    );
  }

  if (error || !stadium) {
    return (
      <NavBar>
        <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
          <TopNavBar title="Stadium Details" showSearch={false} />
          <hr className="my-3 border-slate-200" />
          <Card className="max-w-md mx-auto mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-6 text-center">
              <p className="text-red-700 font-medium mb-4">Stadium not found</p>
              <Button onClick={() => router.back()} className="bg-red-600 hover:bg-red-700">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </NavBar>
    );
  }

  const stadiumData = stadium.stadium;
  const images = stadiumData.images && stadiumData.images.length > 0 ? stadiumData.images : [stadiumData.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen pb-12">
        <TopNavBar title={stadiumData.name} showSearch={false} />
        <hr className="my-3 border-slate-200" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stadiums
        </button>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Image Gallery */}
          <Card className="border-slate-200 shadow-lg overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group">
              <img
                src={images[currentImageIndex]}
                alt={stadiumData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop';
                }}
              />

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6 text-slate-900" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge 
                  className={`font-semibold shadow-lg ${
                    stadiumData.isOpen 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {stadiumData.isOpen ? '● Open Now' : '● Closed'}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <Card className="border-slate-200 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">{stadiumData.name}</h1>
                      <p className="text-slate-600 flex items-center gap-2 mt-2">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        {stadiumData.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white border-2 border-amber-200 rounded-lg px-4 py-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-lg text-slate-900">{stadiumData.rating.toFixed(1)}</span>
                      <span className="text-sm text-slate-600">({stadiumData.totalReviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed">{stadiumData.description}</p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-slate-600 text-sm font-medium">Field Size</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-1">{stadiumData.fieldSize}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-600 text-sm font-medium">Price/Hour</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{stadiumData.pricePerHour} DA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-600 text-sm font-medium">Distance</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">{stadiumData.distance || 0} km</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <Card className="border-slate-200 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Details</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-slate-600">Operating Hours</p>
                        <p className="font-semibold text-slate-900">{stadiumData.openTime} - {stadiumData.closeTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Phone className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-slate-600">Contact</p>
                        <p className="font-semibold text-slate-900">{stadiumData.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              {stadiumData.amenities && stadiumData.amenities.length > 0 && (
                <Card className="border-slate-200 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                      {stadiumData.amenities.map((amenity) => (
                        <Badge 
                          key={amenity} 
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-medium"
                        >
                          {amenity.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Book This Stadium</h2>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-emerald-200">
                      <p className="text-sm text-slate-600">Price per Hour</p>
                      <p className="text-2xl font-bold text-emerald-600">{stadiumData.pricePerHour} DA</p>
                    </div>

                    <Button 
                      onClick={() => router.push(`/bookings/new?stadiumId=${stadiumId}`)}
                      className="w-full h-11 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold shadow-lg"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>

                    <Button 
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border-slate-200 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-600">Capacity</p>
                      <p className="font-semibold text-slate-900">Multiple fields available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-slate-600">Payment</p>
                      <p className="font-semibold text-slate-900">Secure & Easy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
