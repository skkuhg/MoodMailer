# MoodMailer 📱✨

A React Native Expo app that allows users to write messages to their future selves with mood-based AI assistance.

## Features

### 🎭 Mood-Based Messaging
- Select your current emotional state and intensity
- Messages are encrypted and securely stored
- Schedule delivery for future dates
- Visual mood representation with colors and emojis

### 🤖 AI-Powered Writing Assistant
- GPT-4o-mini integration for message generation
- Mood-aware content creation
- Personalized writing prompts
- Custom context support

### 🔒 Security & Privacy
- End-to-end message encryption using XOR encryption
- Secure local storage with AsyncStorage
- API keys managed through secure configuration
- No sensitive data stored in plain text

### 📅 Smart Scheduling
- Date and time picker for message delivery
- Notification system integration
- Trigger-based message delivery
- Vault storage for all messages

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe development
- **Zustand** - State management
- **TailwindCSS** (NativeWind) - Styling
- **OpenAI GPT-4o-mini** - AI text generation
- **Expo Crypto** - Encryption utilities
- **AsyncStorage** - Local data persistence

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/skkuhg/moodmailer.git
   cd moodmailer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

4. Configure OpenAI API Key:
   - Edit `src/config/index.ts`
   - Replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key
   - Or set the `OPENAI_API_KEY` environment variable

5. Start the development server:
   ```bash
   npm start
   ```

6. Scan the QR code with Expo Go app on your mobile device

## Configuration

### OpenAI Setup
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add the key to your configuration:
   - Option 1: Environment variable `OPENAI_API_KEY`
   - Option 2: Update `src/config/index.ts`

### Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   ├── MessageEditor.tsx    # AI-enhanced message composition
│   ├── MoodPicker.tsx      # Mood selection interface
│   └── ...
├── screens/            # App screens
│   ├── ComposeScreen.tsx   # Message creation screen
│   ├── VaultScreen.tsx     # Message storage screen
│   └── ...
├── services/           # Business logic and external APIs
│   ├── openAIService.ts    # OpenAI integration
│   ├── encryptionService.ts # Message encryption
│   └── notificationService.ts # Push notifications
├── store/              # State management
│   ├── messageStore.ts     # Message data management
│   └── userStore.ts        # User preferences
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # App configuration
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Keys**: Never commit API keys to version control
2. **Production**: Use secure environment variable management
3. **Encryption**: Messages are XOR encrypted locally
4. **Privacy**: No data is sent to external servers except OpenAI for AI features

## Development

### Running in Expo Go
The app is optimized for Expo Go but has some limitations:
- Push notifications are limited in Expo Go
- For full functionality, use a development build

### Available Scripts
- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4o-mini API
- Expo team for the excellent development platform
- React Native community for extensive libraries

## Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/skkuhg/moodmailer/issues) page
2. Create a new issue with detailed information
3. Include device information and error logs

---

Made with ❤️ for connecting with your future self