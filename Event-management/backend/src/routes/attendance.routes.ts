import { Router } from 'express';
import { body } from 'express-validator';
import {
  registerForEvent,
  checkIn,
  checkOut,
  getEventAttendance,
  getUserAttendance,
  cancelRegistration,
} from '../controllers/attendance.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/events/:eventId/register', authenticate, registerForEvent);
router.delete('/events/:eventId/cancel', authenticate, cancelRegistration);
router.get('/events/:eventId', authenticate, authorize('ORGANIZER', 'ADMIN'), getEventAttendance);
router.get('/my', authenticate, getUserAttendance);

router.post(
  '/check-in',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  [body('qrCode').notEmpty().withMessage('QR code is required')],
  validate,
  checkIn
);

router.post(
  '/check-out',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  [body('qrCode').notEmpty().withMessage('QR code is required')],
  validate,
  checkOut
);

export default router;
