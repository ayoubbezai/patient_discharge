"use client"
import { TrendingUp, Calendar, Users, Trophy, TrendingDown } from "lucide-react";

// StatsCard component matching your design system
const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  badgeColor,
  description,
  trend,
  showCurrency = false,
  isLoading = false,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  iconColor: string;
  badgeColor: string;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  showCurrency?: boolean;
  isLoading?: boolean;
}) => {
  const formatValue = (val: number) => {
    return val.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-200  h-28">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`p-1.5 rounded-md ${iconColor} bg-opacity-10`}>
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-medium text-neutral-700 ml-2">{title}</h3>
          </div>
          
          {trend && (
            <div className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {trend.isPositive ? (
                <TrendingUp className="h-2.5 w-2.5" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-8">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-neutral-900 leading-tight">
                {showCurrency ? `${formatValue(value)} DA` : formatValue(value)}
              </p>
              {description && (
                <p className="text-xs text-neutral-500 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function StatsCards({
  isLoading = false,
  stats,
}: {
  isLoading?: boolean;
  stats?: {
    totalRevenue?: number;
    totalBookings?: number;
    activeMatches?: number;
    registeredPlayers?: number;
  };
}) {
  const defaultStats = {
    totalRevenue: 0,
    totalBookings: 0,
    activeMatches: 0,
    registeredPlayers: 0,
  };

  const safeStats = stats || defaultStats;
  
  const {
    totalRevenue = 0,
    totalBookings = 0,
    activeMatches = 0,
    registeredPlayers = 0,
  } = safeStats;

  // Mock trend data
  const trends = {
    revenue: { value: "+12.5%", isPositive: true },
    bookings: { value: "+8.2%", isPositive: true },
    matches: { value: "+5.3%", isPositive: true },
    players: { value: "+18.7%", isPositive: true },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Total Revenue - Show DA */}
      <StatsCard
        title="Total Revenue"
        value={totalRevenue}
        icon={TrendingUp}
        iconColor="text-green-600"
        badgeColor="bg-green-100 border border-green-200 text-green-700"
        description="Monthly revenue"
        trend={trends.revenue}
        showCurrency={true}
        isLoading={isLoading}
      />
      
      {/* Today's Bookings */}
      <StatsCard
        title="Today's Bookings"
        value={totalBookings}
        icon={Calendar}
        iconColor="text-blue-600"
        badgeColor="bg-blue-100 border border-blue-200 text-blue-700"
        description="Stadium reservations"
        trend={trends.bookings}
        showCurrency={false}
        isLoading={isLoading}
      />
      
      {/* Active Matches */}
      {/* <StatsCard
        title="Active Matches"
        value={activeMatches}
        icon={Trophy}
        iconColor="text-purple-600"
        badgeColor="bg-purple-100 border border-purple-200 text-purple-700"
        description="Live games"
        trend={trends.matches}
        showCurrency={false}
        isLoading={isLoading}
      /> */}
      
      {/* Registered Players */}
      <StatsCard
        title="Registered Players"
        value={registeredPlayers}
        icon={Users}
        iconColor="text-orange-600"
        badgeColor="bg-orange-100 border border-orange-200 text-orange-700"
        description="Active users"
        trend={trends.players}
        showCurrency={false}
        isLoading={isLoading}
      />
    </div>
  );
}