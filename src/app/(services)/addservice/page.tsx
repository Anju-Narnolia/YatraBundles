
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, BedDouble, User, Car } from 'lucide-react';
import { destinationsData } from '@/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type ServiceType = 'hotel' | 'guide' | 'driver' | '';

export default function AddServicePage() {
  const [destination, setDestination] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('hotel');

  const renderServiceForm = () => {
    switch (serviceType) {
      case 'hotel':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="hotel-name">Hotel Name</Label>
              <Input id="hotel-name" placeholder="e.g., The Grand Palace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel-address">Address</Label>
              <Input id="hotel-address" placeholder="e.g., 123 Main St, City" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel-price">Price per night</Label>
              <Input id="hotel-price" type="number" placeholder="e.g., 150" />
            </div>
          </>
        );
      case 'guide':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="guide-name">Guide Name</Label>
              <Input id="guide-name" placeholder="e.g., John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guide-price">Price per day</Label>
              <Input id="guide-price" type="number" placeholder="e.g., 100" />
            </div>
          </>
        );
      case 'driver':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="driver-name">Driver Name</Label>
              <Input id="driver-name" placeholder="e.g., Jane Smith" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-type">Vehicle Type</Label>
              <Select>
                <SelectTrigger id="vehicle-type">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="auto">Auto Rickshaw</SelectItem>
                  <SelectItem value="bike">Motorbike</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="driving-price">Price per day</Label>
              <Input id="driving-price" type="number" placeholder="e.g., 150" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  function handelSubmit() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">List a New Service</CardTitle>
            <CardDescription>Fill out the details below to add your service to RoamEase.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handelSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select onValueChange={setDestination} value={destination}>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinationsData.map(d => (
                        <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select onValueChange={(value: ServiceType) => setServiceType(value)} value={serviceType}>
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel"><BedDouble className="inline-block mr-2 h-4 w-4" />Hotel</SelectItem>
                      <SelectItem value="guide"><User className="inline-block mr-2 h-4 w-4" />Guide</SelectItem>
                      <SelectItem value="driver"><Car className="inline-block mr-2 h-4 w-4" />Driver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {serviceType && (
                <div className="space-y-6 pt-4 border-t">
                  {renderServiceForm()}
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone No.</Label>
                    <Input id="phone" placeholder="e.g., +91 9876543210" />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='available'>Available Now</Label>
                    <Select>
                      <SelectTrigger id="available now">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Photo</Label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-accent transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">High-quality PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg">Add Service</Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
