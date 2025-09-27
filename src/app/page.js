'use client'

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/components/custom/Header"
import ProductPreviewCard from "@/components/custom/productReviewCard"

export default function PriceTracker() {
  const [Data, setData] = useState([])
  const rowRefs = useRef({})

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/getData')
      const json = await res.json()
      setData(json.data)
    }
    getData()
  }, [])

  function groupByCategory(items) {
    return items.reduce((acc, it) => {
      acc[it.category] = acc[it.category] || []
      acc[it.category].push(it)
      return acc
    }, {})
  }

  const groupedData = groupByCategory(Data)

  const scrollRow = (category, direction) => {
    const el = rowRefs.current[category]
    if (el) {
      el.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased p-6 lg:p-12">
      <main className="max-w-7xl mx-auto">
        <Header products={Data} />

        <div className="mt-8 space-y-12">
          {Object.entries(groupedData).map(([category, products]) => (
            <div key={category} className="relative">

              <h2 className="text-xl font-bold mb-4">{category}</h2>

             {products.length > 5 && (
               <>
                 <button
                   onClick={() => scrollRow(category, "left")}
                   className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full hover:bg-black transition"
                 >
                   <ChevronLeft className="w-6 h-6 text-white" />
                 </button>

                 <button
                   onClick={() => scrollRow(category, "right")}
                   className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full hover:bg-black transition"
                 >
                   <ChevronRight className="w-6 h-6 text-white" />
                 </button>
               </>
             )}
             
              <div
                ref={(el) => (rowRefs.current[category] = el)}
                className="flex space-x-6 overflow-x-auto scrollbar-custom pb-4 scroll-smooth"
              >
                {products.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-56">
                    <ProductPreviewCard product={product} />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        <footer className="mt-10 text-xs text-white/60 text-center">
          Made with ❤️ — By Omnissiah
        </footer>
      </main>
    </div>
  )
}
