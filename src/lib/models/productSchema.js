import mongoose, { Schema, model } from "mongoose";

const historySchema = new Schema({
    price_INR: Number,
    price_USD: Number,
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