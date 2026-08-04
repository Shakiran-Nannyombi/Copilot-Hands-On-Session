import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { createError } from '../middleware/errorHandler';
import { Role } from '@prisma/client';

export const getEventLogistics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    const logistics = await prisma.logistics.findMany({
      where: { eventId },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, data: logistics });
  } catch (error) {
    next(error);
  }
};

export const addLogisticsItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { item, quantity, notes, assignedTo } = req.body;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    const logistics = await prisma.logistics.create({
      data: { eventId, item, quantity: quantity || 1, notes, assignedTo },
    });

    res.status(201).json({
      success: true,
      message: 'Logistics item added',
      data: logistics,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLogisticsItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { item, quantity, status, notes, assignedTo } = req.body;

    const logisticsItem = await prisma.logistics.findUnique({ where: { id } });
    if (!logisticsItem) {
      return next(createError('Logistics item not found', 404));
    }

    const event = await prisma.event.findUnique({
      where: { id: logisticsItem.eventId },
    });

    if (event?.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    const updated = await prisma.logistics.update({
      where: { id },
      data: { item, quantity, status, notes, assignedTo },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteLogisticsItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const logisticsItem = await prisma.logistics.findUnique({ where: { id } });
    if (!logisticsItem) {
      return next(createError('Logistics item not found', 404));
    }

    const event = await prisma.event.findUnique({
      where: { id: logisticsItem.eventId },
    });

    if (event?.organizerId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      return next(createError('Not authorized', 403));
    }

    await prisma.logistics.delete({ where: { id } });

    res.json({ success: true, message: 'Logistics item deleted' });
  } catch (error) {
    next(error);
  }
};
