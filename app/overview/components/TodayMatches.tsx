"use client"
import { Trophy, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Match {
  id: number;
  team1: string;
  team2: string;
  stadium: string;
  time: string;
  skillLevel: string;
  status: string;
}

interface TodayMatchesProps {
  isLoading?: boolean;
  matches?: Match[];
}

const MatchItem = ({ match }: { match: Match }) => {
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
            Scheduled
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium animate-pulse">
            LIVE
          </span>
        );
      case 'completed':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
            Completed
          </span>
        );
      default:
        return (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
            {status}
          </span>
        );
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return "text-green-600 bg-green-100";
      case 'intermediate':
        return "text-yellow-600 bg-yellow-100";
      case 'advanced':
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors duration-150 group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-green-100 rounded">
            <Trophy className="h-3 w-3 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-semibold text-gray-900">
              {match.team1} vs {match.team2}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
            {match.time}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[11px] text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[100px]">{match.stadium}</span>
          </div>
          <div className={`text-[10px] px-1.5 py-0.5 rounded ${getSkillLevelColor(match.skillLevel)}`}>
            {match.skillLevel}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[11px] text-gray-600">
            <Users className="h-3 w-3 mr-1" />
            <span>Team Match</span>
          </div>
          {getStatusBadge(match.status)}
        </div>
      </div>
    </div>
  );
};

const SimplePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  totalItems: number;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 bg-gray-50">
      <div className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-7 w-7 p-0 text-xs border-gray-300 hover:bg-gray-50"
        >
          ←
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-7 w-7 p-0 text-xs border-gray-300 hover:bg-gray-50"
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default function TodayMatches({
  isLoading = false,
  matches = [],
}: TodayMatchesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(matches.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMatches = matches.slice(startIndex, endIndex);

  const liveMatchesCount = matches.filter(match => 
    match.status === 'in_progress'
  ).length;

  const scheduledMatchesCount = matches.filter(match => 
    match.status === 'scheduled'
  ).length;

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Today's Matches
          </h2>
          <div className="w-12 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2.5 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-200 h-16 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 pb-3 rounded-lg border border-gray-200 gap-[0.55rem] min-h-fit flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">
          Today's Matches
        </h2>
        <div className="flex items-center space-x-2">
          {liveMatchesCount > 0 && (
            <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium animate-pulse">
              {liveMatchesCount} LIVE
            </span>
          )}
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
            {scheduledMatchesCount} scheduled
          </span>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {displayedMatches.length === 0 ? (
          <div className="text-center py-6 flex-1 flex flex-col items-center justify-center">
            <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mb-1">No matches today</p>
            <p className="text-[11px] text-gray-400">
              Matches will appear here when scheduled
            </p>
          </div>
        ) : (
          <>
            {displayedMatches.map((match) => (
              <MatchItem key={match.id} match={match} />
            ))}
          </>
        )}
      </div>

      <SimplePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={matches.length}
      />
    </div>
  );
}