import { NextRequest, NextResponse } from 'next/server';
import SocialConnection from '@/models/SocialConnection';
import { verify } from 'jsonwebtoken';

// Connect social media account
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId;

    const body = await request.json();
    const { platform, accessToken, platformAccountId, platformAccountName, metadata } = body;

    if (!platform || !accessToken || !platformAccountId || !platformAccountName) {
      return NextResponse.json({ 
        error: 'Missing required fields: platform, accessToken, platformAccountId, platformAccountName' 
      }, { status: 400 });
    }

    // Check if connection already exists
    const existingConnection = await SocialConnection.findOne({
      user: userId,
      platform,
    });

    if (existingConnection) {
      // Update existing connection
      existingConnection.accessToken = accessToken;
      existingConnection.platformAccountId = platformAccountId;
      existingConnection.platformAccountName = platformAccountName;
      existingConnection.metadata = metadata || {};
      existingConnection.isActive = true;
      await existingConnection.save();

      return NextResponse.json({
        message: 'Social media account updated successfully',
        connection: existingConnection,
      });
    } else {
      // Create new connection
      const connection = new SocialConnection({
        user: userId,
        platform,
        accessToken,
        platformAccountId,
        platformAccountName,
        metadata: metadata || {},
        isActive: true,
      });

      await connection.save();

      return NextResponse.json({
        message: 'Social media account connected successfully',
        connection,
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error connecting social media account:', error);
    return NextResponse.json({ 
      error: 'Failed to connect social media account' 
    }, { status: 500 });
  }
}

// Get user's social media connections
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId;

    const connections = await SocialConnection.find({ 
      user: userId,
      isActive: true 
    }).select('-accessToken -refreshToken'); // Don't send sensitive tokens

    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Error fetching social media connections:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch social media connections' 
    }, { status: 500 });
  }
}

// Disconnect social media account
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId;

    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');

    if (!platform) {
      return NextResponse.json({ 
        error: 'Platform parameter is required' 
      }, { status: 400 });
    }

    const connection = await SocialConnection.findOneAndUpdate(
      { user: userId, platform },
      { isActive: false },
      { new: true }
    );

    if (!connection) {
      return NextResponse.json({ 
        error: 'Connection not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Social media account disconnected successfully',
    });
  } catch (error) {
    console.error('Error disconnecting social media account:', error);
    return NextResponse.json({ 
      error: 'Failed to disconnect social media account' 
    }, { status: 500 });
  }
}
