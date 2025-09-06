"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import Link from 'next/link';

interface Service {
  _id: string;
  name: string;
  type: string;
  specialization: string;
  price: number;
  description: string;
  location: string;
  isAvailable: boolean;
  createdAt: string;
}

export default function ViewServicesPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      fetchServices();
    }
  }, [session]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services/view');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services);
      } else {
        setError('Failed to fetch services');
      }
    } catch (err) {
      setError('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/view?id=${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(service => service._id !== serviceId));
      } else {
        setError('Failed to delete service');
      }
    } catch (err) {
      setError('Error deleting service');
    }
  };

  const toggleAvailability = async (serviceId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/services/view', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          updates: { isAvailable: !currentStatus }
        }),
      });

      if (response.ok) {
        setServices(services.map(service => 
          service._id === serviceId 
            ? { ...service, isAvailable: !currentStatus }
            : service
        ));
      } else {
        setError('Failed to update service');
      }
    } catch (err) {
      setError('Error updating service');
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your services</h1>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Services</h1>
        <Link href="/services/addservice">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Service
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {services.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No services yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first service to help travelers discover what you offer.
            </p>
            <Link href="/services/addservice">
              <Button>Add Your First Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{service.type} • {service.specialization}</p>
                  <p>{service.location}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">${service.price}/day</span>
                  <span className="text-xs text-muted-foreground">
                    Added {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAvailability(service._id, service.isAvailable)}
                    className="flex-1"
                  >
                    {service.isAvailable ? 'Make Unavailable' : 'Make Available'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteService(service._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
