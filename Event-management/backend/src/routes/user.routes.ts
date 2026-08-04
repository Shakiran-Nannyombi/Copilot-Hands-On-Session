import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfile,
  updateUserRole,
  deactivateUser,
  resetUserPassword,
} from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('ADMIN'), getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/profile', authenticate, updateProfile);
router.patch('/:id/role', authenticate, authorize('ADMIN'), updateUserRole);
router.patch('/:id/deactivate', authenticate, authorize('ADMIN'), deactivateUser);
router.patch('/:id/reset-password', authenticate, authorize('ADMIN'), resetUserPassword);

export default router;
