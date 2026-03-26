# Task Manager App

## Overview

This project is a small React Native task manager built with Expo and TypeScript. It focuses on the requested fundamentals only: adding tasks, marking them complete, deleting them, and managing state locally inside the app.

## Features

- Add a task from the input field or the keyboard submit action
- Prevent empty or whitespace-only submissions
- Mark any task complete or incomplete by tapping the task row
- Delete a task from the list with a clear action
- Visually distinguish completed tasks with a muted card style and strikethrough text
- Show a simple empty state when there are no tasks
- Render tasks with `FlatList` for a clean, scalable list implementation

## Tech Stack

- React Native
- Expo
- TypeScript
- React DOM
- React Native Web
- `react-native-safe-area-context`
- `expo-status-bar`

## Folder Structure

```text
.
├── App.tsx
├── src
│   ├── components
│   │   ├── EmptyState.tsx
│   │   ├── TaskComposer.tsx
│   │   └── TaskItem.tsx
│   ├── constants
│   │   └── theme.ts
│   ├── screens
│   │   └── TaskManagerScreen.tsx
│   └── types
│       └── task.ts
├── app.json
├── package.json
└── README.md
```

## Setup And Run

### Prerequisites

- Node.js
- npm
- Expo Go on a device, or an Android/iOS simulator

### Install

```bash
npm install
```

### Start The App

```bash
npm start
```

### Run On A Specific Platform

```bash
npm run android
npm run ios
npm run web
```

## Libraries Used

- `expo`
  - Expo runtime and development workflow
- `react-native-safe-area-context`
  - Safe area handling for modern device layouts
- `expo-status-bar`
  - Status bar styling for the screen
- `react-dom` and `react-native-web`
  - Required for Expo's web target
