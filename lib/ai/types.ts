import { DocumentTypeId } from '@/types/project';
import { ProjectContext, InterviewQuestion, InterviewSession, AIAssumption } from '@/types/interview';

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
  askNextQuestion(session: InterviewSession, selectedDocTypes: DocumentTypeId[]): Promise<NextQuestionResult>;
  generateDocument(
    docType: DocumentTypeId,
    context: ProjectContext,
    relatedDocs?: Partial<Record<DocumentTypeId, string>>
  ): Promise<string>;
  regenerateWithFeedback(
    docType: DocumentTypeId,
    currentContent: string,
    feedback: string,
    context: ProjectContext
  ): Promise<string>;
  validateConsistency(documents: Partial<Record<DocumentTypeId, string>>): Promise<ConsistencyReport>;
}

