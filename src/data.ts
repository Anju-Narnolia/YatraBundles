import { Building, Utensils } from "lucide-react";
interface DataDest {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
}

export const myTrips = [
  {
    id: "trip1",
    destination: "Paris, France",
    dates: "Oct 15, 2024 - Oct 22, 2024",
    services: [
      { type: "Hotel", name: "Le Grand Hotel", icon: Building },
      { type: "Guide", name: "Jean-Luc Picard", icon: Utensils },
    ],
    cost: 2500,
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=60",
    aiHint: "paris street",
  },
];
export const destinations: DataDest[] = [
  {
    id: "1",
    slug: "ram_mandir",
    name: "Ram Mandir",
    category: "Temples",
    description: "The newly-constructed sacred abode of Lord Ram in Ayodhya.",
    image:
      "/ram_mandir.jpg",
    location: "Ayodhya, UP",
  },
  {
    id: "2",
    slug: "dashashwamedh_ghat",
    name: "Dashashwamedh Ghat",
    category: "Ghats",
    description: "The most vibrant ghat on the Ganges in Varanasi.",
    image:"/Dashashwamedh_Ghat.jpg",
    location: "Varanasi, UP",
  },
  {
    id: "3",
    slug: "vembanad_lake",
    name: "Vembanad Lake",
    category: "Lakes",
    description: "Serene backwaters and houseboats in Kerala.",
    image:"/Vembanad_Lake.jpg",
    location: "Kerala",
  },
  {
    id: "4",
    slug: "radhanagar_beach",
    name: "Radhanagar Beach",
    category: "Beaches",
    description:
      "Pristine white sands and turquoise waters on Havelock Island.",
    image:"/Radhanagar_Beach.jpg",
    location: "Andaman & Nicobar",
  },
  {
    id: "5",
    slug: "kedarnath_peak",
    name: "Kedarnath Peak",
    category: "Mountains",
    description: "Sacred Himalayan shrine surrounded by snow-capped peaks.",
    image:"/Kedarnath_Peak.jpg",
    location: "Uttarakhand",
  },
  {
    id: "6",
    slug: "taj_mahal",
    name: "Taj Mahal",
    category: "Monuments",
    description: "An eternal symbol of love and Mughal architecture.",
    image:"/Taj_Mahal.jpg",
    location: "Agra, UP",
  },
  {
    id: "7",
    slug: "varanasi",
    name: "Varanasi",
    category: "Ghats",
    description: "An eternal symbol of love and Mughal architecture.",
    image:"/Varanasi .jpg",
    location: "Agra, UP",
  },
];

export const destinationsData = [
  { name: "Dashashwamedh Ghat  – Varanasi, UP", slug: "dashashwamedh_ghat" },
  { name: "Kedarnath – Uttarakhand", slug: "kedarnath_peak" },
  { name: "Radhanagar Beach – Andaman & Nicobar", slug: "radhanagar_beach" },
  { name: "Ram Mandir – Ayodhya, UP ", slug: "ram_mandir" },
  { name: "Taj Mahal (Agra Fort) – Uttar Pradesh", slug: "taj_mahal" },
  { name: "Varanasi – Uttar Pradesh", slug: "varanasi" },
  { name: "Vembanad Lake – Kerala", slug: "vembanad_lake" },
];

export const sample = [
  {
    id: 1,
    city: "Ayodhya",
    img: "/Ayodhya.jpg",
    info: "2 nights stay + car pickup + certified guide",
    alt: "Ram Mandir",
    price: "₹4 999",
  },
  {
    id: 2,
    city: "Varanasi",
    img: "/Varanasi .jpg",
    info: "2 nights stay + airport pickup + certified guide",

    alt: "Ganga Aarti",
    price: "₹5 499",
  },
  {
    id: 3,
    city: "Kedarnath",
    img: "/Kedarnath_Temple.jpg",
    info: "5 nights stay + car pickup + certified guide",

    alt: "Kedarnath temple",
    price: "₹9 999",
  }];