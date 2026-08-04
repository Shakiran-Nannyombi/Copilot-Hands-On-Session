import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitFeedback,
  getEventFeedback,
  updateFeedback,
} from '../controllers/feedback.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/events/:eventId',
  authenticate,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString(),
  ],
  validate,
  submitFeedback
);

router.get(
  '/events/:eventId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  getEventFeedback
);

router.put(
  '/:id',
  authenticate,
  [body('rating').optional().isInt({ min: 1, max: 5 })],
  validate,
  updateFeedback
);

export default router;
