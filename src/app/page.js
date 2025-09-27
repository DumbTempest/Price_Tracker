'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PriceCard from "@/components/custom/PriceCard"
import Header from "@/components/custom/Header"
import ProductPreviewCard from "@/components/custom/productReviewCard"

export default function PriceTracker() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [Data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/getData')
      const json = await res.json()
      setData(json.data)
    }
    getData()
  }, [])

  function groupByCategory(items) {
    return Object.values(
      items.reduce((acc, it) => {
        acc[it.category] = acc[it.category] || [];
        acc[it.category].push(it);
        return acc;
      }, {})
    );
  }

  async function handleAdd(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 2000))
      setQuery("")
    } catch (err) {
      setError(String(err || "Failed to fetch product"))
    } finally {
      setLoading(false)
    }
  }

  function handleRemove(id) {
    setItems((s) => s.filter((it) => it.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased p-6 lg:p-12">
      <main className="max-w-7xl mx-auto">
        <Header products={Data} />

        {/* <div className="flex justify-center w-full">
          <form
            onSubmit={handleAdd}
            className="flex gap-3 items-center w-full max-w-4xl p-3 border border-white/10 rounded-2xl bg-neutral-900 shadow-sm"
          >
            <Input
              className="flex-1 bg-black text-white border-white/20 placeholder:text-white/60"
              placeholder="Paste Amazon product URL or ASIN (e.g. https://www.amazon.in/dp/B08...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="shrink-0 bg-white text-black hover:bg-gray-200"
            >
              {loading ? "Working..." : "Track"}
            </Button>
          </form>
        </div> */}


        <section className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Data.map((product) => (
            <ProductPreviewCard key={product._id} product={product} />
          ))}
        </section>

        <footer className="mt-10 text-xs text-white/60 text-center">
          Made with ❤️ — By Ramesh
        </footer>
      </main>

    </div>
  )
}
