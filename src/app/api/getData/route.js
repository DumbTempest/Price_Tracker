import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/productSchema";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({});
        return NextResponse.json({ data: products }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
