import { DocumentTypeId } from '@/types/project';
import { ProjectContext, InterviewQuestion, InterviewSession, AIAssumption } from '@/types/interview';
import { Language } from '@/lib/i18n/dictionaries';

export interface NextQuestionResult {
  question: InterviewQuestion | null;
  isComplete: boolean;
  updatedContext: ProjectContext;
  assumptions: AIAssumption[];
}

export interface ConsistencyIssue {
  docTypeA: DocumentTypeId;
  docTypeB: DocumentTypeId;
  topic: string;
  conflictDescription: string;
  recommendedResolution: string;
}

export interface ConsistencyReport {
  isConsistent: boolean;
  score: number;
  issues: ConsistencyIssue[];
}

export interface AIProvider {
  askNextQuestion(
    session: InterviewSession,
    selectedDocTypes: DocumentTypeId[],
    language?: Language
  ): Promise<NextQuestionResult>;
  generateDocument(
    docType: DocumentTypeId,
    context: ProjectContext,
    relatedDocs?: Partial<Record<DocumentTypeId, string>>,
    language?: Language
  ): Promise<string>;
  regenerateWithFeedback(
    docType: DocumentTypeId,
    currentContent: string,
    feedback: string,
    context: ProjectContext,
    language?: Language
  ): Promise<string>;
  validateConsistency(
    documents: Partial<Record<DocumentTypeId, string>>,
    language?: Language
  ): Promise<ConsistencyReport>;
}

