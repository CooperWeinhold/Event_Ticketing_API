import Event from '../models/Event.js';

/* @desc   Get all events (with ?category=&date= filters) */
export const getEvents = async (req, res, next) => {
  try {
    const { category, date } = req.query;
    const query = {};

    if (category) query.category = category;
    if (date) {
      // match only the same calendar day
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

/* @desc   Get single event by ID */
export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

/* @desc   Admin create event */
export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

/* @desc   Admin update event */
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

/* @desc   Admin delete event */
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // TODO later: prevent deletion if bookings exist
    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (err) {
    next(err);
  }
};
