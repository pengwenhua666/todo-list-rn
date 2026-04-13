---
name: expo-development
description: '**WORKFLOW SKILL** — Guide through common Expo development tasks for React Native apps, including setup, running, building, and debugging. USE FOR: Setting up Expo projects, starting development servers, building for production, troubleshooting Expo-specific issues. DO NOT USE FOR: General coding questions, non-Expo React Native development, web-only projects. INVOKES: run_in_terminal for Expo CLI commands, read_file for project configs, subagents for in-depth troubleshooting.'
---

# Expo Development Skill

This skill provides a structured workflow for developing React Native applications using Expo. It covers the essential steps from project setup to deployment, with built-in validation and troubleshooting.

## Prerequisites
- Node.js installed
- Expo CLI installed globally (`npm install -g @expo/cli`)
- For mobile development: Expo Go app on device or simulator/emulator

## Workflow Steps

### 1. Project Assessment
- Verify Expo SDK version in `package.json`
- Check for required scripts in `package.json`
- Ensure `app.json` or `expo-app.json` is properly configured
- Validate TypeScript setup if applicable

### 2. Dependency Management
- Run `npm install` or `yarn install` to install dependencies
- Check for Expo SDK compatibility with installed packages
- Update Expo SDK if needed using `npx expo install --fix`

### 3. Development Server
- Start the development server with `npx expo start`
- Choose platform: iOS, Android, or web
- Use Expo Go for quick testing on device
- Enable clear cache if needed with `--clear`

### 4. Building for Production
- Use EAS Build for cloud builds: `eas build --platform android` or `eas build --platform ios`
- For local builds: `npx expo build:android` or `npx expo build:ios`
- Configure build profiles in `eas.json` if using EAS

### 5. Debugging and Troubleshooting
- Run `npx expo doctor` to diagnose common issues
- Check logs in the terminal or Expo Dev Tools
- Use `npx expo install --fix` for dependency issues
- Clear Metro bundler cache: `npx expo start --clear`

### 6. Deployment
- Submit to app stores using EAS Submit
- Publish updates with `npx expo publish`
- Configure app store credentials in EAS

## Validation Checks
After each major step, the skill will:
- Check for errors in terminal output
- Verify build artifacts exist
- Test basic functionality if possible

## Common Issues and Solutions
- **Metro bundler issues**: Clear cache and restart
- **SDK version conflicts**: Update all Expo packages together
- **Permissions**: Ensure proper app.json permissions for native features
- **Build failures**: Check EAS logs and fix configuration

This skill automates the repetitive parts of Expo development while providing guidance for complex tasks.