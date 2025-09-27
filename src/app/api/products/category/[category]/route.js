// app/api/products/category/[category]/route.js
import Product from "@/lib/models/productSchema";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { category } = await params;
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found in this category" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error fetching category products:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
