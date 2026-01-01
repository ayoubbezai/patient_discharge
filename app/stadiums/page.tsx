'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStadiums } from './hooks/useStadiums';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Clock, Phone, Star, Loader2, Edit, Trash2, Plus, Building } from 'lucide-react';

export default function StadiumsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useStadiums(page);

  if (isLoading) {
    return (
      <NavBar>
        <div className="px-3 py-2 bg-slate-50 min-h-screen">
          <TopNavBar title="Stadiums Management" showSearch={false} />
          <hr className="my-2 border-slate-200" />
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-slate-600 text-xs font-medium">Loading stadiums...</p>
            </div>
          </div>
        </div>
      </NavBar>
    );
  }

  if (error) {
    return (
      <NavBar>
        <div className="px-3 py-2 bg-slate-50 min-h-screen">
          <TopNavBar title="Stadiums Management" showSearch={false} />
          <hr className="my-2 border-slate-200" />
          <Card className="max-w-md mx-auto mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-red-700 font-medium mb-2 text-sm">Failed to load stadiums</p>
              <p className="text-red-600 text-xs mb-3">Please check your connection and try again</p>
              <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white h-7 text-xs">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </NavBar>
    );
  }

  const stadiums = data?.stadiums || [];
  const filteredStadiums = stadiums.filter(stadium =>
    stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stadium.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <NavBar>
      <div className="px-3 py-2 bg-slate-50 min-h-screen pb-6">
        <TopNavBar
          title="Stadiums Management"
          showSearch={true}
          search_placeholder="Search stadiums by name, location..."
          setSearch={setSearchQuery}
          value={searchQuery}
        />
        <hr className="my-2 border-slate-200" />

        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-600 to-emerald-400 rounded-full"></div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Your Stadiums</h2>
              <p className="text-slate-500 text-xs">Manage and monitor all your venues</p>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/stadiums/new')}
            className="gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all h-8 px-3 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Stadium
          </Button>
        </div>

        {/* Stadiums Grid */}
        {filteredStadiums.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {filteredStadiums.map((stadium) => (
                <div key={stadium.id} className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-emerald-300 bg-white">
                    {/* Stadium Image Container */}
                    <div className="relative h-36 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                      <img
                        src={stadium.image}
                        alt={stadium.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop';
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2 z-10">
                        <Badge 
                          className={`font-semibold shadow-lg text-xs px-2 py-0.5 ${
                            stadium.isOpen 
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          {stadium.isOpen ? '● Open' : '● Closed'}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-900 text-xs">{stadium.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-2.5 space-y-1.5">
                      {/* Stadium Name and Location */}
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                          {stadium.name}
                        </h3>
                        <p className="text-slate-600 text-xs flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="line-clamp-1">{stadium.address}</span>
                        </p>
                      </div>

                      {/* Key Stats Grid */}
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="bg-emerald-50 rounded p-1.5 border border-emerald-200">
                          <p className="text-emerald-700 text-xs font-semibold">Field</p>
                          <p className="text-slate-900 font-bold text-xs mt-0.5">{stadium.fieldSize}</p>
                        </div>
                        <div className="bg-blue-50 rounded p-1.5 border border-blue-200">
                          <p className="text-blue-700 text-xs font-semibold">Price</p>
                          <p className="text-slate-900 font-bold text-xs mt-0.5">{stadium.pricePerHour}DA</p>
                        </div>
                        <div className="bg-purple-50 rounded p-1.5 border border-purple-200">
                          <p className="text-purple-700 text-xs font-semibold">Reviews</p>
                          <p className="text-slate-900 font-bold text-xs mt-0.5">{stadium.totalReviews}</p>
                        </div>
                      </div>

                      {/* Hours and Contact */}
                      <div className="space-y-0.5 pt-1.5 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs">{stadium.openTime} - {stadium.closeTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Phone className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs">{stadium.contactPhone}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      {stadium.amenities.length > 0 && (
                        <div className="pt-1.5 border-t border-slate-200">
                          <p className="text-slate-700 text-xs font-semibold mb-1">Amenities</p>
                          <div className="flex flex-wrap gap-1">
                            {stadium.amenities.slice(0, 3).map((amenity) => (
                              <Badge 
                                key={amenity} 
                                className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs px-1.5 py-0"
                              >
                                {amenity}
                              </Badge>
                            ))}
                            {stadium.amenities.length > 3 && (
                              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs px-1.5 py-0">
                                +{stadium.amenities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-1.5 pt-1.5 border-t border-slate-200">
                        <Button 
                          variant="outline" 
                          className="flex-1 gap-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 h-7 text-xs"
                          onClick={() => router.push(`/stadiums/${stadium.id}`)}
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 gap-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 h-7 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data?.totalPages && data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-3">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-slate-300 hover:bg-slate-100 h-7 text-xs"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-slate-200 rounded-lg">
                  <span className="text-xs font-semibold text-slate-900">
                    Page <span className="text-emerald-600">{page}</span> of <span className="text-emerald-600">{data.totalPages}</span>
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="border-slate-300 hover:bg-slate-100 h-7 text-xs"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="border-slate-200 bg-white">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <Building className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">No Stadiums Found</h3>
              <p className="text-slate-600 mb-3 max-w-sm mx-auto text-xs">
                {searchQuery 
                  ? "No stadiums match your search. Try adjusting your filters."
                  : "You haven't added any stadiums yet. Get started by creating your first venue."}
              </p>
              <Button className="gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg h-7 text-xs" onClick={() => router.push('/stadiums/new')}>
                <Plus className="h-3.5 w-3.5" />
                Create Stadium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </NavBar>
  );
}
