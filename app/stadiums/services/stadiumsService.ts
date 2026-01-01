import api from '@/lib/api';
import { StadiumsResponse } from '@/lib/types';

export const stadiumsService = {
  getAllStadiums: async (page: number = 1, params?: any): Promise<StadiumsResponse> => {
    const response = await api.get('/stadiums', {
      params: { page, limit: 20, ...params },
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
