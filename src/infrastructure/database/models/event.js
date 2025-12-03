import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
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

    date: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      index: true,
    },

    images: [
      {
        url: String,
        publicId: String,
        isMain: { type: Boolean, default: false },
      },
    ],

    isFree: {
      type: Boolean,
      default: true,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    interested: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Índices
eventSchema.index({ slug: 1 });
eventSchema.index({ business: 1 });
eventSchema.index({ 'date.start': 1 });
eventSchema.index({ isActive: 1, isFeatured: 1 });

// Generar slug con fecha
eventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const dateStr = this.date.start.toISOString().slice(0, 10);
    this.slug = `${this.title}-${dateStr}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.model('Event', eventSchema);