# OpenAI Integration Setup

This document explains how to configure the OpenAI Chat Assistant for the Kyrgyz language learning application.

## Overview

The AI Assistant feature uses OpenAI's GPT-4o-mini model to provide:
- Real-time chat support in Kyrgyz
- Grammar explanations
- Translation assistance
- Conversation practice

## Configuration

### 1. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy your API key (starts with `sk-...`)

### 2. Configure Environment Variables

Edit your `.env` file and add your OpenAI credentials:

```bash
# Required: Your OpenAI API key
OPENAI_API_KEY="sk-your-actual-api-key-here"

# Optional: Organization and Project IDs (if applicable)
# OPENAI_ORGANIZATION_ID="org-your-organization-id"
# OPENAI_PROJECT_ID="proj_your-project-id"
```

### 3. Restart Your Rails Server

After adding the environment variables, restart the Rails server:

```bash
# Stop current server (Ctrl+C)
# Start again
bin/rails server
```

## Testing the Integration

1. Navigate to the learning dashboard: `/learning/dashboard`
2. Click on the **AI Assistant** card at the bottom
3. Type a message in the chat (in English, Russian, or Kyrgyz)
4. You should receive a response from the AI assistant

## API Endpoint

The integration uses the following endpoint:

```
POST /ai/chat
```

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "Салам! How do you say 'hello' in Kyrgyz?" }
  ]
}
```

**Response:**
```json
{
  "message": "AI assistant response...",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 100,
    "total_tokens": 150
  }
}
```

## Model Configuration

The integration is configured to use:
- **Model**: `gpt-4o-mini` (cost-effective, fast)
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1000 (reasonable response length)

You can modify these settings in `app/services/ai/openai_service.rb`.

## Cost Considerations

OpenAI charges based on token usage:
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Average conversation: ~500-1000 tokens per exchange
- Monitor usage at: https://platform.openai.com/usage

## Security Notes

- **Never commit your API key** to version control
- The `.env` file is in `.gitignore` by default
- API keys should be treated as sensitive credentials
- For production, use environment variables or Rails credentials

## Troubleshooting

### Error: "Failed to get AI response"

**Possible causes:**
1. Invalid API key - check your `.env` file
2. Insufficient API credits - check your OpenAI account balance
3. Rate limit exceeded - OpenAI has usage limits based on your plan

**Solution:**
Check Rails logs for detailed error messages:
```bash
tail -f log/development.log
```

### Error: "Service unavailable"

This usually means the OpenAI API is temporarily unavailable. Wait a moment and try again.

## Alternative: Using Rails Credentials

Instead of `.env`, you can use Rails encrypted credentials:

```bash
# Edit credentials
EDITOR=nano rails credentials:edit

# Add OpenAI configuration
openai:
  api_key: sk-your-actual-api-key-here
  organization_id: org-your-org-id  # optional
  project_id: proj_your-project-id   # optional
```

The service automatically checks both `.env` and credentials.

## Future Enhancements

Potential improvements:
- Add rate limiting per user (Level 2)
- Implement conversation history persistence
- Add voice input/output
- Fine-tune model for Kyrgyz language specifically
- Add user feedback mechanism for responses
