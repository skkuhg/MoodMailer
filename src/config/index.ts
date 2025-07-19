// Configuration for MoodMailer App
// For production, use environment variables or secure key management

const config = {
  // OpenAI Configuration
  openai: {
    // In production, load this from environment variables or secure storage
    // Never commit actual API keys to version control
    apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
    model: 'gpt-4o-mini',
    maxTokens: 300,
    temperature: 0.7,
  },
  
  // App Configuration
  app: {
    name: 'MoodMailer',
    version: '1.0.0',
  },
  
  // Encryption Configuration
  encryption: {
    algorithm: 'XOR',
    encoding: 'hex',
  },
};

export default config;
