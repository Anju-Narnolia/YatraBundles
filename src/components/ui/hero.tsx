"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroBlock({
  title,
  subtitle,
  ctaText,
  ctaHref,
  imgSrc,
  imgAlt,
}: {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  imgSrc: string  
  imgAlt: string
}) {
  return (
    <section className="relative mx-auto  overflow-hidden   shadow-xl md:py-32 lg:px-8 h-[35rem]">
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
        priority
      />
      <div className="relative text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg">{subtitle}</p>
        <Button asChild size="lg" className="mt-10 bg-amber-600 hover:bg-amber-700">
          <a href={ctaHref}>{ctaText}</a>
        </Button>
      </div>
    </section>
  )
}