import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/service';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is a service provider
    if (!['hotel_owner', 'driver', 'guide'].includes(session.user.role || '')) {
      return NextResponse.json({ error: 'Only service providers can view their services' }, { status: 403 });
    }

    await dbConnect();

    // Get services for the logged-in provider
    const services = await Service.find({ providerId: session.user.id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ services });

  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { serviceId, updates } = body;

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // Find and update the service (only if owned by the user)
    const service = await Service.findOneAndUpdate(
      { _id: serviceId, providerId: session.user.id },
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );

    if (!service) {
      return NextResponse.json({ error: 'Service not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Service updated successfully',
      service 
    });

  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('id');

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // Delete the service (only if owned by the user)
    const service = await Service.findOneAndDelete({
      _id: serviceId,
      providerId: session.user.id
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Service deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
