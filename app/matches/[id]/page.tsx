'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NavBar from '@/components/layout/NavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Loader2, UserPlus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export default function MatchDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const match = {
    id: matchId,
    title: 'Friendly Football Match',
    date: 'January 20, 2026',
    time: '18:00',
    duration: '90 minutes',
    location: 'Stade 5 Juillet 1962',
    address: 'Ouled Fayet, Algiers',
    skillLevel: 'Intermediate',
    status: 'upcoming',
    organizer: {
      name: 'محمد علي',
      avatar: '👤',
    },
    players: [
      { id: 1, name: 'أحمد محمد', position: 'Goalkeeper', skillLevel: 'Beginner' },
      { id: 2, name: 'علي حسن', position: 'Defender', skillLevel: 'Intermediate' },
      { id: 3, name: 'فاطمة أحمد', position: 'Midfielder', skillLevel: 'Advanced' },
      { id: 4, name: 'سارة علي', position: 'Forward', skillLevel: 'Intermediate' },
      { id: 5, name: 'محمود حسن', position: 'Defender', skillLevel: 'Beginner' },
    ],
    maxPlayers: 11,
    description: 'Friendly match for all skill levels. Come and enjoy a fun game with other football enthusiasts.',
    rules: [
      'Fair play and respect for all players',
      'No aggressive behavior',
      'Follow FIFA rules',
      'Arrive 15 minutes early',
    ],
  };

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsJoined(true);
      toast.success('You joined the match!');
    } catch (error) {
      toast.error('Failed to join match');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsJoined(false);
      toast.success('You left the match');
    } catch (error) {
      toast.error('Failed to leave match');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavBar>
      <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pb-8">
        <TopNavBar title="Match Details" showSearch={false} />
        <hr className="my-3 border-slate-200" />

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{match.title}</h1>
              <p className="text-xs text-slate-600 mt-1">Organized by {match.organizer.name}</p>
            </div>
            <Badge className={`text-xs font-semibold ${
              match.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              match.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
              'bg-red-100 text-red-700'
            }`}>
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </Badge>
          </div>

          {/* Match Info */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Date</p>
                  <p className="text-sm font-semibold text-slate-900">{match.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Time</p>
                  <p className="text-sm font-semibold text-slate-900">{match.time} ({match.duration})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Location</p>
                  <p className="text-sm font-semibold text-slate-900">{match.location}</p>
                  <p className="text-xs text-slate-500">{match.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-600">Skill Level</p>
                  <p className="text-sm font-semibold text-slate-900">{match.skillLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">About This Match</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{match.description}</p>
            </CardContent>
          </Card>

          {/* Players */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Players ({match.players.length}/{match.maxPlayers})
                </h3>
              </div>

              <div className="space-y-2">
                {match.players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{player.name}</p>
                      <p className="text-xs text-slate-600">{player.position}</p>
                    </div>
                    <Badge className="bg-slate-200 text-slate-700 text-xs">{player.skillLevel}</Badge>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-600">
                  {match.maxPlayers - match.players.length} spots available
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Match Rules</h3>
              <ul className="space-y-1">
                {match.rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button
            onClick={isJoined ? handleLeave : handleJoin}
            disabled={isLoading}
            className={`w-full h-9 text-sm gap-2 text-white ${
              isJoined
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                {isJoined ? 'Leaving...' : 'Joining...'}
              </>
            ) : (
              <>
                {isJoined ? (
                  <>
                    <UserMinus className="w-3 h-3" />
                    Leave Match
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    Join Match
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </div>
    </NavBar>
  );
}
