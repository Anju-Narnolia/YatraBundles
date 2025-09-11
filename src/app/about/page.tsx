
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Handshake, Heart, ShieldCheck, Gem } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CountUp from 'react-countup';

const values = [
  {
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: 'Local Empowerment',
    description: 'We partner with local guides and businesses to enrich your travel and their communities.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Verified Quality',
    description: 'Every stay, ride, and guide is vetted to meet our uncompromising quality standards.',
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: 'Spiritual Focus',
    description: 'Our journeys are designed to be more than just travel; they are paths to discovery.',
  },
    {
    icon: <Gem className="w-10 h-10 text-primary" />,
    title: 'Transparency',
    description: 'Clear, upfront pricing with no hidden fees, for a journey you can trust.',
  },
];

const team = [
  { name: 'Alex Johnson', title: 'Founder & CEO', image: 'https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture-1024x1024.jpg', aiHint: 'smiling person' },
  { name: 'Maria Garcia', title: 'Head of Operations', image: 'https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture-1024x1024.jpg', aiHint: 'professional woman' },
  { name: 'Sam Lee', title: 'Lead Developer', image: 'https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture-1024x1024.jpg', aiHint: 'tech person' },
];

const stats = [
    { name: 'Destinations', value: 50 },
    { name: 'Verified Stays', value: 300 },
    { name: 'Happy Travelers', value: 10000 },
    { name: 'Local Guides', value: 200 },
];

const StatCounter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref}>
            {isInView ? <CountUp end={end} duration={duration} separator="," /> : '0'}
        </div>
    );
};


export default function AboutPage() {
    const sectionRef = useRef(null);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center text-white">
                <Image
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1920&q=80"
                    alt="Pilgrimage crowd at a temple"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[0.6]"
                    priority
                    data-ai-hint="pilgrimage crowd"
                />
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="relative z-10 text-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">About RoamEase</h1>
                    <p className="mt-4 max-w-xl text-lg">
                        We curate seamless, luxury travel bundles, handling every detail of your journey so you can focus on the experience, not the logistics.
                    </p>
                </motion.div>
            </section>

            {/* Story & Mission Section */}
            <motion.section
                ref={sectionRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                className="py-20 px-5 container mx-auto"
            >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Born out of our own travel pain-points.</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                We experienced firsthand the complexities of planning meaningful trips—juggling bookings for stays, transport, and reliable guides felt overwhelming and disconnected. It detracted from the very peace we sought.
                            </p>
                            <p>
                                RoamEase was created to solve this. We envisioned a single platform where every element of a luxury journey is meticulously curated and bundled together, offering a seamless, high-quality experience from start to finish.
                            </p>
                            <p>
                                Today, we empower travelers to embark on extraordinary adventures with confidence and ease, creating lasting memories while supporting local economies and preserving the authenticity of each destination.
                            </p>
                        </div>
                    </div>
                    <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1920&q=80"
                            alt="Serene temple"
                            layout="fill"
                            objectFit="cover"
                            loading="lazy"
                            data-ai-hint="serene temple"
                        />
                    </div>
                </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="py-20 px-5 bg-card"
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div key={index} custom={index} variants={fadeIn}>
                                <Card className="p-8 text-center bg-background rounded-2xl hover:shadow-xl transition-shadow h-full">
                                    <div className="flex justify-center mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-bold font-headline mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* How We Curate Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                className="py-20 px-5 container mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16">How We Curate Your Perfect Trip</h2>
                <div className="relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-border" aria-hidden="true" />
                    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        {[
                            { title: 'Selection', description: 'We handpick top-tier accommodations and experienced local partners at each destination.' },
                            { title: 'Verification', description: 'Our team rigorously vets every service to ensure it meets our strict quality standards.' },
                            { title: 'Bundle', description: 'We assemble seamless packages that combine stays, transport, and guided experiences.' },
                            { title: 'Deliver', description: 'You receive a perfectly planned itinerary, ready for you to enjoy a hassle-free journey.' },
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="z-10 bg-background flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary text-primary font-bold text-lg mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                className="py-20 px-5 bg-card"
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-12">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        {team.map((member, index) => (
                            <motion.div key={index} custom={index} variants={fadeIn} className="flex flex-col items-center">
                                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.aiHint}/>
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-primary">{member.title}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

             {/* Stats Bar Section */}
            <section className="py-20 px-5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
                        {stats.map((stat, index) => (
                            <motion.div key={index} custom={index} variants={fadeIn} className="flex flex-col items-center">
                                <h3 className="text-3xl md:text-5xl font-bold text-primary flex items-center gap-2">
                                     <StatCounter end={stat.value} /><span className="">+</span> 
                                </h3>
                                <p className="text-muted-foreground mt-2">{stat.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
                className="py-20 px-5 text-center text-white bg-gradient-to-r from-primary to-accent"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to explore?</h2>
                <p className="max-w-2xl mx-auto mb-8">Let us handle the details. Your next unforgettable journey is just a click away.</p>
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                    <Link href="#featured-destinations">Browse Bundles</Link>
                </Button>
            </motion.section>
        </div>
    );
}

// // A simple CountUp component to avoid adding a new dependency for this one feature
// const CountUpClient = ({ end, duration = 2 }: { end: number, duration: number }) => {
//     const [count, setCount] = useState(0);
//     const frameRate = 1000 / 60;
//     const totalFrames = Math.round(duration * 1000 / frameRate);
    
//     useEffect(() => {
//         let frame = 0;
//         const counter = setInterval(() => {
//             frame++;
//             const progress = frame / totalFrames;
//             setCount(end * progress);

//             if (frame === totalFrames) {
//                 clearInterval(counter);
//                 setCount(end);
//             }
//         }, frameRate);

//         return () => clearInterval(counter);
//     }, [end, duration, frameRate, totalFrames]);

//     return <span>{Math.floor(count).toLocaleString()}</span>;
// };
