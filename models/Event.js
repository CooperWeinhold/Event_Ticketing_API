import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: String,
    category: String,
    venue: String,
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: String,
    seatCapacity: {
      type: Number,
      required: true,
      min: [1, 'seatCapacity must be at least 1'],
    },
    bookedSeats: {
      type: Number,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
