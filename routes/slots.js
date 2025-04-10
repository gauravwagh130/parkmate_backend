import express from 'express';
import Slot from '../models/Slot.js';

const router = express.Router();

// Fetch all booked slots
router.get('/booked', async (req, res) => {
  try {
    const bookedSlots = await Slot.find({ isBooked: true });
    res.json({ bookedSlots: bookedSlots.map((slot) => slot.slotId) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch booked slots' });
  }
});

export default router;
