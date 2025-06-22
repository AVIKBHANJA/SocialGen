import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Define types for better TypeScript support
export interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
  stopSequences?: string[];
}

export interface SafetySettings {
  category: HarmCategory;
  threshold: HarmBlockThreshold;
}

export interface PostParams {
  id?: string;
  platform: string;
  topic: string;
  audience: string;
  tone: string;
  additionalContext?: string;
}

// Create a singleton class for the Gemini API client to follow DRY principles
class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;
  
  private constructor() {
    // Initialize the Gemini API client with latest API key format
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    
    // Initialize the model with optimal configuration for Gemini 2.0 Flash
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        }
      ],
    });
  }
  
  // Singleton pattern to ensure only one instance is created
  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }
    // Method to generate social media post content
  public async generatePost(params: PostParams): Promise<{ content: string; tokenUsage?: any }> {
    try {
      const { platform, topic, audience, tone, additionalContext } = params;
      
      // Construct the prompt template
      const prompt = `Generate a social media post for ${platform} about "${topic}" targeting "${audience}" in a "${tone}" tone. ${additionalContext ? `Additional context: ${additionalContext}` : ''}`;
      
      // Generate content using the model
      const result = await this.model.generateContent(prompt);
      const content = result.response.text();
      
      // Extract token usage information if available
      const usageMetadata = result.response.usageMetadata;
      const tokenUsage = usageMetadata ? {
        inputTokens: usageMetadata.promptTokenCount || 0,
        outputTokens: usageMetadata.candidatesTokenCount || 0,
        totalTokens: usageMetadata.totalTokenCount || 0
      } : null;
      
      return { content, tokenUsage };
      
    } catch (error) {
      console.error("Error generating content with Gemini:", error);
      throw new Error("Failed to generate content");
    }
  }
}

// Export a simpler interface for use throughout the app
export const geminiService = GeminiService.getInstance();

// Helper function for generating content (for backward compatibility)
export const generateContent = async (
  platform: string,
  topic: string,
  audience: string,
  tone: string,
  additionalContext?: string
): Promise<string> => {
  const result = await geminiService.generatePost({
    platform,
    topic,
    audience,
    tone,
    additionalContext
  });
  return result.content;
};
