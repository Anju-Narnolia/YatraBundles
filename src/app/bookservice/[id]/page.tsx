"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeft } from "lucide-react";


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


export default function BookServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
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
    TotalPayment: "1200",
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
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setService(data.service);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const specialReq = async (e: React.FormEvent) => {
    alert("Special Request Send!");
    setPaymentData({
      TotalPayment: "1200",
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

    e.preventDefault();
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      serviceId: service?._id,
      serviceName: service?.name,
      price: service?.price,
      img: service?.image,
      destination: service?.destination,
      address: service?.address,
      sPhone: service?.phone,
      name: `${paymentData.firstName} ${paymentData.surname}`.trim(),
      email: paymentData.email,
      phone: paymentData.phone,
      cardNumber: paymentData.cardNumber,
      expiry: paymentData.expiry,
      cvv: paymentData.cvv,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      
      createdAt: new Date(),
    };

    try {
      const response = await fetch("/api/services/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();

      if (result.success) {
        alert(`Booking confirmed! ID: ${result.insertedId}`);
        router.push("/trips");
        setPaymentData({
          TotalPayment: "1200",
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
    return <div className="p-6 text-center">Loading service details...</div>;
  }

  if (!service) {
    return <div className="p-6 text-center text-red-500">Service not found!</div>;
  }

  return (
    <div className="flex gap-2 p-16">
      <div className="flex flex-col items-center w-3/5">
        <div className="w-full max-w-5xl px-5">
          {/* Back Button */}
          <Button onClick={() => router.push("/destinations")} variant="outline" className="mb-6">
            <MoveLeft /> Back to Destinations
          </Button>

          {/* Guest Details Form */}
          <div className="border rounded-lg mb-8">
            <div className="mt-8 p-6 rounded-2xl shadow-lg">
              <h1 className="text-2xl font-semibold">Who’s checking in?</h1>
              <p className="text-sm text-gray-600 mb-2"><span className="text-red-400">*</span> Required</p>
              <p className="mb-4"><span className="font-bold">Property 1:</span> 2 Adults, 1 King Bed, Non-smoking</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Free WiFi", "Breakfast Included", "Parking", "AC Rooms", "Swimming Pool"].map((amenity, index) => (
                  <span key={index} className="px-2 py-1 text-green-700 text-sm rounded-md hover:underline">
                    #{amenity}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
              <form className="space-y-4 text-base">
                {/* Name Fields */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">First Name</label>
                    <Input
                      placeholder="First Name"
                      value={paymentData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">Surname</label>
                    <Input
                      placeholder="Surname"
                      value={paymentData.surname}
                      onChange={(e) => handleChange("surname", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col w-full">
                  <label className="mb-1 font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={paymentData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Country & Phone */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">Country</label>
                    <Input
                      placeholder="Country"
                      value={paymentData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={paymentData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="border rounded-lg mb-8">
            <div className="mt-8 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">Payment Method</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {['We use secure transmission', 'We protect your personal information'].map((msg, i) => (
                  <span key={i} className="px-2 py-1 text-green-700 text-sm rounded-md hover:underline">
                    #{msg}
                  </span>
                ))}
              </div>

              {/* Card Icons */}
              <div className="flex gap-4 items-center mb-4">
                {[
                  'https://a.travel-assets.com/dms-svg/payments/cards-cc_master_card.svg',
                  'https://a.travel-assets.com/dms-svg/payments/cards-cc_american_express.svg',
                  'https://a.travel-assets.com/egds/marks/payment__visa.svg',
                  'https://a.travel-assets.com/dms-svg/payments/cards-cc_visa_electron.svg'
                ].map((link, index) => (
                  <Image
                    key={index}
                    src={link}
                    alt="payment card"
                    width={50}
                    height={30}
                    className="object-contain"
                  />
                ))}
              </div>

              {/* Card Details Form */}
              <form className="space-y-4">
                {/* Card Name */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Name on Card</label>
                  <Input
                    placeholder="Card Name"
                    value={paymentData.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value)}
                    required
                  />
                </div>

                {/* Card Number & Expiry */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">Card Number</label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full md:w-1/3">
                    <label className="mb-1 font-medium text-gray-700">Expiry</label>
                    <Input
                      placeholder="MM/YY"
                      value={paymentData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* CVV */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="mb-1 font-medium text-gray-700">CVV</label>
                  <Input
                    placeholder="CVV"
                    value={paymentData.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          {/* Submit Button */}


          <div className="border rounded-lg mb-8">
            <div className="mt-8 p-6 rounded-2xl shadow-lg">
              {/* Cancellation Policy */}
              <h2 className="text-2xl font-bold mb-2">Cancellation Policy</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>This rate is non-refundable. If you change or cancel your booking, you will not get a refund or credit to use for a future stay.</li>
                <li>No refunds will be issued for late check-in or early check-out.</li>
                <li>Stay extensions require a new reservation.</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-lg mb-8">
            <div className="mt-8 p-6 rounded-2xl shadow-lg">
              {/* Important Information */}
              <h2 className="text-2xl font-bold mb-2">Important Information</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Front desk staff will greet guests on arrival at the property.</li>
                <li>Expedia and the hotel will not issue a tax invoice. You will receive a commercial receipt for the purpose of the transaction.</li>
                <li>Check-in: <span className="font-medium">Mon, 22 Sept, 1:00 PM</span></li>
                <li>Check-out: <span className="font-medium">Wed, 24 Sept, noon (2-night stay)</span></li>
                <li>
                  By clicking the button below, I acknowledge that I have reviewed and accept the <a href="#" className="text-blue-600 underline">Privacy Statement</a>, <a href="#" className="text-blue-600 underline">Government Travel Advice</a>, <a href="#" className="text-blue-600 underline">Rules & Restrictions</a>, and <a href="#" className="text-blue-600 underline">Terms of Use</a>.
                </li>
                <Button
                  type="submit"
                  onClick={handlePaymentSubmit}
                  className="px-10 py-8 m-4 font-bold  bg-blue-600 hover:bg-blue-700 text-white text-3xl  rounded-md"
                >
                  Pay Now
                </Button>
                <li>We use secure transmission and encrypted storage to protect your personal information.</li>
                <li>The final amount may vary during payment due to foreign exchange rates determined by your bank.</li>
                <li>
                  Payments are processed in India, Spain, or Singapore, except for Pay Later / Reserve with deposit bookings and certain flight bookings where the travel provider processes your payment outside of these countries.
                </li>
                <li>
                  Your bank or card issuer may charge a foreign transaction fee if you pay using a card issued in a different country than the processing location.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="mt-16 mb-5 border flex-1 bg-white rounded-xl shadow-md">
          <Image
            src={service.image || "/top-view-travel-kit-essentials.jpg"}
            alt={service.name}
            width={500}
            height={400}
            className="w-full h-[300px] object-cover"
          />
          <div className="p-6 border shadow-md flex gap-2 flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between">
              {/* Service Title & Details */}
              <h1 className="text-2xl font-bold uppercase">{service.name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${service.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {service.available ? "Available Now" : "Not Available"}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{service.destination}</p>
            <p className="text-gray-800 font-medium mt-1">{service.address}</p>
            <p className="text-gray-800 font-medium mt-1">{service.phone}</p>
            <hr></hr>
            <p className="text-gray-600"><span className="px-2 py-1 bg-green-700 text-white font-bold rounded-md mx-4  "> 8 </span>  Very good (4 reviews)</p>

            <p className="text-gray-700 font-medium">1 Property: Deluxe Double Room</p>
            {/* Price & Availability */}
            <div className="flex justify-between items-center mt-4">
              <div className="space-y-1 text-gray-700">
                <p><span className="font-medium">Non-refundable</span></p>
                <p>Check-in: <span className="font-medium">{formattedCheckIn}</span></p>
                <p>Check-out: <span className="font-medium">{formattedCheckOut}</span></p>
                <p>2-night stay</p>
              </div>
            </div>
            <hr></hr>
          </div>
        </div>

        <div className="my-5 border flex flex-col gap-3 bg-white rounded-xl shadow-md p-5">
          <p className="mt-2 text-green-700 font-medium">You have good taste! Book now before someone else grabs it!</p>
        </div>

        <div className=" my-5 border flex flex-col gap-3 bg-white rounded-xl shadow-md p-5">
          <h3 className="text-xl font-bold my-2">Price Details</h3>
          <hr></hr>
          <div className="flex justify-between">
            <p>1 room x 2 nights</p>
            <p>₹10,798.20</p>
          </div>
          <div className="flex justify-between">
            <p>Average per night</p>
            <p>₹5,399.10</p>
          </div>
          <div className="flex justify-between">
            <p>Taxes</p>
            <p>₹1,295.78</p>
          </div>
          <hr className="my-2"></hr>
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p> $ {paymentData.TotalPayment}</p>
          </div>
        </div>

        {/* Special Requests */}
        <div className="my-5 border flex flex-col gap-3 bg-white rounded-xl shadow-md p-5">
          <form className="space-y-4 text-base" onSubmit={specialReq}>
            <label className="font-medium mb-1 block">Special Requests (optional)</label>
            <textarea
              placeholder="Your special requests..."
              value={paymentData.specialRequest}
              onChange={(e) => handleChange("specialRequest", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <Button
              type="submit"
              className="px-10 py-8 m-4 font-bold  bg-blue-600 hover:bg-blue-700 text-white text-3xl  rounded-md cursor-pointer"
            >Send Request </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
