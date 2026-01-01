import api from '@/lib/api';

export const bookingsService = {
  getAllBookings: async (params?: any) => {
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  createBooking: async (data: any) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  cancelBooking: async (id: string, reason: string) => {
    const response = await api.post(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  processPayment: async (id: string, paymentData: any) => {
    const response = await api.post(`/bookings/${id}/payment`, paymentData);
    return response.data;
  },
};
