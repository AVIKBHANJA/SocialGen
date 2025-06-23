import { NextRequest, NextResponse } from 'next/server';
import schedulingService from '@/utils/schedulingService';
import { verify } from 'jsonwebtoken';

// Cancel a scheduled post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const { id: scheduledPostId } = await params;

    // Verify the scheduled post belongs to the user
    const userScheduledPosts = await (schedulingService as { getUserScheduledPosts: (userId: string) => Promise<Array<{ _id: { toString: () => string } }>> }).getUserScheduledPosts(userId);
    const scheduledPost = userScheduledPosts.find((post: { _id: { toString: () => string } }) => 
      post._id.toString() === scheduledPostId
    );

    if (!scheduledPost) {
      return NextResponse.json({ 
        error: 'Scheduled post not found or access denied' 
      }, { status: 404 });
    }

    // Cancel the scheduled post
    const cancelledPost = await (schedulingService as { cancelScheduledPost: (id: string) => Promise<unknown> }).cancelScheduledPost(scheduledPostId);

    return NextResponse.json({
      message: 'Scheduled post cancelled successfully',
      scheduledPost: cancelledPost,
    });
  } catch (error) {
    console.error('Error cancelling scheduled post:', error);
    return NextResponse.json({ 
      error: 'Failed to cancel scheduled post' 
    }, { status: 500 });
  }
}
