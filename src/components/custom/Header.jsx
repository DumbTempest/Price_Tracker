export default function Header({ products }) {
    const lastUpdated = getLastUpdated(products);
    const categories = [...new Set(products.map(p => p.category))];
    const totalPoints = products.reduce((sum, p) => sum + p.history.length, 0);
    const priceDrops = products.filter(p => {
        const prices = p.history.map(h => h.price_INR);
        if (prices.length < 2) return false;
        return prices[prices.length - 1] < prices[prices.length - 2];
    }).length;

    function getLastUpdated(products) {
        if (!products || products.length === 0) return null;
        const timestamps = products
            .flatMap(p => p.history.map(h => new Date(h.date).getTime()))
            .filter(Boolean);
        if (timestamps.length === 0) return null;
        return new Date(Math.max(...timestamps)).toLocaleString();
    }

    return (
        <div className="mb-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-2">
                    <i className="fas fa-chart-line"></i> Price Tracker Dashboard
                </h1>
                {lastUpdated && (
                    <div className="text-sm text-white/50 mt-1 flex items-center justify-center gap-1">
                        <i className="fas fa-clock"></i> Last updated: {lastUpdated}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">{categories.length}</div>
                    <div className="text-xs text-white/60">Categories</div>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">{products.length}</div>
                    <div className="text-xs text-white/60">Products Tracked</div>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">{totalPoints}</div>
                    <div className="text-xs text-white/60">Price Points</div>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">{priceDrops}</div>
                    <div className="text-xs text-white/60">Price Drops</div>
                </div>
            </div>
        </div>
    );
}