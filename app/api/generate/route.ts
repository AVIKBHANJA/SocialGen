import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { generateContent } from '@/utils/gemini';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });    }

    const token = authHeader.substring(7);
    verify(token, process.env.JWT_SECRET!); // Just verify the token, don't need userId for this endpoint

    const body = await request.json();
    const { topic, tone, platforms, keywords, audience } = body;

    if (!topic || !tone || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json({ 
        error: 'Missing required fields: topic, tone, platforms (array)' 
      }, { status: 400 });
    }

    // Generate content for the first platform (could be extended for multiple platforms)
    const platform = platforms[0];
    const content = await generateContent(
      platform,
      topic,
      audience || 'general',
      tone,
      keywords ? keywords.join(', ') : undefined
    );

    return NextResponse.json({
      content,
      platforms,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ 
      error: 'Failed to generate content' 
    }, { status: 500 });
  }
}
