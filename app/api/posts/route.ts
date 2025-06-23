import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Post from '@/models/Post';
import connectDB from '../../../config/database';

// Create a new post
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
    const { content, platforms, topic, tone } = body;

    if (!content || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json({ 
        error: 'Missing required fields: content, platforms (array)' 
      }, { status: 400 });
    }

    const post = new Post({
      user: userId,
      content,
      platforms,
      topic: topic || '',
      tone: tone || '',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedPost = await post.save();

    return NextResponse.json({
      message: 'Post created successfully',
      post: savedPost
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post' 
    }, { status: 500 });
  }
}

// Get user's posts
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
    const status = searchParams.get('status');

    const query: Record<string, unknown> = { user: userId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch posts' 
    }, { status: 500 });
  }
}
