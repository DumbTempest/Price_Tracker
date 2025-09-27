"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductCategoryPage({ it, group }) {
  function getPriceStats(history) {
    if (history.length === 0) return null;

    const getPrice = (h) => h.price_Amazon_INR ?? h.price_Flipkart_INR;

    const lastEntry = history[history.length - 1];
    const current = getPrice(lastEntry);

    const prices = history.map(getPrice).filter((p) => p != null);
    if (prices.length === 0)
      return { current, min: null, max: null, avg: null, trend: "stable" };

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

    let trend = "stable";
    if (history.length > 1) {
      const prevEntry = history[history.length - 2];
      const prev = getPrice(prevEntry);
      if (current != null && prev != null) {
        if (current > prev) trend = "up";
        else if (current < prev) trend = "down";
      }
    }

    return { current, min, max, avg, trend };
  }

  function getCategoryStats(products) {
    const allPrices = products
      .flatMap((p) =>
        p.history.flatMap((h) => [h.price_Amazon_INR, h.price_Flipkart_INR])
      )
      .filter((p) => typeof p === "number" && !isNaN(p));

    const latestPrices = products
      .map((p) => {
        if (p.history.length === 0) return null;
        const lastHistory = p.history[p.history.length - 1];
        return lastHistory.price_Amazon_INR ?? lastHistory.price_Flipkart_INR;
      })
      .filter((p) => typeof p === "number" && !isNaN(p));

    if (allPrices.length === 0 || latestPrices.length === 0) return null;

    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices),
      avg: Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length),
      currentMin: Math.min(...latestPrices),
      currentMax: Math.max(...latestPrices),
    };
  }

  const rawDates = Array.from(
    new Set(group.flatMap((g) => g.history.map((h) => h.date)))
  ).sort((a, b) => new Date(a) - new Date(b));

  const labels = rawDates.map((d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  const colors = [
    "#667eea", "#764ba2", "#f093fb", "#f5576c",
    "#4facfe", "#00f2fe", "#43e97b", "#38f9d7",
    "#ffecd2", "#fcb69f", "#a8edea", "#fed6e3",
  ];

  const datasets = group.flatMap((p, i) => {
    const color = colors[i % colors.length];
    const isCurrentProduct = p._id === it._id;

    const productDatasets = [
      {
        label: `${p.name} (Amazon)`,
        data: rawDates.map((date) => {
          const point = p.history.find((h) => h.date === date);
          return point?.price_Amazon_INR ?? null;
        }),
        borderColor: color,
        backgroundColor: color + "80",
        tension: 0.3,
        spanGaps: true,
        hidden: !isCurrentProduct,
      },
      {
        label: `${p.name} (Flipkart)`,
        data: rawDates.map((date) => {
          const point = p.history.find((h) => h.date === date);
          return point?.price_Flipkart_INR ?? null;
        }),
        borderColor: color,
        backgroundColor: color + "80",
        borderDash: [5, 5],
        tension: 0.3,
        spanGaps: true,
        hidden: !isCurrentProduct,
      },
    ];

    return productDatasets.filter(dataset => dataset.data.some(price => price !== null));
  });

  const chartData = { labels, datasets };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "white" } },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  const categoryStats = getCategoryStats(group);

  return (
    <div className="w-full max-w-7xl mx-auto my-2 text-white">
      <header className="mb-2">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white hover:bg-neutral-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 flex flex-wrap items-center gap-3">
          <span className="text-white">{it.name}</span>
          {it.url_Amazon && (
            <Link
              href={it.url_Amazon}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-sm rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
            >
              See on Amazon →
            </Link>
          )}
          {it.url_Flipkart && (
            <Link
              href={it.url_Flipkart}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              See on Flipkart →
            </Link>
          )}
        </h1>
        {categoryStats && (
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/80">
            <div><span className="text-xs uppercase">Lowest Ever</span><div className="font-bold text-lg">₹{categoryStats.min}</div></div>
            <div><span className="text-xs uppercase">Highest Ever</span><div className="font-bold text-lg">₹{categoryStats.max}</div></div>
            <div><span className="text-xs uppercase">Average</span><div className="font-bold text-lg">₹{categoryStats.avg}</div></div>
            <div><span className="text-xs uppercase">Current Range</span><div className="font-bold text-lg">₹{categoryStats.currentMin} - ₹{categoryStats.currentMax}</div></div>
          </div>
        )}
      </header>

      <section className="mb-4">
        <div className="flex overflow-x-auto gap-4 py-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
          {group.map((p) => {
            const stats = getPriceStats(p.history);

            return (
              <button
                key={p._id}
                onClick={() => window.open(`/${p._id}`, "_blank")}
                className="flex-shrink-0 w-80 bg-neutral-900 border border-white/20 rounded-lg p-3 flex flex-row gap-4 items-center hover:border-white/40 transition text-left"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-white rounded-md p-1">
                  <img
                    src={p.product_image}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="block text-xs font-medium mb-2 line-clamp-2">
                    {p.name}
                  </div>
                  {stats && (
                    <div>
                      <div className="flex items-baseline gap-2">
                        {stats.current !== null ? (
                          <span className="text-base font-bold">
                            ₹{stats.current}
                          </span>
                        ) : (
                          <span className="text-base font-bold text-gray-400">
                            N/A
                          </span>
                        )}
                        <span
                          className={`font-bold ${stats.trend === "up"
                            ? "text-red-400"
                            : stats.trend === "down"
                              ? "text-green-400"
                              : "text-gray-400"
                            }`}
                        >
                          {stats.trend === "up" && "↑"}
                          {stats.trend === "down" && "↓"}
                          {stats.trend === "stable" && "→"}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/60">
                        {stats.min && `(min ₹${stats.min}, max ₹${stats.max})`}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="h-[500px] w-full bg-neutral-900 border border-white/20 rounded-xl p-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>
    </div>
  );
}