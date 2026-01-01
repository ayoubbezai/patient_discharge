import api from '@/lib/api';

export const matchesService = {
  getAllMatches: async (params?: any) => {
    const response = await api.get('/matches', { params });
    return response.data;
  },

  getMatchById: async (id: string) => {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  createMatch: async (data: any) => {
    const response = await api.post('/matches', data);
    return response.data;
  },

  joinMatch: async (id: string) => {
    const response = await api.post(`/matches/${id}/join`);
    return response.data;
  },

  leaveMatch: async (id: string) => {
    const response = await api.post(`/matches/${id}/leave`);
    return response.data;
  },

  getMatchPlayers: async (id: string) => {
    const response = await api.get(`/matches/${id}/players`);
    return response.data;
  },
};
