# 🕉️ YatraBundle - Your AI-Powered Spiritual Travel Companion

> **A revolutionary full-stack travel platform** that combines cutting-edge technology with spiritual wisdom to create personalized pilgrimage experiences. Built with Next.js, MongoDB, AI integration, and advanced booking systems to revolutionize how travelers discover and book spiritual journeys across India's sacred destinations.

## 🌟 **Platform Overview**

> Experience sacred destinations with our all-inclusive pilgrimage bundles. We handle the details, so you can focus on your spiritual path.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.17.2-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)

## 🌟 Features

### ✨ For Pilgrims & Travelers
- **Verified Stays**: Hand-picked dharamshalas, homestays & hotels with real photos & reviews
- **Trusted Transport**: Pre-priced cabs & bikes—airport pickup to local darshan circuits  
- **Expert Guides**: Government-licensed storytellers or premium audio guides in Hindi & English
- **Curated Destinations**: Explore sacred places like Ram Mandir, Varanasi, Kedarnath, and more
- **All-in-One Bundles**: Complete packages including accommodation, transport, and guidance

### 🏢 For Service Providers
- **Easy Registration**: Simple onboarding for hotels, drivers, and guides
- **Service Management**: Add and manage your services with real-time availability
- **Booking System**: Integrated booking management with Razorpay payments
- **Profile Dashboard**: Track bookings, earnings, and customer feedback

### 🔐 Authentication & Security
- **Multi-role Authentication**: Separate login systems for users and service providers
- **Secure Payments**: Razorpay integration for safe transactions
- **Data Protection**: Bcrypt password hashing and secure session management

## 🚀 Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - NoSQL database with Mongoose ODM
- **NextAuth.js** - Authentication and session management
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization

### Payment & Services
- **Razorpay** - Payment gateway integration
- **Cloudinary** - Image management and CDN

## 📁 Project Structure

```
YatraBundle/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/         # User login page
│   │   │   └── signup/        # User registration
│   │   ├── (services)/        # Service management
│   │   │   ├── addservice/    # Add new services
│   │   │   ├── trips/         # User trip management
│   │   │   └── view-service/  # Service listings
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/          # Authentication APIs
│   │   │   └── services/      # Service management APIs
│   │   ├── bookservice/       # Booking system
│   │   ├── bundles/           # Travel bundles
│   │   ├── destinations/      # Destination pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utility libraries
│   ├── models/                # MongoDB schemas
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image storage)
- Razorpay account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/YatraBundle.git
cd YatraBundle
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

### For Travelers
1. **Sign Up**: Create an account with your email and password
2. **Browse Destinations**: Explore sacred destinations like Ayodhya, Varanasi, Kedarnath
3. **View Services**: Check available hotels, drivers, and guides for each destination
4. **Book Services**: Select and book individual services or complete bundles
5. **Manage Trips**: Track your bookings and trip history

### For Service Providers
1. **Register**: Sign up as a service provider (hotel, driver, or guide)
2. **Add Services**: Create listings for your services with photos and details
3. **Manage Bookings**: Handle customer bookings and payments
4. **Update Availability**: Keep your service availability current

## 🗺️ Destinations

Our platform covers major spiritual destinations across India:

- **Temples**: Ram Mandir (Ayodhya), Golden Temple (Amritsar), Tirupati Balaji
- **Sacred Cities**: Varanasi, Haridwar, Rishikesh, Pushkar
- **Pilgrimage Sites**: Kedarnath, Badrinath, Vaishno Devi, Shirdi
- **Cultural Heritage**: Taj Mahal, Ajanta & Ellora Caves, Hampi
- **Natural Wonders**: Andaman & Nicobar, Kerala Backwaters, Leh-Ladakh

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current session

### Services
- `GET /api/services/view` - List all services
- `POST /api/services/add` - Add new service
- `GET /api/services/by-destination` - Get services by destination
- `POST /api/services/booking` - Create booking

### Destinations
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/[slug]` - Get destination details

## 🎨 UI Components

The project uses a comprehensive design system built with:

- **Radix UI Primitives**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Feature cards, hero sections, navigation
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Built-in theme switching

## 🚀 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment with MongoDB
- **DigitalOcean**: VPS deployment with Docker

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **MongoDB** for the database solution
- **Razorpay** for payment processing

## 📞 Support

For support, email support@yatrabundle.com or join our Discord community.

## 🔗 Links

- **Website**: [https://yatrabundle.com](https://yatrabundle.com)
- **Documentation**: [https://docs.yatrabundle.com](https://docs.yatrabundle.com)
- **API Reference**: [https://api.yatrabundle.com](https://api.yatrabundle.com)

---

**Made with ❤️ for spiritual travelers and service providers across India**