import PriceCard from "@/components/custom/PriceCard";
import Header from "@/components/custom/Header";

async function getProductAndGroup(id) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch product");
    const it = await res.json();

    const resGroup = await fetch(`${baseUrl}/api/products/category/${it.category}`, {
        cache: "no-store",
    });
    if (!resGroup.ok) throw new Error("Failed to fetch category group");
    const group = await resGroup.json();

    return { it, group };
}

export default async function Page({ params }) {
    const { id } = await params;
    const { it, group } = await getProductAndGroup(id);

    return (
        <div className="min-h-screen bg-black text-white antialiased p-6 lg:p-12">
            <PriceCard it={it} group={group} />
        </div>
    );
}
