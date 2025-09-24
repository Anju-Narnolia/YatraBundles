"use client"
import HeroBlock from "@/components/ui/hero"
import FeatureCard from "@/components/ui/feature-card"
import { Separator } from "@/components/ui/separator"
import { Waves, Mountain, Sun, Sailboat, Tent, Utensils, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { destinations } from "@/data"
import { Button } from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
const sample = [
  {
    id: 1,
    city: "Ayodhya",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=640&q=60",
    info: "2 nights stay + car pickup + certified guide",
    alt: "Ram Mandir",
    price: "₹4 999",
  },
  {
    id: 2,
    city: "Varanasi",
    img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=640&q=60",
    info: "2 nights stay + airport pickup + certified guide",

    alt: "Ganga Aarti",
    price: "₹5 499",
  },
  {
    id: 3,
    city: "Kedarnath",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=640&q=60",
    info: "5 nights stay + car pickup + certified guide",

    alt: "Kedarnath temple",
    price: "₹9 999",
  }];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, GreenTech",
    quote:
      "This product completely transformed the way we work. The UI is sleek, and the performance is top-notch!",
  },
  {
    name: "David Miller",
    role: "Freelancer",
    quote:
      "Fast, reliable, and easy to use. I recommend it to anyone looking to improve their workflow.",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Head, BrandX",
    quote:
      "The support team was amazing, and the overall experience was seamless. 5/5 from us!",
  },
]

const categories = [
  { name: 'Beaches', icon: <Waves className="h-8 w-8 text-orange-500" />, description: 'Relax on sun-kissed sands.' },
  { name: 'Mountains', icon: <Mountain className="h-8 w-8 text-orange-500" />, description: 'Conquer majestic peaks.' },
  { name: 'Temples', icon: <Sun className="h-8 w-8 text-orange-500" />, description: 'Discover ancient spirituality.' },
  { name: 'Lakes', icon: <Sailboat className="h-8 w-8 text-orange-500" />, description: 'Enjoy serene blue waters.' },
  { name: 'Camping', icon: <Tent className="h-8 w-8 text-orange-500" />, description: 'Sleep under the stars.' },
  { name: 'Dining', icon: <Utensils className="h-8 w-8 text-orange-500" />, description: 'Savor local cuisines.' },
];
export default function HomePage() {
  const [startIndex, setStartIndex] = useState(0)


  const next = () =>
    setStartIndex((prev) => (prev + 2) % testimonials.length)
  const prev = () =>
    setStartIndex(
      (prev) => (prev - 2 + testimonials.length) % testimonials.length
    )

  // pick 2 testimonials to show
  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
  ]
  return (
    <div className="space-y-20">
      <HeroBlock
        title="Spiritual Journeys, Perfectly Bundled"
        subtitle="Experience sacred destinations with our all-inclusive pilgrimage bundles. We handle the details, so you can focus on your spiritual path."
        ctaText="Explore Bundles"
        ctaHref="/bundles"
        imgSrc="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1920&q=80"
        imgAlt="Ayodhya sunset"
      />

      <section className="container mx-auto px-4 md:px-6 lg:px-16 bg-card">
        <h2 className="text-center text-3xl font-bold">Why YatraBundles</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="Verified Stays"
            description="Hand-picked dharamshalas, homestays & hotels with real photos & reviews."
            img="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=640&q=60"
            alt="hotel room"
          />
          <FeatureCard
            title="Trusted Transport"
            description="Pre-priced cabs & bikes—airport pickup to local darshan circuits."
            img="https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=640&q=60"
            alt="taxi"
          />
          <FeatureCard
            title="Expert Guides"
            description="Government-licensed storytellers or premium audio guides in Hindi & English."
            img="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=640&q=60"
            alt="tour guide"
          />
        </div>
      </section>

      <Separator />

      <div className="container mx-auto px-4 md:px-6 lg:px-16">
        <h2 className="text-center text-3xl font-bold">Explore Our Destinations</h2>
        <p className="mt-2 text-muted-foreground md:text-lg text-center">Find your next spiritual journey from our curated list of sacred places around the world.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {destinations.slice(0, 3).map((d) => (
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
                <CardContent className="flex justify-between">
                  <p className="gap-2"> Starting from
                    <span className="text-orange-500 line-through px-2">$ 900 </span >
                    <span className="text-green-500">$ 600 </span>
                  </p>
                  <div className="flex">
                    <Star className="text-blue-500 text-lg" />
                    <p className="text-blue-500 font-bold text-lg"> 4.5 </p>
                  </div>
                </CardContent>
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
        <div className="flex justify-center mt-8">
          <Link href="/destinations">
            <Button variant="outline" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold cursor-pointer">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-6 lg:px-16 ">
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
        <div className="flex justify-center mt-8">
          <Link href="/bundles">
            <Button variant="outline" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold cursor-pointer">
              View All Bundles
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Explore by Category</h2>
            <p className="mt-2 text-muted-foreground md:text-lg">Find experiences that match your style.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {categories.map((category) => (
              <Link href="/destinations" key={category.name}>
                <div className="p-4 bg-background rounded-lg shadow-sm transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col items-center gap-2 cursor-pointer">
                  <p> {category.icon}</p>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl mx-auto text-center p-6 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-14"
            >
              {visibleTestimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-orange-200 dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex justify-center items-center flex-col"
                >
                  <p className="text-lg italic mb-4">{t.quote}</p>
                  <div className=" flex gap-2 items-center">
                    <p className="w-10 h-10 border-2 border-primary rounded-full bg-gray-200 font-bold text-xl py-auto">
                      {t.name.charAt(0)}
                    </p>
                    <div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <span className="text-sm text-gray-500 ">{t.role}</span></div></div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </section>
    </div>
  )
}