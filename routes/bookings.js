import express from 'express';
import Booking from '../models/Booking.js';
import Order from '../models/order.js';

const router = express.Router();

// Example function to get the next available slot
async function getNextAvailableSlot(location, parkingArea) {
    const latestBooking = await Order.find({ location, parkingArea }).sort({ createdAt: -1 }).limit(1);

    if (!latestBooking || latestBooking.length === 0) {
        return 'slot1'; // If no bookings yet, assign the first slot
    }

    const lastSlot = latestBooking[0].selectedSlot; // Example: 'slot3'
    const slotNumber = parseInt(lastSlot.replace('slot', ''));
    return `slot${slotNumber + 1}`;
}

// ✅ Create a new booking (with automatic slot assignment)
router.post('/book', async (req, res) => {
    const { userId, location, parkingArea, vehicleType, date, time, cost } = req.body;

    try {
        const nextSlot = await getNextAvailableSlot(location, parkingArea);

        const newOrder = new Order({
            userId,
            location,
            parkingArea,
            vehicleType,
            date,
            time,
            cost,
            selectedSlot: nextSlot,
        });

        await newOrder.save();

        res.status(200).json({
            message: 'Booking confirmed',
            order: newOrder,
        });
    } catch (error) {
        console.error('Error processing the booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Get the latest booking for a user
router.get('/latest/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const latestBooking = await Order.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestBooking) {
            return res.status(404).json({ message: 'No booking found for this user' });
        }

        res.status(200).json(latestBooking);
        console.log('Latest booking:', latestBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Get order history for a user
router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Received userId:', userId);
        const bookings = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
