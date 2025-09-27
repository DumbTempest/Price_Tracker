import mongoose, { Schema, model } from "mongoose";

const historySchema = new Schema({
    price_Amazon_INR: { type: Number, default: null },
    price_Flipkart_INR: { type: Number, default: null },
    price_Amazon_USD: { type: Number, default: null },
    price_Flipkart_USD: { type: Number, default: null },
    date: { type: Date, default: Date.now }
});

const productSchema = new Schema({
    name: String,
    product_image: String,
    url_Amazon: String,
    url_Flipkart: String,
    category: String,
    history: [historySchema]
});

const Product = mongoose.models?.Product || model("Product", productSchema);
export default Product;