import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

/* Public GET routes */
router.get('/', getEvents);
router.get('/:id', getEvent);

/* Admin-only mutations */
router.post('/', protect, adminOnly, createEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;
