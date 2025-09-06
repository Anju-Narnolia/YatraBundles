import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Hotel', 'Driver', 'Guide', 'Resort', 'Dharamshala', 'Sedan', 'SUV', 'Auto-rickshaw']
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
