import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },

          quantity: {
            type: Number,
            default: 1,
            min: 1,
            max: 100
          },

          priceAtPurchase: {
            type: Number,
            required: true,
            min: 0
          }
        }
      ],

      required: true,

      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Заказ должен содержать хотя бы один товар"
      }
    },

    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    shippingAddress: {
      city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },

      street: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },

      zip: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
      }
    },

    paidAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;