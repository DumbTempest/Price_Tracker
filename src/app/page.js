'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card
} from "@/components/ui/card"

import PriceCard from "@/components/custom/card"

export default function PriceTracker() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const sampleItems = [
    {
      id: "B08EXAMPLE",
      title: "Sample Product — Wireless Headphones",
      url: "https://www.amazon.in/dp/B08EXAMPLE",
      price: 2999,
      lastChecked: new Date().toISOString(),
    },
    {
      id: "B07EXAMPLE",
      title: "Sample Product — Mechanical Keyboard",
      url: "https://www.amazon.in/dp/B07EXAMPLE",
      price: 4499,
      lastChecked: new Date().toISOString(),
    },
  ]

  const [items, setItems] = useState(() => sampleItems)

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
        <header className="mb-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Price Tracker
          </h1>
        </header>

       <div className="flex justify-center w-full">
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
</div>


        <section className="mt-8 space-y-6">
          {items.map((it) => (
            <PriceCard key={it.id} it={it} handleRemove={handleRemove} />
          ))}

          {items.length === 0 && (
            <Card className="p-6 text-center bg-neutral-900 border border-white/10">
              <div className="opacity-80 text-sm">
                No items — add one to start tracking
              </div>
            </Card>
          )}
        </section>

        <footer className="mt-10 text-xs text-white/60 text-center">
          Made with ❤️ — By Ramesh
        </footer>
      </main>

    </div>
  )
}
