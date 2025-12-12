"use client"

import Link from "next/link"

export default function ProductPreviewCard({ product }) {
  let latest = null
  if (product.history?.length) {
    const lastEntry = product.history[product.history.length - 1]
    latest = lastEntry.price_Amazon_INR ?? lastEntry.price_Flipkart_INR ?? null
  }

  return (
    <Link
      href={`/${product._id}`}
      className="block bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:border-white/30 transition"
    >
      <div className="p-4 flex flex-col items-center text-center">
        <img
          src={product.product_image}
          alt={product.name}
          className="h-28 w-auto object-contain mb-3"
        />
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
          {product.name}
        </h3>
        {latest !== null ? (
          <p className="text-green-400 font-bold text-base">
            ₹{latest.toLocaleString()}
          </p>
        ) : (
          <p className="text-red-400 font-bold text-base">
            Not Available
          </p>
        )}
      </div>
    </Link>
  )
}