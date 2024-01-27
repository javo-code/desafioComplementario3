import { Schema, model } from "mongoose";

export const cartCollectionName = "carts";

export const cartSchema = new Schema({
    carts: [
      {
        _id: false,
        quantity: {
          type: Number,
          default: 1 
        },
        cart: {
          type: Schema.Types.ObjectId,
          ref: "carts" // Referencia al modelo de cartos
        }
      }
    ]
  });

export const CartModel = model(cartCollectionName, cartSchema);
