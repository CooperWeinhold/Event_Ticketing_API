import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);           // all routes below are authenticated

router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBooking);

export default router;
