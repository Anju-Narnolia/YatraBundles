import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/service';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is a service provider
    if (!['hotel_owner', 'driver', 'guide'].includes(session.user.role || '')) {
      return NextResponse.json({ error: 'Only service providers can add services' }, { status: 403 });
    }

    await dbConnect();

    const body = await request.json();
    const { name, type, specialization, price, description, location, amenities, images } = body;

    // Validate required fields
    if (!name || !type || !specialization || !price || !description || !location) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Create new service
    const service = new Service({
      name,
      type,
      specialization,
      price: Number(price),
      description,
      location,
      amenities: amenities || [],
      images: images || [],
      providerId: session.user.id,
    });

    await service.save();

    return NextResponse.json({ 
      message: 'Service added successfully',
      service: {
        id: service._id,
        name: service.name,
        type: service.type,
        specialization: service.specialization,
        price: service.price,
        description: service.description,
        location: service.location,
        amenities: service.amenities,
        images: service.images,
        isAvailable: service.isAvailable,
        createdAt: service.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const services = await Service.find({ isAvailable: true })
      .populate('providerId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
