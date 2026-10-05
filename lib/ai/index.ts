import { AIProvider } from './types';
import { DeepSeekProvider } from './deepseek';

let aiProviderInstance: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!aiProviderInstance) {
    aiProviderInstance = new DeepSeekProvider();
  }
  return aiProviderInstance;
}

export * from './types';

