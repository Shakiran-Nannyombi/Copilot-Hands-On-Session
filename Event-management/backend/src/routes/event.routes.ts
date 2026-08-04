import { Router } from 'express';
import { body } from 'express-validator';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  getEventStats,
} from '../controllers/event.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post(
  '/',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('mode').optional().isIn(['ONLINE', 'OFFLINE', 'HYBRID']),
  ],
  validate,
  createEvent
);

router.put('/:id', authenticate, authorize('ORGANIZER', 'ADMIN'), updateEvent);
router.delete('/:id', authenticate, authorize('ORGANIZER', 'ADMIN'), deleteEvent);
router.patch('/:id/publish', authenticate, authorize('ORGANIZER', 'ADMIN'), publishEvent);
router.get('/:id/stats', authenticate, authorize('ORGANIZER', 'ADMIN'), getEventStats);

export default router;
