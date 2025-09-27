import Product from "@/lib/models/productSchema";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
