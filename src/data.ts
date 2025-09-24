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
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=60",
    location: "Ayodhya, UP",
  },
  {
    id: "2",
    slug: "dashashwamedh_ghat",
    name: "Dashashwamedh Ghat",
    category: "Ghats",
    description: "The most vibrant ghat on the Ganges in Varanasi.",
    image:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=60",
    location: "Varanasi, UP",
  },
  {
    id: "3",
    slug: "vembanad_lake",
    name: "Vembanad Lake",
    category: "Lakes",
    description: "Serene backwaters and houseboats in Kerala.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    location: "Kerala",
  },
  {
    id: "4",
    slug: "redhanagar_beach",
    name: "Radhanagar Beach",
    category: "Beaches",
    description:
      "Pristine white sands and turquoise waters on Havelock Island.",
    image:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=60",
    location: "Andaman & Nicobar",
  },
  {
    id: "5",
    slug: "kedarnath_peak",
    name: "Kedarnath Peak",
    category: "Mountains",
    description: "Sacred Himalayan shrine surrounded by snow-capped peaks.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    location: "Uttarakhand",
  },
  {
    id: "6",
    slug: "taj_mahal",
    name: "Taj Mahal",
    category: "Monuments",
    description: "An eternal symbol of love and Mughal architecture.",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=60",
    location: "Agra, UP",
  },
];

export const featuredDestinations = [
  {
    id: "paris",
    name: "Paris, France",
    description: "The city of love, lights, and art.",
    rating: 4.8,
    image: "https://placehold.co/600x400.png",
    aiHint: "eiffel tower",
  },
];
export const destinationsData = [
  { name: "Agra – Uttar Pradesh", slug: "agra" },
  { name: "Ajanta & Ellora Caves – Maharashtra", slug: "ajanta_ellora_caves" },
  { name: "Amritsar (Golden Temple) – Punjab", slug: "amritsar" },
  { name: "Andaman & Nicobar Islands (Havelock, Neil) – Andaman & Nicobar", slug: "andaman_nicobar_islands" },
  { name: "Badrinath – Uttarakhand", slug: "badrinath" },
  { name: "Bodh Gaya – Bihar", slug: "bodh_gaya" },
  { name: "Darjeeling – West Bengal", slug: "darjeeling" },
  { name: "Delhi (Red Fort, Qutub Minar, India Gate) – Delhi", slug: "delhi" },
  { name: "Gangtok – Sikkim", slug: "gangtok" },
  { name: "Goa – Goa", slug: "goa" },
  { name: "Gokarna – Karnataka", slug: "gokarna" },
  { name: "Gulmarg – Jammu & Kashmir", slug: "gulmarg" },
  { name: "Hampi – Karnataka", slug: "hampi" },
  { name: "Haridwar – Uttarakhand", slug: "haridwar" },
  { name: "Jaipur – Rajasthan", slug: "jaipur" },
  { name: "Jaisalmer – Rajasthan", slug: "jaisalmer" },
  { name: "Jim Corbett National Park – Uttarakhand", slug: "jim_corbett_national_park" },
  { name: "Jodhpur – Rajasthan", slug: "jodhpur" },
  { name: "Kaziranga National Park – Assam", slug: "kaziranga_national_park" },
  { name: "Kedarnath – Uttarakhand", slug: "kedarnath" },
  { name: "Khajuraho – Madhya Pradesh", slug: "khajuraho" },
  { name: "Kovalam – Kerala", slug: "kovalam" },
  { name: "Lakshadweep (Agatti, Bangaram) – Lakshadweep", slug: "lakshadweep" },
  { name: "Leh-Ladakh – Jammu & Kashmir", slug: "leh_ladakh" },
  { name: "Manali – Himachal Pradesh", slug: "manali" },
  { name: "Munnar – Kerala", slug: "munnar" },
  { name: "Mussoorie – Uttarakhand", slug: "mussoorie" },
  { name: "Nainital – Uttarakhand", slug: "nainital" },
  { name: "Ooty – Tamil Nadu", slug: "ooty" },
  { name: "Periyar Wildlife Sanctuary – Kerala", slug: "periyar_wildlife_sanctuary" },
  { name: "Pondicherry – Puducherry", slug: "pondicherry" },
  { name: "Pushkar – Rajasthan", slug: "pushkar" },
  { name: "Ranthambore National Park – Rajasthan", slug: "ranthambore_national_park" },
  { name: "Rishikesh – Uttarakhand", slug: "rishikesh" },
  { name: "Shimla – Himachal Pradesh", slug: "shimla" },
  { name: "Shirdi – Maharashtra", slug: "shirdi" },
  { name: "Sundarbans – West Bengal", slug: "sundarbans" },
  { name: "Taj Mahal (Agra Fort) – Uttar Pradesh", slug: "taj_mahal" },
  { name: "Tirupati Balaji – Andhra Pradesh", slug: "tirupati_balaji" },
  { name: "Udaipur – Rajasthan", slug: "udaipur" },
  { name: "Vaishno Devi – Jammu & Kashmir", slug: "vaishno_devi" },
  { name: "Varanasi – Uttar Pradesh", slug: "varanasi" },
  { name: "Varkala – Kerala", slug: "varkala" },
];

