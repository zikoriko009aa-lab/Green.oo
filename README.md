# GREEN GHOST — Expo Android project

This is the unpacked Expo project archive. Its files are at the archive root.

## Build requirements
- Node.js 22
- An Expo account and a valid EXPO_TOKEN
- EAS CLI (the GitHub Actions workflow installs it with npx)

## Local setup
```bash
npm install
npx expo-doctor
npx expo start
```

## Android APK
The EAS `preview` profile in `eas.json` is configured to produce an APK:
```bash
npx eas-cli build --platform android --profile preview
```

Note: A successful APK build still depends on a valid Expo account/token and successful EAS project setup.
