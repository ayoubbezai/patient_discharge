'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMatches } from './hooks/useMatches';
import { Calendar, MapPin, Users, Trophy, Eye, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-emerald-100 text-emerald-700';
    case 'full':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-slate-100 text-slate-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getSkillLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-700';
    case 'intermediate':
      return 'bg-blue-100 text-blue-700';
    case 'advanced':
      return 'bg-purple-100 text-purple-700';
    case 'professional':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export default function MatchesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');

  const { data, isLoading, error } = useMatches();

  const matches = data?.matches || [];
  const filteredMatches = matches.filter((match: any) => {
    const matchesSearch = match.stadiumId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || match.status === statusFilter;
    const matchesSkill = skillFilter === 'all' || match.skillLevel === skillFilter;
    return matchesSearch && matchesStatus && matchesSkill;
  });

  // Calculate stats
  const upcomingMatches = matches.filter((m: any) => m.status === 'open').length;
  const totalPlayers = matches.reduce((sum: number, m: any) => sum + (m.currentPlayers || 0), 0);

  if (isLoading) {
    return (
      <NavBar>
        <div className="px-3 py-2 bg-slate-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-slate-600 text-xs font-medium">Loading matches...</p>
          </div>
        </div>
      </NavBar>
    );
  }

  if (error) {
    return (
      <NavBar>
        <div className="px-3 py-2 bg-slate-50 min-h-screen">
          <TopNavBar title="Matches" showSearch={false} />
          <hr className="my-2 border-slate-200" />
          <Card className="max-w-md mx-auto mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-red-700 font-medium text-sm mb-2">Failed to load matches</p>
              <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white h-7 text-xs">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </NavBar>
    );
  }

  return (
    <NavBar>
      <div className="px-3 py-2 bg-slate-50 min-h-screen pb-6">
        <TopNavBar
          title="Matches"
          showSearch={true}
          search_placeholder="Search matches..."
          setSearch={setSearchQuery}
          value={searchQuery}
        />
        <hr className="my-2 border-slate-200" />

        <div className="max-w-6xl mx-auto space-y-2.5">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <Card className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Upcoming Matches</p>
                    <p className="text-xl font-bold text-emerald-600 mt-0.5">{upcomingMatches}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Total Players</p>
                    <p className="text-xl font-bold text-blue-600 mt-0.5">{totalPlayers}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Total Matches</p>
                    <p className="text-xl font-bold text-purple-600 mt-0.5">{matches.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-7 px-2 border border-slate-300 rounded-md text-xs focus:border-emerald-500 focus:ring-emerald-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="full">Full</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="h-7 px-2 border border-slate-300 rounded-md text-xs focus:border-emerald-500 focus:ring-emerald-500 bg-white"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </div>

          {/* Matches Grid */}
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredMatches.map((match: any) => (
                <Card key={match.id} className="border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 bg-white">
                  <CardContent className="p-2.5 space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-xs text-slate-900">Match #{match.id.slice(0, 8)}</p>
                        <Badge className={`${getSkillLevelColor(match.skillLevel)} text-xs px-1.5 py-0 mt-1`}>
                          {match.skillLevel}
                        </Badge>
                      </div>
                      <Badge className={`${getStatusColor(match.status)} text-xs px-1.5 py-0`}>
                        {match.status}
                      </Badge>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>Stadium: {match.stadiumId}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        <span>{format(new Date(match.date), 'MMM dd, yyyy')} at {match.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Trophy className="w-3 h-3 text-emerald-600" />
                        <span>{match.fieldSize}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Players</span>
                        <span className="text-xs font-semibold text-slate-900">
                          {match.currentPlayers}/{match.maxPlayers}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200">
                      <Button
                        onClick={() => router.push(`/matches/${match.id}`)}
                        variant="outline"
                        className="w-full h-7 text-xs gap-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-white">
              <CardContent className="pt-6 pb-6 text-center">
                <Users className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">No Matches Found</h3>
                <p className="text-slate-600 text-xs">
                  {searchQuery || statusFilter !== 'all' || skillFilter !== 'all'
                    ? 'No matches match your filters.'
                    : 'No matches available at the moment.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </NavBar>
  );
}
