"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'

interface Service {
  _id: string;
  name: string;
  type: string;
  phone: string;
  image: string;
  price: number;
  destination: string;
  address: string;
  available: boolean;
  createdAt: string;
}

export default function ViewServicesPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    phone: "",
    price: "",
    destination: "",
    address: "",
  });

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
    } catch (e) {
      setError('Error fetching services');
      console.log(e);
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
      console.log(err);
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
      console.log(err);
      setError('Error updating service');
    }
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setEditForm({
      name: service.name,
      type: service.type,
      phone: service.phone,
      price: service.price.toString(),
      destination: service.destination,
      address: service.address,
    });
    setIsEditOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEditedService = async () => {
    if (!editingService) return;

    try {
      const response = await fetch("/api/services/view", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: editingService._id,
          updates: {
            ...editForm,
            price: Number(editForm.price),
          },
        }),
      });

      if (response.ok) {
        setServices(
          services.map((s) =>
            s._id === editingService._id
              ? { ...s, ...editForm, price: Number(editForm.price) }
              : s
          )
        );
        setIsEditOpen(false);
      } else {
        alert("Failed to update service");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating service");
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
      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <div className="space-y-3">
              <div>
                <label>Hotel Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Service Name"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Contact No.</label>
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Price Per Day</label>
                <input
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Destination</label>
                <textarea
                  name="destination"
                  value={editForm.destination}
                  onChange={handleEditChange}
                  placeholder="Destination"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  placeholder="address"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveEditedService}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* view page */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-orange-500 underline font-bold">My Services</h1>
        <Link href="/addservice">
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
            <Link href="/addservice">
              <Button>Add Your First Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="flex gap-6 flex-col">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow ">
              <div className='flex gap-2'>
                <div className='px-2'>
                  <Image
                    alt='image'
                    src={service.image}
                    width={250}
                    height={400}
                  ></Image>
                </div>
                <div className='flex-1'>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg uppercase">{service.name}</CardTitle>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {service.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className=''> Type: {service.type}</p>
                      <p>Address: {service.address}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      Destination: {service.destination}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      Contact NO. :  {service.phone}
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
                        onClick={() => toggleAvailability(service._id, service.available)}
                        className="flex-1"
                      >
                        {service.available ? 'Make Unavailable' : 'Make Available'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(service)}
                        className="flex-1"
                      > Edit 
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteService(service._id)}
                        className="text-red-600 hover:text-red-700"
                      > Delete 
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div >
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
