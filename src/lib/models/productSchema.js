import mongoose, { Schema, model } from "mongoose";

const historySchema = new Schema({
    source: { type: String, enum: ["Amazon", "Flipkart"], required: true },
    price_INR: { type: Number, default: null },
    price_USD: { type: Number, default: null },
    date: { type: Date, default: Date.now }
});

const productSchema = new Schema({
    name: String,
    product_image: String,
    url: String,
    category: String,
    history: [historySchema]
});

const Product = mongoose.models?.Product || model("Product", productSchema);
export default Product;