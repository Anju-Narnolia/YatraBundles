import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Bed, Car, User, DollarSign } from "lucide-react";
import Link from "next/link";
import { destinations } from "@/data";

const services = {
  hotels: [
    {
      name: "Ganges Grandeur",
      rating: 4.8,
      type: "Hotel",
      specialization: "Luxury",
      salePrice: 110,
      price: 150,
      description: "Overlooks the main ghat with luxurious, traditional decor.",
    },
    {
      name: "River View Palace",
      rating: 4.5,
      type: "Resort",
      specialization: "Luxury",
      salePrice: 110,
      price: 120,
      description:
        "Modern amenities with stunning morning views of the Ganges.",
    },
    {
      name: "Kashi Comforts",
      rating: 4.2,
      type: "Dharamshala",
      salePrice: 110,
      specialization: "Budget",
      price: 80,
      description: "A budget-friendly option in the heart of the old city.",
    },
  ],
  drivers: [
    {
      name: "City Wheels",
      rating: 4.8,
      type: "Sedan",
      salePrice: 110,
      specialization: "City Tours",
      price: 50,
      description: "Comfortable sedan for city tours and airport transfers.",
    },
    {
      name: "Spiritual Drives",
      rating: 4.5,
      type: "SUV",
      salePrice: 110,
      specialization: "Temple Hopping",
      price: 75,
      description: "Spacious SUV for family travel and temple hopping.",
    },
    {
      name: "Eco-Rides",
      rating: 4.2,
      salePrice: 110,
      type: "Auto-rickshaw",
      specialization: "Short Distances",
      price: 20,
      description:
        "An authentic, open-air travel experience for short distances.",
    },
  ],
  guides: [
    {
      name: "Rohan Sharma",
      rating: 4.8,
      salePrice: 110,
      type: "Guide",
      specialization: "History & Rituals",
      price: 40,
      description: "A scholar on Vedic traditions and the history of Varanasi.",
    },
    {
      name: "Priya Singh",
      rating: 4.5,
      type: "Guide",
      salePrice: 110,
      specialization: "Food & Culture",
      price: 35,
      description: "Explore the culinary and cultural delights of the city.",
    },
    {
      name: "Amit Kumar",
      rating: 4.2,
      salePrice: 110,
      type: "Guide",
      specialization: "Photography Tours",
      price: 60,
      description: "Capture the best moments of your spiritual journey.",
    },
  ],
};

const ServiceCard = ({

  items,
}: {
  items: {
    name: string;
    rating: number;
    specialization: string;
    type: string;
    price: number;
    salePrice: number;
    description: string;
  }[];
}) => (
  <div className="grid gap-12">
    {items.map((item) => (
      <Link key={item.name} href={`/services/${item.name}`}>
        <div className=" flex rounded-md hover:shadow-lg">
          <Image
            src="/top-view-travel-kit-essentials.jpg"
            alt={item.name}
            width={450}
            height={50}
            objectFit="cover"
            className="z-0 rounded-l-2xl"
            priority
          />
          <Card className=" flex-1 rounded-r-2xl">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-xl font-headline text-orange-500">{item.name}</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-5 h-5  text-yellow-500" />
                  <span className="font-bold text-lg">
                    {item.rating}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-sm font-headline">{item.description}</CardTitle>
              <div className="flex gap-2 text-blue-700 ">
                <p className="hover:underline"> #{item.specialization}</p>
                <p className="hover:underline"> #{item.type} </p>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-lg font-bold flex gap-2 items-center ">
                <span className="text-red-700 flex items-center line-through">
                  <DollarSign className="w-4 h-4 " />
                  {" "}{item.salePrice}
                </span>
                <p className="flex text-green-700 items-center">
                  <DollarSign className="w-4 h-4" />
                  {" "} {item.price}{" "
                  }</p>
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / day
                </span>
                
              </div>
              <Button>Book Now</Button>
            </CardContent>
          </Card>
        </div>
      </Link>
    ))}
  </div>
);

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="relative h-[50vh]">
        <Image
          src={destination.image}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold font-headline">
            {destination.name}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center text-muted-foreground mb-12">
            {destination.description}
          </p>

          <Tabs defaultValue="hotels" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-200">
              <TabsTrigger value="hotels" className="text-lg py-2.5 gap-2">
                <Bed /> Hotels
              </TabsTrigger>
              <TabsTrigger value="drivers" className="text-lg py-2.5 gap-2">
                <Car /> Drivers
              </TabsTrigger>
              <TabsTrigger value="guides" className="text-lg py-2.5 gap-2">
                <User /> Guides
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hotels" className="mt-8">
              <ServiceCard
                items={services.hotels}
              />
            </TabsContent>
            <TabsContent value="drivers" className="mt-8">
              <ServiceCard
                items={services.drivers}
              />
            </TabsContent>
            <TabsContent value="guides" className="mt-8">
              <ServiceCard
                items={services.guides}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
