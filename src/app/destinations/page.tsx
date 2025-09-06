"use client"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { destinations } from "@/data"
import Link from "next/link"
const categories = ["All", "Temples", "Ghats", "Lakes", "Beaches", "Mountains", "Monuments"] as const
type Category = typeof categories[number]



export default function Destinations() {
  const [active, setActive] = useState<Category>("All")
  const filtered =
    active === "All" ? destinations : destinations.filter((d) => d.category === active)

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      {/* Page title */}
      <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Explore Destinations
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
        Hand-picked sacred sites & scenic wonders across India — curated for every traveller.
      </p>

      {/* Category filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={active === cat ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105",
              active === cat && "bg-amber-600 text-white hover:bg-amber-700"
            )}
            onClick={() => setActive(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => (
          <Link key={d.id} href={`/destinations/${d.slug}`}>
            <Card
              className="group overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-black/30 backdrop-blur">
                  {d.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{d.name}</CardTitle>
                <CardDescription className="line-clamp-2">{d.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{d.location}</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
