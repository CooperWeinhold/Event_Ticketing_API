import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

/*  @desc    Book tickets for an event
    @route   POST /api/bookings
    @access  User (protected)
*/
export const createBooking = async (req, res, next) => {
  const { eventId, quantity } = req.body;

  if (!eventId || !quantity || quantity < 1) {
    return res.status(400).json({ error: 'eventId and positive quantity required' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Find the event and lock it for update
    const event = await Event.findById(eventId).session(session);
    if (!event) throw new Error('Event not found');

    const available = event.seatCapacity - event.bookedSeats;
    if (quantity > available) {
      throw new Error(`Only ${available} seats left`);
    }

    // 2. Create the booking document
    const booking = await Booking.create(
      [{
        user: req.user._id,
        event: event._id,
        quantity,
      }],
      { session }
    );

    // 3. Increment bookedSeats atomically
    event.bookedSeats += quantity;
    await event.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(booking[0]);     // Booking.create returns an array when session used
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

/*  @desc    Get all bookings for logged-in user
    @route   GET /api/bookings
    @access  User (protected)
*/
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date venue price');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

/*  @desc    Get single booking (must belong to user)
    @route   GET /api/bookings/:id
    @access  User (protected)
*/
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('event', 'title date venue price');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};
