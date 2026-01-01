import api from '@/lib/api';
import { StadiumsResponse } from '@/lib/types';

export const stadiumsService = {
  getMyStadiums: async (page: number = 1): Promise<StadiumsResponse> => {
    const response = await api.get('/stadiums/my-stadiums', {
      params: { page },
    });
    return response.data;
  },

  getStadiumById: async (id: string) => {
    const response = await api.get(`/stadiums/${id}`);
    return response.data;
  },

  createStadium: async (data: any) => {
    const response = await api.post('/stadiums', data);
    return response.data;
  },

  updateStadium: async (id: string, data: any) => {
    const response = await api.put(`/stadiums/${id}`, data);
    return response.data;
  },

  deleteStadium: async (id: string) => {
    const response = await api.delete(`/stadiums/${id}`);
    return response.data;
  },
};
