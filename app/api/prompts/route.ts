import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Prompt from '@/models/Prompt';
import connectDB from '../../../config/database';

// Create a new prompt
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const body = await request.json();
    const { title, content, category, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, content' 
      }, { status: 400 });
    }

    const prompt = new Prompt({
      user: userId,
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedPrompt = await prompt.save();

    return NextResponse.json({
      message: 'Prompt created successfully',
      prompt: savedPrompt
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ 
      error: 'Failed to create prompt' 
    }, { status: 500 });
  }
}

// Get user's prompts
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');

    const query: Record<string, unknown> = { user: userId };
    if (category && category !== 'all') {
      query.category = category;
    }

    const prompts = await Prompt.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Prompt.countDocuments(query);

    return NextResponse.json({
      prompts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch prompts' 
    }, { status: 500 });
  }
}
