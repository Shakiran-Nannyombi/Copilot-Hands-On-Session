import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { createError } from '../middleware/errorHandler';
import { Role } from '@prisma/client';

export const submitFeedback = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { rating, comment, isAnonymous } = req.body;
    const userId = req.user!.id;

    // Verify user attended the event
    const attendance = await prisma.attendance.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (!attendance || attendance.status !== 'CHECKED_IN') {
      return next(createError('You must attend the event to submit feedback', 403));
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return next(createError('Event not found', 404));
    }

    if (event.status !== 'COMPLETED') {
      return next(createError('Feedback can only be submitted after the event ends', 400));
    }

    const existing = await prisma.feedback.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      return next(createError('You have already submitted feedback for this event', 409));
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        eventId,
        rating,
        comment,
        isAnonymous: isAnonymous || false,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventFeedback = async (
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

    const feedbacks = await prisma.feedback.findMany({
      where: { eventId },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Mask user info for anonymous feedback
    const sanitized = feedbacks.map((f) => ({
      ...f,
      user: f.isAnonymous ? null : f.user,
    }));

    const stats = await prisma.feedback.aggregate({
      where: { eventId },
      _avg: { rating: true },
      _count: true,
      _min: { rating: true },
      _max: { rating: true },
    });

    res.json({
      success: true,
      data: {
        feedbacks: sanitized,
        stats: {
          averageRating: stats._avg.rating,
          totalResponses: stats._count,
          minRating: stats._min.rating,
          maxRating: stats._max.rating,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user!.id;

    const feedback = await prisma.feedback.findUnique({ where: { id } });
    if (!feedback) {
      return next(createError('Feedback not found', 404));
    }

    if (feedback.userId !== userId) {
      return next(createError('Not authorized to update this feedback', 403));
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: { rating, comment },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
