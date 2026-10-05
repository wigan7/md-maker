export type QuestionType =
  | 'text'
  | 'textarea'
  | 'single-choice'
  | 'multi-choice'
  | 'number'
  | 'yes-no';

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'Project' | 'Users' | 'Features' | 'Design' | 'Technology' | 'Data' | 'Clarification';
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  rationale?: string;
  isClarification?: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  questionText: string;
  category: string;
  answer: string | string[] | number | boolean;
  answeredAt: string;
}

export interface AIAssumption {
  id: string;
  category: string;
  text: string;
  accepted: boolean;
  explanation?: string;
}

export interface PersonaInfo {
  name: string;
  role: string;
  needs: string;
  painPoints?: string;
}

export interface FeatureInfo {
  name: string;
  priority: 'core' | 'secondary' | 'nice-to-have';
  description: string;
}

export interface TechStackInfo {
  frontend?: string;
  backend?: string;
  runtime?: string;
  uiFramework?: string;
  stateManagement?: string;
}

export interface ProjectContext {
  projectName: string;
  description: string;
  problem: string;
  goals: string[];
  users: string[];
  personas: PersonaInfo[];
  platforms: string[];
  features: FeatureInfo[];
  userFlows: string[];
  designPreferences: {
    style: string;
    theme: string;
    keyElements?: string[];
  };
  technology: TechStackInfo;
  authentication: string;
  database: string;
  integrations: string[];
  security: string[];
  deployment: string;
  constraints: string[];
  assumptions: AIAssumption[];
}

export interface InterviewSession {
  projectId: string;
  currentStep: number;
  totalEstimatedSteps: number;
  completedCategories: string[];
  currentCategory: string;
  history: QuestionAnswer[];
  currentQuestion: InterviewQuestion | null;
  context: ProjectContext;
  isComplete: boolean;
  assumptions: AIAssumption[];
}