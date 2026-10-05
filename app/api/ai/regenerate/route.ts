import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { ProjectContext } from '@/types/interview';
import { DocumentTypeId } from '@/types/project';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docType, currentContent, feedback, context } = body as {
      docType: DocumentTypeId;
      currentContent: string;
      feedback: string;
      context: ProjectContext;
    };

    if (!docType || !currentContent || !feedback || !context) {
      return NextResponse.json(
        { error: 'Missing required parameters for regeneration' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const content = await provider.regenerateWithFeedback(docType, currentContent, feedback, context);

    return NextResponse.json({ docType, content });
  } catch (error: any) {
    console.error('Error in /api/ai/regenerate:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to regenerate document' },
      { status: 500 }
    );
  }
}

