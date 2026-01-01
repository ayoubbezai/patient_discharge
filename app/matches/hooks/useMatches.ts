import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchesService } from '../services/matchesService';

export const useMatches = (params?: any) => {
  return useQuery({
    queryKey: ['matches', params],
    queryFn: () => matchesService.getAllMatches(params),
  });
};

export const useMatchById = (id: string) => {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => matchesService.getMatchById(id),
    enabled: !!id,
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => matchesService.createMatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};

export const useJoinMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => matchesService.joinMatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};

export const useLeaveMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => matchesService.leaveMatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};
