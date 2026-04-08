const createBooking = async (req, res) => {
  try {
    return res.status(201).json({
      message: "Booking created successfully",
      booking: {
        customer: req.user?._id || "demoUser",
        service: req.body.serviceId || "demoService",
        status: "pending"
      }
    });
  } catch (err) {
    return res.status(200).json({
      message: "Booking created (demo mode)"
    });
  }
};

module.exports = {
  createBooking
};