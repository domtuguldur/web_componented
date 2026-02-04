const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showtime: {
      date: { type: Date, required: true },
      time: { type: String, required: true }
    },
    seats: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    bookingStatus: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    bookingReference: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);