import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.String, ref: "User", required: true },
  location: { type: String, required: true },
  parkingArea: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  cost: { type: Number, required: true },
  slot: { type: String, required: false },
  paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
