import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { createError } from '../middleware/errorHandler';
import { EventStatus, EventMode, Role } from '@prisma/client';

export const getEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      mode,
      search,
      tag,
    } = req.query as Record<string, string>;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};
    if (status) where.status = status as EventStatus;
    if (mode) where.mode = mode as EventMode;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (tag) where.tags = { has: tag };

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { startDate: 'asc' },
        include: {
          organizer: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          _count: { select: { attendances: true, feedbacks: true } },
        },
      }),
      prisma.event.count({ where }),
    ]);

    res.json({
      success: true,
      data: events,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        schedules: { orderBy: { startTime: 'asc' } },
        logistics: true,
        _count: { select: { attendances: true, feedbacks: true } },
      },
    });

    if (!event) {
      return next(createError('Event not found', 404));
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      onlineLink,
      mode,
      capacity,
      tags,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        onlineLink,
        mode: mode || 'OFFLINE',
        capacity,
        tags: tags || [],
        organizerId: req.user!.id,
      },
      include: {
        organizer: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized to update this event', 403));
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...req.body,
        startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      },
    });

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized to delete this event', 403));
    }

    await prisma.event.delete({ where: { id } });

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const publishEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    const updated = await prisma.event.update({
      where: { id },
      data: { status: 'PUBLISHED' },
    });

    res.json({
      success: true,
      message: 'Event published successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    const [attendanceStats, feedbackStats] = await Promise.all([
      prisma.attendance.groupBy({
        by: ['status'],
        where: { eventId: id },
        _count: true,
      }),
      prisma.feedback.aggregate({
        where: { eventId: id },
        _avg: { rating: true },
        _count: true,
      }),
    ]);

    res.json({
      success: true,
      data: {
        attendance: attendanceStats,
        feedback: {
          averageRating: feedbackStats._avg.rating,
          totalResponses: feedbackStats._count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
