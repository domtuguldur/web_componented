const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 10 }, 
    year: { type: Number },               
    score: { type: Number, min: 0, max: 100 }, 
    price: { type: Number, min: 0 },        
    duration: { type: String, default: "" },  
    genre: { type: String, default: "" },     
    image: { type: String, default: "" }, 
  },{
    timestamps: true,
  }
);
module.exports = mongoose.model('Movie', movieSchema);
