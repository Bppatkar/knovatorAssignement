import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    deliveryOptions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Adding an index on the 'name' field for faster search
productSchema.index({ name: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
