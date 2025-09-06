import HeroBlock from "@/components/ui/hero"
import FeatureCard from "@/components/ui/feature-card"
import { Separator } from "@/components/ui/separator"
import { Waves, Mountain, Sun, Sailboat, Tent, Utensils, Badge } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { destinations } from "@/data"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const categories = [
  { name: 'Beaches', icon: <Waves className="h-8 w-8 text-accent" />, description: 'Relax on sun-kissed sands.' },
  { name: 'Mountains', icon: <Mountain className="h-8 w-8 text-accent" />, description: 'Conquer majestic peaks.' },
  { name: 'Temples', icon: <Sun className="h-8 w-8 text-accent" />, description: 'Discover ancient spirituality.' },
  { name: 'Lakes', icon: <Sailboat className="h-8 w-8 text-accent" />, description: 'Enjoy serene blue waters.' },
  { name: 'Camping', icon: <Tent className="h-8 w-8 text-accent" />, description: 'Sleep under the stars.' },
  { name: 'Dining', icon: <Utensils className="h-8 w-8 text-accent" />, description: 'Savor local cuisines.' },
];
export default function HomePage() {

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

      <section className="mx-auto max-w-6xl">
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
        <div className="flex justify-center mt-12">
          <Link href="/destinations">
            <Button variant="outline" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold cursor-pointer">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>

      <section className="py-12 md:py-20 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Explore by Category</h2>
            <p className="mt-2 text-muted-foreground md:text-lg">Find experiences that match your style.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {categories.map((category) => (
              <Link href="#" key={category.name}>
                <div className="p-4 bg-background rounded-lg shadow-sm transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col items-center gap-2 cursor-pointer">
                  {category.icon}
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold">Ready to travel?</h2>
        <p className="mt-4 text-lg text-slate-600">
          Sign up in 30 seconds and get 10 % off your first bundle.
        </p>
      </section>
    </div>
  )
}