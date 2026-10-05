import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { InterviewSession } from '@/types/interview';
import { DocumentTypeId } from '@/types/project';
import { Language } from '@/lib/i18n/dictionaries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session, selectedDocTypes, language = 'id' } = body as {
      session: InterviewSession;
      selectedDocTypes: DocumentTypeId[];
      language?: Language;
    };

    if (!session || !selectedDocTypes) {
      return NextResponse.json(
        { error: 'Missing session or selectedDocTypes parameters' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.askNextQuestion(session, selectedDocTypes, language);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/interview:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process interview step' },
      { status: 500 }
    );
  }
}

