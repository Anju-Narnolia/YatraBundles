"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeft } from "lucide-react";

interface Bundle {
  _id: string;
  city: string;
  image: string;
  info: string;
  alt: string;
  price: number;  
  currency: string;
  createdAt: string;
}

export default function BookBundlePage() {
  const { id } = useParams();
  const router = useRouter();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  // Check-in date = today + 2 days
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + 2);

  // Check-out date = today + 4 days
  const checkOutDate = new Date(today);
  checkOutDate.setDate(today.getDate() + 4);

  // Format the dates
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Mon, Tue
    day: "numeric",  // 22
    month: "short",  // Sept
  };

  const formattedCheckIn = checkInDate.toLocaleDateString("en-US", options);
  const formattedCheckOut = checkOutDate.toLocaleDateString("en-US", options);

  const [paymentData, setPaymentData] = useState({
    TotalPayment: bundle?.price,
    firstName: "",
    surname: "",
    email: "",
    country: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    specialRequest: "",
  });

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const res = await fetch(`/api/bundles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch bundle");
        const data = await res.json();
        setBundle(data.bundle);
      } catch (error) {
        console.error("Error fetching bundle:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBundle();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const specialReq = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Special Request Send!");
    setPaymentData({
      TotalPayment: bundle?.price,
      firstName: "",
      surname: "",
      email: "",
      country: "",
      phone: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      specialRequest: "",
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      bundleId: bundle?._id,
      city: bundle?.city,
      info:bundle?.info,
      price: bundle?.price,
      img: bundle?.image,
      name: `${paymentData.firstName} ${paymentData.surname}`.trim(),
      email: paymentData.email,
      phone: paymentData.phone,
      cardName: paymentData.cardName,
      cardNumber: paymentData.cardNumber,
      expiry: paymentData.expiry,
      cvv: paymentData.cvv,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      specialRequest: paymentData.specialRequest,
      createdAt: new Date(),
    };

    try {
      const response = await fetch("/api/bundles/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();

      if (result.success) {
        alert(`Bundle booking confirmed! ID: ${result.insertedId}`);
        router.push("/trips");
        setPaymentData({
          TotalPayment: bundle?.price,
          firstName: "",
          surname: "",
          email: "",
          country: "",
          phone: "",
          cardName: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
          specialRequest: "",
        });
      } else {
        alert("Failed to save booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something went wrong while saving booking.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!bundle) {
    return <div className="p-6 text-center">Bundle not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <MoveLeft size={20} />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bundle Info */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={bundle.image}
                alt={bundle.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h2 className="mb-2 text-2xl font-bold">{bundle.city}</h2>
            <p className="mb-4 text-gray-600">{bundle.info}</p>
            <div className="text-xl font-semibold text-blue-600">
              ₹{bundle.price.toLocaleString()}
            </div>
          </div>

          {/* Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-6 text-2xl font-bold">Complete Your Booking</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  First Name *
                </label>
                <Input
                  value={paymentData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  placeholder="Enter your first name"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Surname *
                </label>
                <Input
                  value={paymentData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                  required
                  placeholder="Enter your surname"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Phone *
                </label>
                <Input
                  type="tel"
                  value={paymentData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  placeholder="Enter your phone"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Cardholder Name *
                </label>
                <Input
                  value={paymentData.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                  required
                  placeholder="Name on card"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Card Number *
                </label>
                <Input
                  value={paymentData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Expiry *
                  </label>
                  <Input
                    value={paymentData.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                    required
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">CVV *</label>
                  <Input
                    value={paymentData.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    required
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Special Request
                </label>
                <textarea
                  value={paymentData.specialRequest}
                  onChange={(e) =>
                    handleChange("specialRequest", e.target.value)
                  }
                  className="w-full rounded-md border p-2"
                  rows={3}
                  placeholder="Any special requests or preferences..."
                />
              </div>

              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>

              <button
                type="button"
                onClick={specialReq}
                className="mt-4 w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
              >
                Send Special Request Only
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

