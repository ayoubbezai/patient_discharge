'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Plus, X, Loader2, MapPin, Clock, Phone, DollarSign, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';

const AMENITIES_OPTIONS = [
  'parking',
  'changing_rooms',
  'lighting',
  'cafeteria',
  'security',
  'wifi',
  'first_aid',
  'wheelchair_access',
  'restaurant',
  'bar',
];

export default function AddStadiumPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    name: 'Stade 5 Juillet 1962',
    address: 'Ouled Fayet, Algiers, Algeria',
    latitude: 36.7289,
    longitude: 2.9444,
    fieldSize: '11v11',
    pricePerHour: 8000,
    image: 'https://fr.reformsports.com/oachoata/2022/09/image-FEn7ype9G-transformed.jpeg',
    description: 'Large modern stadium suitable for professional and amateur matches',
    openTime: '07:00',
    closeTime: '00:00',
    contactPhone: '+213666123456',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricePerHour' || name === 'latitude' || name === 'longitude' 
        ? parseFloat(value) 
        : value,
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        amenities: selectedAmenities,
        images: images.filter(img => img.trim() !== ''),
      };

      const response = await api.post('/stadiums', payload);
      
      toast.success('Stadium created successfully!');
      router.push('/stadiums');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create stadium';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen pb-12">
        <TopNavBar title="Add New Stadium" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stadiums
        </button>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-slate-200">
                <CardTitle className="text-xl text-slate-900">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Stadium Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Stade 5 Juillet 1962"
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Field Size *</label>
                    <Input
                      name="fieldSize"
                      value={formData.fieldSize}
                      onChange={handleInputChange}
                      placeholder="e.g., 11v11"
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Address *
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g., Ouled Fayet, Algiers, Algeria"
                    required
                    disabled={isLoading}
                    className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Latitude</label>
                    <Input
                      name="latitude"
                      type="number"
                      step="0.0001"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="36.7289"
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Longitude</label>
                    <Input
                      name="longitude"
                      type="number"
                      step="0.0001"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="2.9444"
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your stadium..."
                    required
                    disabled={isLoading}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Hours */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-slate-200">
                <CardTitle className="text-xl text-slate-900">Pricing & Hours</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Price Per Hour (DA) *
                    </label>
                    <Input
                      name="pricePerHour"
                      type="number"
                      value={formData.pricePerHour}
                      onChange={handleInputChange}
                      placeholder="8000"
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      Opening Time *
                    </label>
                    <Input
                      name="openTime"
                      type="time"
                      value={formData.openTime}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      Closing Time *
                    </label>
                    <Input
                      name="closeTime"
                      type="time"
                      value={formData.closeTime}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Contact Phone *
                  </label>
                  <Input
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+213666123456"
                    required
                    disabled={isLoading}
                    className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                  Images
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Main Image *</label>
                    <Input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      required
                      disabled={isLoading}
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Additional Images</label>
                    {images.map((image, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          disabled={isLoading}
                          className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeImageField(index)}
                          disabled={isLoading}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addImageField}
                      disabled={isLoading}
                      className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
                <CardTitle className="text-xl text-slate-900">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES_OPTIONS.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      disabled={isLoading}
                      className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                        selectedAmenities.includes(amenity)
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      {amenity.replace(/_/g, ' ').toUpperCase()}
                    </button>
                  ))}
                </div>

                {selectedAmenities.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">Selected Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAmenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer"
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          {amenity.replace(/_/g, ' ')}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 px-6 h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8 h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Stadium...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Stadium
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
