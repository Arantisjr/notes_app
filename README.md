# Simple Notes App 📝

A clean and intuitive React Native notes application built with Expo to help you learn React Native concepts while creating something useful.

## 🚀 Features

- Create, edit, and delete notes
- Simple and intuitive user interface
- Built with React Native and Expo
- File-based routing with Expo Router
- Cross-platform (iOS, Android)

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based)
- **State Management**: React hooks (useState, useEffect)
- **Storage**: AsyncStorage (local data persistence)
- **Styling**: React Native StyleSheet

## 📦 Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd simple-notes-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

## 🎯 How to Run

In the output after running `npx expo start`, you'll find options to open the app in:

- **[Development build](https://docs.expo.dev/develop/development-builds/introduction/)**
- **[Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)**
- **[iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)**
- **[Expo Go](https://expo.dev/go)** - Limited sandbox for quick testing

## 📁 Project Structure

```
app/
  index.tsx          # Main notes list screen
  add-note.tsx       # Add new note screen
  edit-note/[id].tsx # Edit existing note screen
components/          # Reusable components
utils/              # Helper functions and storage
```

## 🎓 Learning Objectives

This project helps you learn:
- React Native fundamentals
- Expo development workflow
- State management with hooks
- Navigation with Expo Router
- Local data persistence
- Component composition
- Form handling in React Native

## 🔧 Development

Start developing by editing files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

To create a fresh starting point:
```bash
npm run reset-project
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)

Happy learning!** 🎉 Build something amazing and enjoy your React Native journey!