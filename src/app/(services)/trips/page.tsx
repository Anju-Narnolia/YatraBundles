import Image from 'next/image';
import { myTrips } from '@/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Edit, Trash2 } from 'lucide-react';

export default function MyTripsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">My Trips</h1>
            <p className="text-lg text-muted-foreground mt-2">View and manage your upcoming and past adventures.</p>
        </div>

        <div className="space-y-8">
          {myTrips.map((trip) => {
            // const Icon = trip.services[0].icon;
            return (
            <Card key={trip.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
              <div className="relative h-56 md:h-auto md:w-1/3">
                <Image
                  src={trip.image}
                  alt={trip.destination}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={trip.aiHint}
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-headline">{trip.destination}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{trip.dates}</span>
                        </div>
                    </div>
                    <Badge variant={trip.status === 'Confirmed' ? 'default' : 'secondary'} className="capitalize bg-primary/20 text-primary-foreground">
                      {trip.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Booked Services:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {trip.services.map((service, index) => {
                        const ServiceIcon = service.icon;
                        return (
                            <li key={index} className="flex items-center">
                                <ServiceIcon className="w-4 h-4 mr-2 text-primary" />
                                <strong>{service.type}:</strong><span className="ml-2">{service.name}</span>
                            </li>
                        )
                    })}
                  </ul>
                  <div className="flex items-center mt-4 font-bold text-lg">
                    <DollarSign className="w-5 h-5 mr-2 text-primary" />
                    <span>Total Cost: ${trip.cost.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/> Modify</Button>
                  <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/> Cancel</Button>
                </CardFooter>
              </div>
            </Card>
          )})}
        </div>
      </div>
    </div>
  );
}
