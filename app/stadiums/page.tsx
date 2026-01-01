'use client';

import { useState } from 'react';
import { useStadiums } from './hooks/useStadiums';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Clock, Phone, Star, Loader2, Edit, Trash2, Plus, Building } from 'lucide-react';

export default function StadiumsPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useStadiums(page);

  if (isLoading) {
    return (
      <NavBar>
        <div className="px-4 py-3 bg-background min-h-screen">
          <TopNavBar title="Stadiums Management" showSearch={false} />
          <hr className="my-3 border-border" />
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        </div>
      </NavBar>
    );
  }

  if (error) {
    return (
      <NavBar>
        <div className="px-4 py-3 bg-background min-h-screen">
          <TopNavBar title="Stadiums Management" showSearch={false} />
          <hr className="my-3 border-border" />
          <Card className="max-w-md mx-auto mt-8">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600 mb-4">Failed to load stadiums. Please try again.</p>
              <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
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
      <div className="px-4 py-3 bg-background min-h-screen">
        <TopNavBar
          title="Stadiums Management"
          showSearch={true}
          search_placeholder="Search stadiums by name, location..."
          setSearch={setSearchQuery}
          value={searchQuery}
        />
        <hr className="my-3 border-border" />

        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Building className="h-5 w-5 text-green-600" />
            <span className="text-lg font-semibold text-gray-900">
              <span className="font-bold">{filteredStadiums.length}</span> Stadiums
            </span>
          </div>
          <Button className="gap-2 bg-green-600 hover:bg-green-700 h-9">
            <Plus className="h-4 w-4" />
            Add Stadium
          </Button>
        </div>

        {/* Stadiums Grid */}
        {filteredStadiums.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStadiums.map((stadium) => (
                <Card key={stadium.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Stadium Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={stadium.image}
                      alt={stadium.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/400x300?text=Stadium';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={stadium.isOpen ? 'default' : 'destructive'}>
                        {stadium.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{stadium.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {stadium.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{stadium.rating}</span>
                      <span className="text-sm text-muted-foreground">({stadium.totalReviews} reviews)</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {stadium.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Field Size</p>
                        <p className="font-semibold">{stadium.fieldSize}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price/Hour</p>
                        <p className="font-semibold">{stadium.pricePerHour} DA</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {stadium.openTime} - {stadium.closeTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{stadium.contactPhone}</span>
                      </div>
                    </div>

                    {stadium.amenities.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-1">
                          {stadium.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" className="flex-1" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {data?.totalPages && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {data.totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Building className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">No stadiums found</p>
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" />
                Create Stadium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </NavBar>
  );
}
