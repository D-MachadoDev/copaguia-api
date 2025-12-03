import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
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
      },
    ],

    ownerResponse: {
      comment: String,
      respondedAt: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    helpful: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Índices - un usuario solo una reseña por negocio
reviewSchema.index({ business: 1, user: 1 }, { unique: true });
reviewSchema.index({ business: 1, rating: -1 });

// Calcular rating promedio del negocio
reviewSchema.statics.calcAverageRating = async function (businessId) {
  const stats = await this.aggregate([
    { $match: { business: businessId, isActive: true } },
    {
      $group: {
        _id: '$business',
        count: { $sum: 1 },
        average: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      'rating.average': Math.round(stats[0].average * 10) / 10,
      'rating.count': stats[0].count,
    });
  } else {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      'rating.average': 0,
      'rating.count': 0,
    });
  }
};

// Actualizar rating al guardar/actualizar/eliminar reseña
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.business);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRating(doc.business);
  }
});

export default mongoose.model('Review', reviewSchema);