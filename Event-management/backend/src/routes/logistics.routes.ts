import { Router } from 'express';
import {
  getEventLogistics,
  addLogisticsItem,
  updateLogisticsItem,
  deleteLogisticsItem,
} from '../controllers/logistics.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/events/:eventId', authenticate, authorize('ORGANIZER', 'ADMIN'), getEventLogistics);
router.post('/events/:eventId', authenticate, authorize('ORGANIZER', 'ADMIN'), addLogisticsItem);
router.put('/:id', authenticate, authorize('ORGANIZER', 'ADMIN'), updateLogisticsItem);
router.delete('/:id', authenticate, authorize('ORGANIZER', 'ADMIN'), deleteLogisticsItem);

export default router;
