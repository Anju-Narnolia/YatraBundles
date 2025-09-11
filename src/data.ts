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
    slug: "ram-mandir",
    name: "Ram Mandir",
    category: "Temples",
    description: "The newly-constructed sacred abode of Lord Ram in Ayodhya.",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=60",
    location: "Ayodhya, UP",
  },
  {
    id: "2",
    slug: "dashashwamedh-ghat",
    name: "Dashashwamedh Ghat",
    category: "Ghats",
    description: "The most vibrant ghat on the Ganges in Varanasi.",
    image:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=60",
    location: "Varanasi, UP",
  },
  {
    id: "3",
    slug: "vembanad-lake",
    name: "Vembanad Lake",
    category: "Lakes",
    description: "Serene backwaters and houseboats in Kerala.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    location: "Kerala",
  },
  {
    id: "4",
    slug: "redhanagar-beach",
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
    slug: "kedarnath-peak",
    name: "Kedarnath Peak",
    category: "Mountains",
    description: "Sacred Himalayan shrine surrounded by snow-capped peaks.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    location: "Uttarakhand",
  },
  {
    id: "6",
    slug: "taj-mahal",
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
  { name: "Agra – Uttar Pradesh" },
  { name: "Ajanta & Ellora Caves – Maharashtra" },
  { name: "Amritsar (Golden Temple) – Punjab" },
  { name: "Andaman & Nicobar Islands (Havelock, Neil) – Andaman & Nicobar" },
  { name: "Badrinath – Uttarakhand" },
  { name: "Bodh Gaya – Bihar" },
  { name: "Darjeeling – West Bengal" },
  { name: "Delhi (Red Fort, Qutub Minar, India Gate) – Delhi" },
  { name: "Gangtok – Sikkim" },
  { name: "Goa – Goa" },
  { name: "Gokarna – Karnataka" },
  { name: "Gulmarg – Jammu & Kashmir" },
  { name: "Hampi – Karnataka" },
  { name: "Haridwar – Uttarakhand" },
  { name: "Jaipur – Rajasthan" },
  { name: "Jaisalmer – Rajasthan" },
  { name: "Jim Corbett National Park – Uttarakhand" },
  { name: "Jodhpur – Rajasthan" },
  { name: "Kaziranga National Park – Assam" },
  { name: "Kedarnath – Uttarakhand" },
  { name: "Khajuraho – Madhya Pradesh" },
  { name: "Kovalam – Kerala" },
  { name: "Lakshadweep (Agatti, Bangaram) – Lakshadweep" },
  { name: "Leh-Ladakh – Jammu & Kashmir" },
  { name: "Manali – Himachal Pradesh" },
  { name: "Munnar – Kerala" },
  { name: "Mussoorie – Uttarakhand" },
  { name: "Nainital – Uttarakhand" },
  { name: "Ooty – Tamil Nadu" },
  { name: "Periyar Wildlife Sanctuary – Kerala" },
  { name: "Pondicherry – Puducherry" },
  { name: "Pushkar – Rajasthan" },
  { name: "Ranthambore National Park – Rajasthan" },
  { name: "Rishikesh – Uttarakhand" },
  { name: "Shimla – Himachal Pradesh" },
  { name: "Shirdi – Maharashtra" },
  { name: "Sundarbans – West Bengal" },
  { name: "Taj Mahal (Agra Fort) – Uttar Pradesh" },
  { name: "Tirupati Balaji – Andhra Pradesh" },
  { name: "Udaipur – Rajasthan" },
  { name: "Vaishno Devi – Jammu & Kashmir" },
  { name: "Varanasi – Uttar Pradesh" },
  { name: "Varkala – Kerala" }
];
