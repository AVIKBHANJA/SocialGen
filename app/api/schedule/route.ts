import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/Post';
import schedulingService from '@/utils/schedulingService';
import { verify } from 'jsonwebtoken';

// Schedule a post
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const body = await request.json();
    const { postId, platforms, scheduledFor } = body;

    if (!postId || !platforms || !scheduledFor || !Array.isArray(platforms)) {
      return NextResponse.json({ 
        error: 'Missing required fields: postId, platforms (array), scheduledFor' 
      }, { status: 400 });
    }

    // Validate that the post belongs to the user
    const post = await Post.findOne({ _id: postId, user: userId });
    if (!post) {
      return NextResponse.json({ 
        error: 'Post not found or access denied' 
      }, { status: 404 });
    }

    // Validate schedule time is in the future
    const scheduleDate = new Date(scheduledFor);
    if (scheduleDate <= new Date()) {
      return NextResponse.json({ 
        error: 'Schedule time must be in the future' 
      }, { status: 400 });
    }

    // Create scheduled post
    const scheduledPost = await schedulingService.createScheduledPost(
      userId,
      postId,
      platforms,
      scheduledFor
    );

    // Update post status
    post.status = 'scheduled';
    post.scheduledFor = scheduleDate;
    await post.save();

    return NextResponse.json({
      message: 'Post scheduled successfully',
      scheduledPost,
    }, { status: 201 });
  } catch (error) {
    console.error('Error scheduling post:', error);
    return NextResponse.json({ 
      error: 'Failed to schedule post' 
    }, { status: 500 });
  }
}

// Get user's scheduled posts
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const scheduledPosts = await (schedulingService as { getUserScheduledPosts: (userId: string, status?: string | null) => Promise<unknown> }).getUserScheduledPosts(
      userId,
      status
    );

    return NextResponse.json({ scheduledPosts });
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch scheduled posts' 
    }, { status: 500 });
  }
}
