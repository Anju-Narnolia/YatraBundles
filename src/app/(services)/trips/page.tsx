"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { Calendar, DollarSign, Edit, Trash2 } from "lucide-react";

interface Booking {
  _id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  destination: string;
  address: string;
  sPhone: string;
  img: string;
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  status: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
}


export default function MyTripsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/services/trips");
        const data = await res.json();

        if (data.success) {
          setBookings(data.bookings);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-lg">Loading your trips...</p>;
  }
  if (bookings.length === 0) {
    return <p className="text-center py-10 text-lg">No trips found. Book your first trip!</p>;
  }
  return (
    <div className="bg-background ">
      <div className="px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">My Trips</h1>
          <p className="text-lg text-muted-foreground mt-2">
            View and manage your upcoming and past adventures.
          </p>
        </div><div className="flex flex-col items-center justify-center">
          <div className="flex flex-col p-4  max-w-7xl w-full">
            {bookings.map((trip) => (
              <Card
                key={trip._id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
              >
                <div className="relative h-56 md:h-auto ">
                  <Image
                    src={trip.img}
                    alt={trip.destination || trip.serviceName}
                    width={200}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <CardTitle className="text-4xl font-headline capitalize">
                          {trip.serviceName || "Unknown Destination"}
                        </CardTitle>
                        <Badge
                          variant={trip.status === "Confirmed" ? "default" : "secondary"}
                          className="capitalize bg-green-700/90 text-md text-primary-foreground"
                        >
                          {trip.status || "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-md mt-1">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{trip.checkIn} → {trip.checkOut}</span>
                      </div>
                      {trip.destination && (
                        <p className="text-lg text-muted-foreground mt-1">
                          <span className="font-bold"> Destination:</span> {trip.destination}
                        </p>
                      )}
                      {trip.address && (
                        <p className="text-lg text-muted-foreground mt-1 capitalize">
                          <span className="font-bold">Address: </span>{trip.address}
                        </p>
                      )}
                      {trip.sPhone && (
                        <p className="text-lg text-muted-foreground mt-1">
                          <span className="font-bold"> Service Phone: </span> {trip.sPhone}
                        </p>
                      )}

                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">Booked Services:</h4>
                    <div className="flex items-center mt-4 font-bold text-lg">
                      <DollarSign className="w-5 h-5 mr-2 text-primary" />
                      <span>Total Cost: ${trip.price?.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Modify
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div >
    </div >
  );
}
