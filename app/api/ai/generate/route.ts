import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { ProjectContext } from '@/types/interview';
import { DocumentTypeId } from '@/types/project';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docType, context, relatedDocs } = body as {
      docType: DocumentTypeId;
      context: ProjectContext;
      relatedDocs?: Partial<Record<DocumentTypeId, string>>;
    };

    if (!docType || !context) {
      return NextResponse.json(
        { error: 'Missing docType or context parameter' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const content = await provider.generateDocument(docType, context, relatedDocs);

    return NextResponse.json({ docType, content });
  } catch (error: any) {
    console.error('Error in /api/ai/generate:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate document' },
      { status: 500 }
    );
  }
}

