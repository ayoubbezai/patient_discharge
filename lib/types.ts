export interface Stadium {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  fieldSize: string;
  pricePerHour: number;
  rating: number;
  image: string;
  isOpen: boolean;
  description: string;
  amenities: string[];
  images: string[];
  openTime: string;
  closeTime: string;
  contactPhone: string;
  totalReviews: number;
  createdAt: string;
  distance: number;
  status?: 'premium' | 'standard' | 'maintenance' | 'closed';
  revenueToday?: number;
  bookingsToday?: number;
}

export interface StadiumsResponse {
  stadiums: Stadium[];
  total: number;
  page: number;
  totalPages: number;
  pagination?: {
    total_items: number;
    total_pages: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  position: string;
  skillLevel: string;
  profileComplete: boolean;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
