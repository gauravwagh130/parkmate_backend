import mongoose from 'mongoose';

const slotBookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  slotId: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, required: true }
});

const SlotBooking = mongoose.model('SlotBooking', slotBookingSchema);
export default SlotBooking;
