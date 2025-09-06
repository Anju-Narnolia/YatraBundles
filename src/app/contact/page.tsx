"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-center text-4xl font-bold">Get in touch</h1>
      <form className="mt-10 space-y-6">
        <Input placeholder="Name" required />
        <Input type="email" placeholder="Email" required />
        <Textarea placeholder="Message" rows={6} required />
        <Button className="w-full bg-amber-600 hover:bg-amber-700">Send</Button>
      </form>
    </div>
  )
}