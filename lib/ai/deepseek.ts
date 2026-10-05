import { AIProvider, NextQuestionResult, ConsistencyReport } from './types';
import { DocumentTypeId } from '@/types/project';
import { ProjectContext, InterviewSession, InterviewQuestion, AIAssumption } from '@/types/interview';
import { DOCUMENT_REGISTRY } from '@/lib/documents/registry';

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

export class DeepSeekProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.baseUrl = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
    this.model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  }

  private async callChatCompletion(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    temperature = 0.3
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not configured in server environment variables.');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API returned error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  async askNextQuestion(session: InterviewSession, selectedDocTypes: DocumentTypeId[]): Promise<NextQuestionResult> {
    const systemPrompt = `You are an elite Senior Product Architect and Lead Software Engineer.
You are running an adaptive, intelligent requirements discovery interview for a project named "${session.context.projectName}".
Target documents requested by the user: [${selectedDocTypes.join(', ')}].

Your objectives:
1. Examine the current ProjectContext and interview history.
2. Determine if enough key information is captured across the 17 core dimensions to draft world-class, production-ready specifications for the requested documents.
3. If after 4-7 thorough questions you already understand the product vision, core users, main features, and technical constraints, set "isComplete": true.
4. If still missing critical data, produce exactly ONE next question with the most appropriate UI type:
   - "single-choice" (options array required, e.g. 3-4 options)
   - "multi-choice" (options array required, e.g. 3-5 options)
   - "yes-no"
   - "number"
   - "text"
   - "textarea"
5. Do NOT repeat questions already asked. Formulate natural, expert questions.
6. Synthesize any logical assumptions in the "assumptions" array.
7. Continuously update the structured "updatedContext" fields with whatever was learned from previous answers.

Return ONLY a valid JSON object matching this schema:
{
  "isComplete": boolean,
  "question": {
    "id": string (unique slug),
    "text": string (the question to the user in a friendly, razor-sharp architectural tone),
    "category": "Project" | "Users" | "Features" | "Design" | "Technology" | "Data" | "Clarification",
    "type": "text" | "textarea" | "single-choice" | "multi-choice" | "number" | "yes-no",
    "options": string[] (optional for choice types),
    "placeholder": string (optional for text types),
    "rationale": string (1 brief sentence explaining why this detail matters)
  } | null,
  "updatedContext": { ... full ProjectContext object ... },
  "assumptions": [
    {
      "id": string,
      "category": string,
      "text": string,
      "accepted": true,
      "explanation": string
    }
  ]
}`;

    const userPrompt = `Current Project Context:
${JSON.stringify(session.context, null, 2)}

Interview History (Step ${session.currentStep}):
${JSON.stringify(session.history, null, 2)}

Provide the next adaptive question or conclude the interview with updated context and assumptions.`;

    const rawResponse = await this.callChatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], 0.2);

    try {
      const parsed = JSON.parse(cleanJsonString(rawResponse));
      return {
        isComplete: Boolean(parsed.isComplete),
        question: parsed.question || null,
        updatedContext: parsed.updatedContext || session.context,
        assumptions: parsed.assumptions || session.assumptions || [],
      };
    } catch {
      // Fallback if parsing fails
      if (session.currentStep >= 5) {
        return {
          isComplete: true,
          question: null,
          updatedContext: session.context,
          assumptions: session.assumptions,
        };
      }
      return {
        isComplete: false,
        question: {
          id: `q-clarify-${Date.now()}`,
          text: 'What are the top 3 core features your users will interact with most frequently?',
          category: 'Features',
          type: 'textarea',
          placeholder: 'e.g. 1. Instant markdown generation\n2. Real-time preview\n3. One-click export',
          rationale: 'Clarifying the primary feature loop ensures high-fidelity specifications.',
        },
        updatedContext: session.context,
        assumptions: session.assumptions,
      };
    }
  }

  async generateDocument(
    docType: DocumentTypeId,
    context: ProjectContext,
    relatedDocs?: Partial<Record<DocumentTypeId, string>>
  ): Promise<string> {
    const definition = DOCUMENT_REGISTRY[docType];
    if (!definition) {
      throw new Error(`Unknown document type: ${docType}`);
    }

    const messages = [
      { role: 'system' as const, content: definition.systemPrompt },
      { role: 'user' as const, content: definition.userPromptTemplate(context, relatedDocs) },
    ];

    const content = await this.callChatCompletion(messages, 0.3);
    return content.trim();
  }

  async regenerateWithFeedback(
    docType: DocumentTypeId,
    currentContent: string,
    feedback: string,
    context: ProjectContext
  ): Promise<string> {
    const systemPrompt = `You are a Senior Technical Architect editing an existing ${docType}.md specification document.
Your task is to refine and update the document according to the user's specific feedback, while preserving overall coherence, markdown formatting, and high architectural quality.

Current Document Content:
${currentContent}

User Change Request:
"${feedback}"

Structured Context:
${JSON.stringify(context, null, 2)}

Output the entire improved markdown document. Do not include commentary, meta-text, or explanations. Start directly with the markdown.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: `Please apply the requested change: "${feedback}"` },
    ];

    const content = await this.callChatCompletion(messages, 0.3);
    return content.trim();
  }

  async validateConsistency(documents: Partial<Record<DocumentTypeId, string>>): Promise<ConsistencyReport> {
    const availableDocs = Object.keys(documents) as DocumentTypeId[];
    if (availableDocs.length <= 1) {
      return { isConsistent: true, score: 100, issues: [] };
    }

    const docsSummary = availableDocs.map(type => `### ${type}.md\n${(documents[type] || '').slice(0, 2000)}`).join('\n\n');

    const systemPrompt = `You are a Principal Software Quality Auditor.
Audit the following set of specification documents for technical conflicts or inconsistencies (e.g. PRD says PostgreSQL but Architecture mentions MongoDB, or Design specifies dark theme while components require bright pastel defaults).

Documents:
${docsSummary}

Return a valid JSON object matching:
{
  "isConsistent": boolean,
  "score": number (0 to 100),
  "issues": [
    {
      "docTypeA": string,
      "docTypeB": string,
      "topic": string,
      "conflictDescription": string,
      "recommendedResolution": string
    }
  ]
}`;

    const rawResponse = await this.callChatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Audit documents for mutual consistency.' },
    ], 0.1);

    try {
      const parsed = JSON.parse(cleanJsonString(rawResponse));
      return {
        isConsistent: Boolean(parsed.isConsistent),
        score: typeof parsed.score === 'number' ? parsed.score : 95,
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      };
    } catch {
      return { isConsistent: true, score: 95, issues: [] };
    }
  }
}
