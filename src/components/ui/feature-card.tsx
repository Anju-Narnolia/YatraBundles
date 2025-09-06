"use client"
import Image from "next/image"

interface Props {
  title: string
  description: string
  img: string
  alt: string
}

export default function FeatureCard({ title, description, img, alt }: Props) {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-lg">
      <Image src={img} alt={alt} width={640} height={360} className="h-48 w-full rounded-t-xl object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-slate-600">{description}</p>
      </div>
    </div>
  )
}