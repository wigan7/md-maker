import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InterviewSession, ProjectContext, QuestionAnswer } from '@/types/interview';
import { Project, DocumentTypeId } from '@/types/project';
import { Language } from '@/lib/i18n/dictionaries';

interface InterviewStoreState {
  sessions: Record<string, InterviewSession>;
  isLoading: boolean;
  error: string | null;

  // Actions
  initSession: (project: Project, language?: Language) => Promise<void>;
  submitAnswer: (projectId: string, selectedDocTypes: DocumentTypeId[], answer: string | string[] | number | boolean, language?: Language) => Promise<void>;
  toggleAssumption: (projectId: string, assumptionId: string) => void;
  setError: (err: string | null) => void;
  getSession: (projectId: string) => InterviewSession | undefined;
}

const createInitialContext = (project: Project, language: Language = 'id'): ProjectContext => ({
  projectName: project.name,
  description: project.description,
  problem: '',
  goals: [],
  users: [],
  personas: [],
  platforms: ['web'],
  features: [],
  userFlows: [],
  designPreferences: {
    style: 'Premium iOS Glassmorphism',
    theme: 'Adaptive (Light & Dark)',
    keyElements: ['Translucent surfaces', 'Subtle atmospheric blur', 'Clean modern typography'],
  },
  technology: {
    frontend: 'Next.js 15, React 19, Tailwind CSS',
    backend: 'Next.js App Router API',
    runtime: 'Node.js',
  },
  authentication: 'OAuth 2.0 / Session Auth',
  database: 'PostgreSQL / Supabase',
  integrations: ['DeepSeek API'],
  security: ['Server-side API keys', 'Input sanitization', 'CSRF protection'],
  deployment: 'Vercel / Cloudflare',
  constraints: ['Low-latency responses', 'Mobile-responsive'],
  assumptions: [],
});

export const useInterviewStore = create<InterviewStoreState>()(
  persist(
    (set, get) => ({
      sessions: {},
      isLoading: false,
      error: null,

      getSession: (projectId: string) => get().sessions[projectId],

      setError: (err) => set({ error: err }),

      initSession: async (project: Project, language: Language = 'id') => {
        const existing = get().sessions[project.id];
        if (existing && existing.currentQuestion) {
          return;
        }

        const initialContext = existing?.context || createInitialContext(project, language);

        const isId = language === 'id';
        const initialQuestionText = isId
          ? `Masalah atau tantangan utama apa yang diselesaikan oleh ${project.name} bagi penggunanya?`
          : `What primary problem or core challenge does ${project.name} solve for its users?`;

        const initialPlaceholder = isId
          ? 'Jelaskan hambatan alur kerja, kendala pengguna, atau kebutuhan yang belum terpenuhi...'
          : 'Describe the frustration, workflow bottleneck, or unmet need...';

        const initialRationale = isId
          ? 'Memahami rumusan masalah mendefinisikan proposisi nilai inti dari seluruh dokumen spesifikasi.'
          : 'Understanding the problem statement defines the core value proposition of all documents.';

        const initialSession: InterviewSession = {
          projectId: project.id,
          currentStep: 1,
          totalEstimatedSteps: Math.max(4, Math.min(7, project.selectedDocTypes.length + 2)),
          completedCategories: [],
          currentCategory: 'Project',
          history: [],
          currentQuestion: {
            id: 'q-problem-statement',
            text: initialQuestionText,
            category: 'Project',
            type: 'textarea',
            placeholder: initialPlaceholder,
            rationale: initialRationale,
          },
          context: initialContext,
          isComplete: false,
          assumptions: [],
        };

        set((state) => ({
          sessions: {
            ...state.sessions,
            [project.id]: initialSession,
          },
          error: null,
        }));
      },

      submitAnswer: async (projectId: string, selectedDocTypes: DocumentTypeId[], answer: string | string[] | number | boolean, language: Language = 'id') => {
        const session = get().sessions[projectId];
        if (!session || !session.currentQuestion) return;

        const currentQ = session.currentQuestion;
        const answerRecord: QuestionAnswer = {
          questionId: currentQ.id,
          questionText: currentQ.text,
          category: currentQ.category,
          answer,
          answeredAt: new Date().toISOString(),
        };

        const updatedHistory = [...session.history, answerRecord];
        const nextStep = session.currentStep + 1;

        // Categorize context update optimistically
        const optimisticContext = { ...session.context };
        if (currentQ.id === 'q-problem-statement') {
          optimisticContext.problem = String(answer);
        }

        const updatedCategories = Array.from(new Set([...session.completedCategories, currentQ.category]));

        // Save progress locally first!
        const intermediateSession: InterviewSession = {
          ...session,
          currentStep: nextStep,
          completedCategories: updatedCategories,
          history: updatedHistory,
          context: optimisticContext,
        };

        set((state) => ({
          isLoading: true,
          error: null,
          sessions: {
            ...state.sessions,
            [projectId]: intermediateSession,
          },
        }));

        try {
          const res = await fetch('/api/ai/interview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              session: intermediateSession,
              selectedDocTypes,
              language,
            }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || `HTTP ${res.status}`);
          }

          const data = await res.json();

          set((state) => ({
            isLoading: false,
            sessions: {
              ...state.sessions,
              [projectId]: {
                ...intermediateSession,
                isComplete: Boolean(data.isComplete),
                currentQuestion: data.question || null,
                currentCategory: data.question?.category || 'Review',
                context: data.updatedContext || optimisticContext,
                assumptions: data.assumptions?.length ? data.assumptions : intermediateSession.assumptions,
              },
            },
          }));
        } catch (err: any) {
          console.error('Failed to get next interview question from server:', err);
          set({
            isLoading: false,
            error: err?.message || 'Connection to DeepSeek failed. Your progress is saved.',
          });
        }
      },

      toggleAssumption: (projectId: string, assumptionId: string) => {
        set((state) => {
          const session = state.sessions[projectId];
          if (!session) return state;

          const updatedAssumptions = session.assumptions.map((a) =>
            a.id === assumptionId ? { ...a, accepted: !a.accepted } : a
          );

          return {
            sessions: {
              ...state.sessions,
              [projectId]: {
                ...session,
                assumptions: updatedAssumptions,
              },
            },
          };
        });
      },
    }),
    {
      name: 'prdmaker-interview-v1',
    }
  )
);