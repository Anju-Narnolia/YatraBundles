"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div>
      <div className="relative w-full h-[30rem] bg-gray-50/20">
        {/* Hero Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/top-view-travel-kit-essentials.jpg" // Add your premium image in /public/
            alt="Contact Background"
            fill

            priority
          />
          <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay for contrast */}
        </div>

        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="mt-4 text-center text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            We’re here to help and answer any question you might have. Reach out to us and we’ll respond as soon as we can.
          </p>
        </div>
      </div>
      <div className="m-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info Panel */}
        <div className="space-y-6 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800">Contact Info</h2>
          <p className="text-gray-600">Feel free to reach out via email, phone, or visit us at our office.</p>

          <div className="flex items-center gap-4 text-gray-700">
            <MapPin className="w-6 h-6 text-amber-600" />
            <span>123 Travel Street, Wanderlust City</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <Phone className="w-6 h-6 text-amber-600" />
            <span>+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <Mail className="w-6 h-6 text-amber-600" />
            <span>support@yatrabundle.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className=" text-4xl font-semibold py-5">Send US A Massage</h1>
          <form className="space-y-6">
            <label>Your Name</label>
            <Input
              placeholder="Enter Your Name Here"
              required
              className="border-gray-300 focus:border-amber-600 focus:ring-amber-600"
            />
            <label>Your Email</label>
            <Input
              type="email"
              placeholder="Enter Your Email Here"
              required
              className="border-gray-300 focus:border-amber-600 focus:ring-amber-600"
            />
            <label>Your Message</label>
            <Textarea
              placeholder="Enter Your Message"
              rows={6}
              required
              className="border-gray-300 focus:border-amber-600 focus:ring-amber-600"
            />
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold shadow-md transition-all">
              Send Message
            </Button>
          </form>
        </div>
      </div>

    </div>
  )
}
