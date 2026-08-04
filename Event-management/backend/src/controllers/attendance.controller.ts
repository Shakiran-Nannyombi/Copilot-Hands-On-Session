import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { createError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '@prisma/client';

export const registerForEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const userId = req.user!.id;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.status !== 'PUBLISHED' && event.status !== 'ONGOING') {
      return next(createError('Event is not open for registration', 400));
    }

    // Check capacity
    if (event.capacity) {
      const count = await prisma.attendance.count({
        where: { eventId, status: { in: ['REGISTERED', 'CHECKED_IN'] } },
      });
      if (count >= event.capacity) {
        return next(createError('Event is at full capacity', 400));
      }
    }

    const existing = await prisma.attendance.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      return next(createError('Already registered for this event', 409));
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        eventId,
        qrCode: uuidv4(),
        status: 'REGISTERED',
      },
      include: {
        event: { select: { title: true, startDate: true, location: true } },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const checkIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { qrCode } = req.body;

    const attendance = await prisma.attendance.findUnique({
      where: { qrCode },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        event: { select: { title: true } },
      },
    });

    if (!attendance) {
      return next(createError('Invalid QR code', 404));
    }

    if (attendance.status === 'CHECKED_IN') {
      return next(createError('Already checked in', 400));
    }

    const updated = await prisma.attendance.update({
      where: { qrCode },
      data: { status: 'CHECKED_IN', checkInTime: new Date() },
      include: {
        user: { select: { firstName: true, lastName: true } },
        event: { select: { title: true } },
      },
    });

    res.json({
      success: true,
      message: 'Check-in successful',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const checkOut = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { qrCode } = req.body;

    const attendance = await prisma.attendance.findUnique({ where: { qrCode } });
    if (!attendance) {
      return next(createError('Invalid QR code', 404));
    }

    if (attendance.status !== 'CHECKED_IN') {
      return next(createError('Attendee is not checked in', 400));
    }

    const updated = await prisma.attendance.update({
      where: { qrCode },
      data: { checkOutTime: new Date() },
    });

    res.json({
      success: true,
      message: 'Check-out recorded',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventAttendance = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { status } = req.query as { status?: string };

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    const where: Record<string, unknown> = { eventId };
    if (status) where.status = status;

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            studentId: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, data: attendances });
  } catch (error) {
    next(error);
  }
};

export const getUserAttendance = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const attendances = await prisma.attendance.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            location: true,
            mode: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: attendances });
  } catch (error) {
    next(error);
  }
};

export const cancelRegistration = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const userId = req.user!.id;

    const attendance = await prisma.attendance.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (!attendance) {
      return next(createError('Registration not found', 404));
    }

    if (attendance.status === 'CHECKED_IN') {
      return next(createError('Cannot cancel after check-in', 400));
    }

    await prisma.attendance.update({
      where: { userId_eventId: { userId, eventId } },
      data: { status: 'CANCELLED' },
    });

    res.json({ success: true, message: 'Registration cancelled' });
  } catch (error) {
    next(error);
  }
};
