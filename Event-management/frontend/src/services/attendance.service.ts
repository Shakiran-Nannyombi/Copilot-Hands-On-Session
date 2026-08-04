import api from './api';
import { ApiResponse, Attendance } from '../types';

export const attendanceService = {
  registerForEvent: async (eventId: string) => {
    const res = await api.post<ApiResponse<Attendance>>(`/attendance/events/${eventId}/register`);
    return res.data.data;
  },

  cancelRegistration: async (eventId: string) => {
    const res = await api.delete(`/attendance/events/${eventId}/cancel`);
    return res.data;
  },

  getEventAttendance: async (eventId: string, status?: string) => {
    const res = await api.get<ApiResponse<Attendance[]>>(`/attendance/events/${eventId}`, {
      params: { status },
    });
    return res.data.data;
  },

  getUserAttendance: async () => {
    const res = await api.get<ApiResponse<Attendance[]>>('/attendance/my');
    return res.data.data;
  },

  checkIn: async (qrCode: string) => {
    const res = await api.post<ApiResponse<Attendance>>('/attendance/check-in', { qrCode });
    return res.data.data;
  },

  checkOut: async (qrCode: string) => {
    const res = await api.post<ApiResponse<Attendance>>('/attendance/check-out', { qrCode });
    return res.data.data;
  },
};
