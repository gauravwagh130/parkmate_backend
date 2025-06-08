import Order from "../models/Order.js";  // ✅ Use ES Module import

export const saveBooking = async (req, res) => {
  try {
    console.log("🔹 Received Booking Data:", req.body); // ✅ Debugging log

    const { userId, location, parkingArea, vehicleType, vehicleNumber, date, time, cost, slot } = req.body;

    // Validate required fields
    if (!userId || !location || !parkingArea || !vehicleType || !vehicleNumber || !date || !time || !cost) {
      console.error("❌ Missing Required Fields:", req.body);
      return res.status(400).json({ success: false, message: "All fields are required" }); // <-- Fixed typo here
    }

    // Validate slot (optional, but you can add this check if needed)
    if (!slot) {
      console.warn("⚠️ Slot not provided. Proceeding without slot assignment.");
    }

    // Create a new order with the slot included
    const newOrder = new Order({ 
      userId, 
      location, 
      parkingArea, 
      vehicleType, 
      vehicleNumber,
      date, 
      time, 
      cost, 
      slot, // Include the slot in the order
      paymentStatus: "Completed" 
    });

    await newOrder.save();
    console.log("✅ Booking Saved Successfully:", newOrder);

    res.status(201).json({ success: true, message: "Booking saved successfully", order: newOrder });

  } catch (error) {
    console.error("🔥 Error Saving Booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
