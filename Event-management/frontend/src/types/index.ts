export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'ORGANIZER' | 'ADMIN';
  studentId?: string;
  profileImage?: string;
}

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
export type EventMode = 'ONLINE' | 'OFFLINE' | 'HYBRID';
export type AttendanceStatus = 'REGISTERED' | 'CHECKED_IN' | 'ABSENT' | 'CANCELLED';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  onlineLink?: string;
  mode: EventMode;
  status: EventStatus;
  capacity?: number;
  coverImage?: string;
  tags: string[];
  organizerId: string;
  organizer?: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  schedules?: Schedule[];
  createdAt: string;
  updatedAt: string;
  _count?: { attendances: number; feedbacks: number };
}

export interface Attendance {
  id: string;
  userId: string;
  eventId: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  qrCode?: string;
  user?: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> & { studentId?: string };
  event?: Pick<Event, 'id' | 'title' | 'startDate' | 'endDate' | 'location' | 'mode' | 'status'>;
}

export interface Feedback {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment?: string;
  isAnonymous: boolean;
  createdAt: string;
  user?: Pick<User, 'firstName' | 'lastName' | 'email'> | null;
}

export interface LogisticsItem {
  id: string;
  eventId: string;
  item: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'delivered';
  notes?: string;
  assignedTo?: string;
}

export interface Schedule {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  speaker?: string;
  location?: string;
}

export interface Notification {
  id: string;
  userId: string;
  eventId?: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationMeta;
}
