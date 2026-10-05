import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';
import { DocumentTypeId } from '@/types/project';
import { Language } from '@/lib/i18n/dictionaries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documents, language = 'id' } = body as {
      documents: Partial<Record<DocumentTypeId, string>>;
      language?: Language;
    };

    if (!documents) {
      return NextResponse.json(
        { error: 'Missing documents parameter' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const report = await provider.validateConsistency(documents, language);

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Error in /api/ai/validate:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to validate consistency' },
      { status: 500 }
    );
  }
}

