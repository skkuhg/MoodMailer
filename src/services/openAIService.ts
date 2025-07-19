import OpenAI from 'openai';
import { MoodData } from '../types';
import config from '../config';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    // Get API key from secure configuration
    const apiKey = config.openai.apiKey;
    
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
      console.warn('OpenAI API key not configured. AI features will be disabled.');
      // In this case, you could throw an error or disable AI features
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Required for React Native/client-side usage
    });
  }

  async generateMessage(mood: MoodData, userPrompt?: string): Promise<string> {
    try {
      const moodDescription = this.getMoodDescription(mood);
      
      const systemPrompt = `You are a compassionate AI assistant helping someone write a meaningful message to their future self. 
      The message should be:
      - Encouraging and supportive
      - Personal and heartfelt
      - Appropriate for the current mood: ${moodDescription}
      - Between 50-200 words
      - Written in first person as if the user is writing to themselves
      
      The tone should match the ${mood.emoji} ${mood.emotion} mood with intensity level ${mood.intensity}/10.`;

      const userMessage = userPrompt 
        ? `Help me write a message to my future self. I'm feeling ${mood.emotion} (intensity: ${mood.intensity}/10). ${userPrompt}`
        : `Generate an inspiring message for someone who is feeling ${mood.emotion} with intensity ${mood.intensity}/10 to read in the future.`;

      const completion = await this.client.chat.completions.create({
        model: config.openai.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: config.openai.maxTokens,
        temperature: config.openai.temperature,
      });

      const generatedMessage = completion.choices[0]?.message?.content?.trim();
      
      if (!generatedMessage) {
        throw new Error('No message generated');
      }

      return generatedMessage;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate message. Please try again.');
    }
  }

  async generateMoodBasedPrompts(mood: MoodData): Promise<string[]> {
    try {
      const moodDescription = this.getMoodDescription(mood);
      
      const systemPrompt = `Generate 3 different writing prompts for someone who wants to write a message to their future self. 
      They are currently feeling ${mood.emotion} with intensity ${mood.intensity}/10. 
      Each prompt should be one sentence and help them reflect on their current state and future hopes.
      Return only the prompts, one per line, without numbering.`;

      const completion = await this.client.chat.completions.create({
        model: config.openai.model,
        messages: [{ role: 'system', content: systemPrompt }],
        max_tokens: 200,
        temperature: 0.8,
      });

      const response = completion.choices[0]?.message?.content?.trim();
      
      if (!response) {
        throw new Error('No prompts generated');
      }

      return response.split('\n').filter(prompt => prompt.trim().length > 0);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Return fallback prompts
      return [
        "What would you want to remember about this moment?",
        "What hopes do you have for your future self?",
        "What advice would you give to yourself tomorrow?"
      ];
    }
  }

  private getMoodDescription(mood: MoodData): string {
    return `${mood.emotion} with intensity ${mood.intensity}/10. This mood is represented by the ${mood.emoji} emoji and uses colors: ${mood.colorPalette.join(', ')}.`;
  }
}

export const openAIService = new OpenAIService();
