"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceCard({ it, handleRemove }) {
  // Random chart data (last 7 days)
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: labels.map(
          () => it.price + Math.floor(Math.random() * 400 - 200)
        ),
        borderColor: "rgb(168, 85, 247)", // purple-500
        backgroundColor: "rgba(168, 85, 247, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <Card className="bg-neutral-900 border border-white/20 shadow-xl w-full max-w-7xl mx-auto my-6">
      <CardHeader className="p-6 border-b border-white/10">
        <CardTitle className="text-2xl md:text-3xl text-white font-extrabold mb-2">
          {it.title}
        </CardTitle>
        <div className="flex flex-wrap gap-4 text-sm text-white/80">
          <div>
            <div className="text-xs uppercase">Current Range</div>
            <div className="font-bold text-white">
              ₹{it.price} - ₹{it.price + 500}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase">Lowest Ever</div>
            <div className="font-bold text-white">₹{it.price - 200}</div>
          </div>
          <div>
            <div className="text-xs uppercase">Highest Ever</div>
            <div className="font-bold text-white">₹{it.price + 500}</div>
          </div>
          <div>
            <div className="text-xs uppercase">Average</div>
            <div className="font-bold text-white">₹{it.price + 100}</div>
          </div>
        </div>
      </CardHeader>

      <div className="flex flex-col md:flex-row">
        <CardContent className="flex-1 flex flex-col justify-between p-6 space-y-4 text-white">
          <div className="text-sm text-white/70">{it.id}</div>
          <a
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="block mt-1 font-medium hover:underline text-white text-lg"
          >
            {it.title}
          </a>
          <div className="mt-2 text-sm text-white/60">
            Last checked: {new Date(it.lastChecked).toLocaleString()}
          </div>

          <CardFooter className="p-0 mt-4 flex flex-col items-start gap-3">
            <div className="text-3xl font-extrabold text-white">
              ₹ {it.price}
            </div>
            <Button
              onClick={() => handleRemove(it.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
              aria-label={`Remove ${it.title}`}
            >
              Remove
            </Button>
          </CardFooter>
        </CardContent>

        <div className="md:w-2/3 w-full border-t md:border-t-0 md:border-l border-white/10 p-4">
          <Line data={data} options={options} />
        </div>
      </div>
    </Card>
  );
}
