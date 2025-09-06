import FeatureCard from "@/components/ui/feature-card"

const sample = [
  {
    id: 1,
    city: "Ayodhya",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=640&q=60",
    alt: "Ram Mandir",
    price: "₹4 999",
  },
  {
    id: 2,
    city: "Varanasi",
    img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=640&q=60",
    alt: "Ganga Aarti",
    price: "₹5 499",
  },
  {
    id: 3,
    city: "Kedarnath",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=640&q=60",
    alt: "Kedarnath temple",
    price: "₹9 999",
  },
]

export default function BundlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-center text-4xl font-bold">Curated Bundles</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sample.map((b) => (
          <FeatureCard
            key={b.id}
            title={`${b.city} – ${b.price}`}
            description="2 nights stay + airport pickup + certified guide"
            img={b.img}
            alt={b.alt}
          />
        ))}
      </div>
    </div>
  )
}