"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeatureCard from "@/components/ui/feature-card";
import HeroBlock from "@/components/ui/hero";

interface Bundle {
  _id: string;
  city: string;
  image: string;
  info: string;
  alt: string;
  price: number;
  currency: string;
  available: boolean;
}

export default function BundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch("/api/bundles"); 
        if (!res.ok) throw new Error("Failed to fetch bundles");
        const data = await res.json();
        console.log("API response:", data);
        setBundles(Array.isArray(data) ? data : data.bundles || []);
      } catch (err) {
        console.error("Error fetching bundles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  return (
    <div>
      <HeroBlock
        title="Spiritual Journeys, Perfectly Bundled"
        subtitle="Experience sacred destinations with our all-inclusive pilgrimage bundles."
        ctaText="Explore Bundles"
        ctaHref="/bundles"
        imgSrc="/Ayodhya.jpg"
        imgAlt="Ayodhya sunset"
      />

      <div className="container p-20">
        <h1 className="text-center text-4xl font-bold">Curated Bundles</h1>

        {loading ? (
          <p className="text-center mt-10">Loading bundles...</p>
        ) : bundles.length === 0 ? (
          <p className="text-center mt-10">No bundles available.</p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-10">
            {bundles.map((b) => (
              <Link
                key={b._id}
                href={b.available ? `/bookservice/${b._id}` : "#"}
              >
                <FeatureCard
                  title={`${b.city} – ₹${b.price.toLocaleString()}`}
                  description={b.info}
                  img={b.image} 
                  alt={b.alt}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
