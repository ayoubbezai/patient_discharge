import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stadiumsService } from '../services/stadiumsService';
import { StadiumsResponse } from '@/lib/types';

export const useStadiums = (page: number = 1) => {
  return useQuery<StadiumsResponse>({
    queryKey: ['stadiums', page],
    queryFn: () => stadiumsService.getAllStadiums(page),
  });
};

export const useStadiumById = (id: string) => {
  return useQuery({
    queryKey: ['stadium', id],
    queryFn: () => stadiumsService.getStadiumById(id),
    enabled: !!id,
  });
};

export const useCreateStadium = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => stadiumsService.createStadium(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};

export const useUpdateStadium = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      stadiumsService.updateStadium(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};

export const useDeleteStadium = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => stadiumsService.deleteStadium(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};
