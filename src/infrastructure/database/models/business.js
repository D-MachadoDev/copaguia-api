import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, default: 'Arequipa' },
      state: { type: String, default: 'Arequipa' },
      country: { type: String, default: 'Perú' },
      zipCode: String,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },

    phone: String,
    email: String,
    website: String,

    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },

    hours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },

    images: [
      {
        url: String,
        publicId: String,
        isMain: { type: Boolean, default: false },
      },
    ],

    logo: {
      url: String,
      publicId: String,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices
businessSchema.index({ slug: 1 });
businessSchema.index({ category: 1, isActive: 1 });
businessSchema.index({ owner: 1 });
businessSchema.index({ location: '2dsphere' });
businessSchema.index({ 'rating.average': -1 });
businessSchema.index({ isActive: 1, isVerified: 1 });

// Generar slug
businessSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  next();
});

// Relaciones virtuales
businessSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'business',
});

businessSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'business',
});

export default mongoose.model('Business', businessSchema);