'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CreateMatchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    skillLevel: 'intermediate',
    maxPlayers: 11,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxPlayers' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Match created successfully!');
      router.push('/matches');
    } catch (error) {
      toast.error('Failed to create match');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Create Match" showSearch={false} />
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
            {/* Basic Info */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Match Title</label>
                  <Input
                    name="title"
                    placeholder="e.g., Friendly Football Match"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your match..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    rows={2}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
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
                    <label className="text-xs font-semibold text-slate-900">Time</label>
                    <Input
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Details */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900">Location</label>
                  <Input
                    name="location"
                    placeholder="e.g., Stade 5 Juillet 1962"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">Skill Level</label>
                    <select
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full h-9 px-2 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-900">Max Players</label>
                    <select
                      name="maxPlayers"
                      value={formData.maxPlayers}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full h-9 px-2 border border-slate-300 rounded-md text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      {[5, 7, 9, 11, 13, 15].map(num => (
                        <option key={num} value={num}>{num} players</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs">
              <input type="checkbox" required className="mt-0.5" />
              <span className="text-slate-600">I agree to the match terms and conditions</span>
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
                    Creating...
                  </>
                ) : (
                  'Create Match'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
}
