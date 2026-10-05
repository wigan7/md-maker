import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { InterviewSession } from '@/types/interview';
import { DocumentTypeId } from '@/types/project';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session, selectedDocTypes } = body as {
      session: InterviewSession;
      selectedDocTypes: DocumentTypeId[];
    };

    if (!session || !selectedDocTypes) {
      return NextResponse.json(
        { error: 'Missing session or selectedDocTypes parameters' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.askNextQuestion(session, selectedDocTypes);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/interview:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process interview step' },
      { status: 500 }
    );
  }
}

