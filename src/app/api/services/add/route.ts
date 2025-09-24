import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/service';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting service add request...');
    
    const session = (await getServerSession(authOptions)) as Session | null;
    console.log('📝 Session:', session);
    
    const userId = session?.user?.id ?? null;
    console.log('👤 User ID:', userId);

    if (!session || !userId) {
      console.log('❌ No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = session.user?.role || '';
    console.log('🎭 User role:', userRole);
    
    if (!['hotel_owner', 'driver', 'guide'].includes(userRole)) {
      console.log('❌ Invalid user role');
      return NextResponse.json(
        { error: 'Only service providers can add services' },
        { status: 403 }
      );
    }
  
    
    console.log('🔌 Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected');

    const formData = await request.formData();

    const destination = formData.get('destination') as string;
    const destinationSlug = formData.get('destinationSlug') as string;
    const serviceType = formData.get('serviceType') as string;
    const phone = formData.get('phone') as string;
    const available = formData.get('available') as string;
    const hotelName = formData.get('hotelName') as string;
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const price = formData.get('price') as string;
    const gender = formData.get('gender') as string;
    const vehicle = formData.get('vehicle') as string;
    const file = formData.get('image') as File | null;
   

    console.log('📋 Form data received:', {
      destination,destinationSlug, serviceType, phone, available, hotelName, name, address, price, gender, vehicle, hasFile: !!file
    });

    if (!destination||!destinationSlug || !serviceType || !phone || !available) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = '';
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public/uploads');
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`; // accessible via public folder
    }

    console.log('🏗️ Creating service object...');
    const service = new Service({
      name: serviceType === 'hotel' ? hotelName : name,
      type: serviceType,
      price: Number(price),
      destination,
      destinationSlug,
      phone,
      available: available === 'yes',
      address,
      image: imageUrl,
      providerId: userId,
    });
    if (vehicle && vehicle.trim() !== '') {
      service.vehicle = vehicle;
    }
    if (gender && gender.trim() !== '') {
      service.gender = gender;
    }

    console.log('💾 Saving service to database...');
    await service.save();
    console.log('✅ Service saved successfully');

    return NextResponse.json(
      {
        message: 'Service added successfully',
        service: {
          id: service._id,
          name: service.name,
          type: service.type,
          destination: service.destination,
          destinationSlug: service.destinationSlug,
          price: service.price,
          phone: service.phone,
          available: service.available,
          address: service.address,
          gender: service.gender,
          vehicle: service.vehicle,
          image: service.image,
          createdAt: service.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const services = await Service.find({ available: true })
      .populate('providerId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
