# Environment Setup for MoodMailer

## Security Configuration

This file contains instructions for setting up your OpenAI API key securely.

### Step 1: Get Your OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (it starts with `sk-proj-...`)

### Step 2: Configure the App

#### Option A: Using .env file (Recommended for development)

1. Create a `.env` file in the root directory
2. Add your API key:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```
3. The `.env` file is already in `.gitignore` and won't be committed

#### Option B: Direct configuration

1. Open `src/config/index.ts`
2. Replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key
3. **Important**: Never commit this file with a real API key

### Step 3: Production Deployment

For production apps:

1. **Use Environment Variables**: Set `OPENAI_API_KEY` in your deployment environment
2. **Use Secure Key Management**: Consider services like:
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager
   - Expo Secure Store (for React Native)

### Security Best Practices

✅ **Do:**
- Use environment variables for API keys
- Rotate API keys regularly
- Monitor API usage in OpenAI dashboard
- Use different keys for development/production

❌ **Don't:**
- Commit API keys to version control
- Share API keys in chat/email
- Use production keys in development
- Hard-code keys in source files

### Troubleshooting

If AI features aren't working:

1. Check that your API key is correctly configured
2. Verify the key is valid in OpenAI dashboard
3. Check the console for error messages
4. Ensure you have OpenAI credits available

### Environment Variables Reference

```bash
# Required for AI features
OPENAI_API_KEY=sk-proj-your-key-here

# Optional: Custom model (default: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Optional: Max tokens per request (default: 300)
OPENAI_MAX_TOKENS=300
```

For questions about API key setup, check the [OpenAI documentation](https://platform.openai.com/docs/quickstart).