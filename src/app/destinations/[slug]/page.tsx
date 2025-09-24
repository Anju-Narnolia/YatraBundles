"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Bed, Car, User, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface Service {
  _id: string;
  name: string;
  type: string;
  phone: string;
  image: string;
  price: number;
  destination: string;
  address: string;
  available: boolean;
}

const ServiceCard = ({ items }: { items: Service[] }) => (
  <div className="grid gap-12">
    {items.length === 0 ? (
      <p className="text-center text-gray-500">
        No services available for this category.
      </p>
    ) : (
      items.map((item) => (
        <div key={item._id} className="flex rounded-md hover:shadow-lg border-2 ">
          <Image
            src={item.image || "/top-view-travel-kit-essentials.jpg"}
            alt={item.name}
            width={350}
            height={500}
            className="z-0 rounded-l-2xl"
            priority
          />
          <Card className="flex-1 rounded-r-2xl bg-gray-100">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-3xl font-headline text-orange-500 uppercase">
                {item.name}
              </CardTitle>
              {item && (
                <div className="flex font-bold text-xl items-center gap-1 text-primary"> Ratings:
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="font-bold text-xl">
                    {(Math.random() * (5 - 4) + 4).toFixed(1)}
                  </span>
                </div>
              )}
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-lg font-headline">
                * Address: {item.address}
              </CardTitle>
              <div className="flex gap-1 text-lg">
                <p className="font-bold  ">* Destination: </p>
                {item.destination}</div>
              <div className="flex gap-2 text-blue-700 ">
                <p className="hover:underline font-bold text-lg">* {item.type}</p>
              </div>
              <div className="flex gap-2 text-gray-700 font-bold text-lg">
                <p className="">* Contact No.: {item.phone}</p>
              </div>
            </CardHeader>
            <CardHeader>
              <div><p>A budget-friendly hotel near Taj Mahal with free WiFi and breakfast.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Free WiFi", "Breakfast Included", "Parking", "AC Rooms", "Swimming Pool"].map((amenity, index) => (
                    <p key={index} className="px-2  text-blue-700 hover:underline py-1 bg-gray-100 rounded-md text-sm">
                      #{amenity}
                    </p>
                  ))}
                </div>

              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-lg font-bold flex gap-1 items-center ">
                <p className="text-red-700 items-center line-through">${item.price + 100}</p>
                <p className="flex text-green-700 items-center">
                  <DollarSign className="w-4 h-4" />
                  {item.price}
                </p>
                <span className=" font-normal  ml-1">
                  / day
                </span>
              </div>
              <div className="flex gap-5">
                <Button
                  className={`${item.available
                    ? "bg-green-800/80 hover:bg-green-800/90"
                    : "bg-red-800/80/ hover:bg-red-800/90"
                    } text-white`}
                >
                  {item.available ? "Available Now" : "Not Available"}
                </Button>
                <Link
                  href={item.available ? `/bookservice/${item._id}` : "#"}
                  passHref
                >
                  <Button
                    className={`cursor-pointer ${item.available
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 cursor-not-allowed"
                      } text-white`}
                    disabled={!item.available}
                  >
                    {item.available ? "Book Now" : "Not Available"}
                  </Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>
      ))
    )}
  </div >
);

export default function DestinationDetailPage() {
  const params = useParams(); // ✅ Use this instead of `use(params)`
  const slug = params.slug as string;
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session && slug) {
      fetchServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, slug]);

  const fetchServices = async () => {
    try {
      console.log("🔍 Fetching services for destination:", slug);
      const response = await fetch(
        `/api/services/by-destination?slug=${encodeURIComponent(slug)}`
      );
      console.log("📡 Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("📊 Services data:", data);
        setServices(data.services || []);
      } else {
        const errorData = await response.json();
        console.warn("API Error:", errorData);
        console.log("Failed to fetch services");
      }
    } catch (e) {
      console.log("Error fetching services");
      console.warn("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const hotels = services.filter((s) => s.type === "hotel");
  const drivers = services.filter((s) => s.type === "driver");
  const guides = services.filter((s) => s.type === "guide");

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to view your services
          </h1>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="relative h-[50vh]">
        <Image
          src="/top-view-travel-kit-essentials.jpg"
          alt="destination"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold font-headline">
            {slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
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
            <ServiceCard items={hotels} />
          </TabsContent>

          <TabsContent value="drivers" className="mt-8">
            <ServiceCard items={drivers} />
          </TabsContent>

          <TabsContent value="guides" className="mt-8">
            <ServiceCard items={guides} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
