import api from './api';
import { ApiResponse, Event, PaginationMeta } from '../types';

interface EventFilters {
  page?: number;
  limit?: number;
  status?: string;
  mode?: string;
  search?: string;
  tag?: string;
}

interface CreateEventData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  onlineLink?: string;
  mode: string;
  capacity?: number;
  tags?: string[];
}

export const eventService = {
  getEvents: async (filters?: EventFilters) => {
    const res = await api.get<ApiResponse<Event[]> & { pagination: PaginationMeta }>('/events', {
      params: filters,
    });
    return res.data;
  },

  getEventById: async (id: string) => {
    const res = await api.get<ApiResponse<Event>>(`/events/${id}`);
    return res.data.data;
  },

  createEvent: async (data: CreateEventData) => {
    const res = await api.post<ApiResponse<Event>>('/events', data);
    return res.data.data;
  },

  updateEvent: async (id: string, data: Partial<CreateEventData>) => {
    const res = await api.put<ApiResponse<Event>>(`/events/${id}`, data);
    return res.data.data;
  },

  deleteEvent: async (id: string) => {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },

  publishEvent: async (id: string) => {
    const res = await api.patch<ApiResponse<Event>>(`/events/${id}/publish`);
    return res.data.data;
  },

  getEventStats: async (id: string) => {
    const res = await api.get(`/events/${id}/stats`);
    return res.data.data;
  },
};
