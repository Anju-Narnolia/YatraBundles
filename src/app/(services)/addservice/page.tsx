'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, BedDouble, User, Car } from 'lucide-react';
import { destinationsData } from '@/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

type ServiceType = 'hotel' | 'guide' | 'driver';

export default function AddServicePage() {
  const [destination, setDestination] = useState('');
  const [destinationSlug, setDestinationSlug] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('hotel');
  const [phone, setPhone] = useState('');
  const [available, setAvailable] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('destination', destination);
      formData.append('destinationSlug', destinationSlug);
      formData.append('serviceType', serviceType);
      formData.append('phone', phone);
      formData.append('available', available);
      formData.append('hotelName', hotelName);
      formData.append('name', name);
      formData.append('address', address);
      formData.append('price', price);
      formData.append('gender', gender);
      formData.append('vehicle', vehicle);
      formData.append('image', file);

      const response = await fetch('/api/services/add', {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Service added successfully:", data);
        alert("Service added successfully!");
        resetForm();
      } else {
        console.error("❌ Failed to add service");
        alert("Failed to add service. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Error adding service:", error);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;
    setFile(imageFile);
    setPreview(URL.createObjectURL(imageFile));
  };

  const resetForm = () => {
    setDestination('');
    setDestinationSlug('');
    setServiceType('hotel');
    setPhone('');
    setAvailable('');
    setHotelName('');
    setName('');
    setAddress('');
    setPrice('');
    setGender('');
    setVehicle('');
    setFile(null);
    setPreview(null);
  };

  const renderServiceForm = () => {
    switch (serviceType) {
      case 'hotel':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="hotel-name">Hotel Name</Label>
              <Input id="hotel-name" placeholder="e.g., The Grand Palace"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel-address">Address</Label>
              <Input id="hotel-address" placeholder="e.g., 123 Main St, City"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel-price">Price per night</Label>
              <Input id="hotel-price" type="number" placeholder="e.g., 150"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </>
        );

      case 'guide':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="guide-name">Guide Name</Label>
              <Input id="guide-name" placeholder="e.g., John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex items-center gap-4">
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
              <Input id="guide-price" type="number" placeholder="e.g., 100"
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            </div>
          </>
        );

      case 'driver':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="driver-name">Driver Name</Label>
              <Input id="driver-name" placeholder="e.g., Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex items-center gap-4">
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
              <Select onValueChange={setVehicle} value={vehicle}>
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
              <Input id="driving-price" type="number" placeholder="e.g., 150"
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-orange-500 underline font-bold">List a New Service</h1>
          <Link href="/view-service">
            <Button className="flex items-center gap-2">
              View Your Services
            </Button>
          </Link>
        </div>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline"></CardTitle>
            <CardDescription>Fill out the details below to add your service to RoamEase.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select onValueChange={(value) => {
                    // Find the destination object from your data
                    const selected = destinationsData.find((d) => d.name === value);
                    setDestination(value);
                    setDestinationSlug(selected?.slug || ""); 
                  }}
                    value={destination}>
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
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select onValueChange={(value: ServiceType) => setServiceType(value)} value={serviceType}>
                    <SelectTrigger id="serviceType">
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

                  <div className="space-y-2">
                    <Label htmlFor='phone'>Phone No.</Label>
                    <Input id="phone" placeholder="e.g., +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor='available'>Available Now</Label>
                    <Select onValueChange={setAvailable} value={available}>
                      <SelectTrigger id="available">
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
                      <label htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-accent transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">High-quality PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" onChange={handleFile} />
                      </label>
                      {preview && (
                        <Image alt="Preview" src={preview} width={100} height={100} className="ml-4 rounded-md object-cover" />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className='cursor-pointer'>Add Service</Button>
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
