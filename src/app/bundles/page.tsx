import FeatureCard from "@/components/ui/feature-card"
import HeroBlock from "@/components/ui/hero"
import {sample} from "../../data"

export default function BundlesPage() {
  return (
    <div className="">
      <HeroBlock
        title="Spiritual Journeys, Perfectly Bundled"
        subtitle="Experience sacred destinations with our all-inclusive pilgrimage bundles. We handle the details, so you can focus on your spiritual path."
        ctaText="Explore Bundles"
        ctaHref="/bundles"
        imgSrc="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1920&q=80"
        imgAlt="Ayodhya sunset"
      />
      <div className="container p-20 ">
      <h1 className="text-center text-4xl font-bold">Curated Bundles</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-10">
        {sample.map((b) => (
          <FeatureCard
            key={b.id}
            title={`${b.city} – ${b.price}`}
            description={b.info}
            img={b.img}
            alt={b.alt}
          />
        ))}
      </div>
      </div>
    </div>
  )
}