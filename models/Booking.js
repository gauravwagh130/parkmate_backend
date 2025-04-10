import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  vehicle: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  cost: { type: Number, required: true },
  selectedSlot: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;
