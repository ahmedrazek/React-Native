# Task Manager App

A modern, clean task management application built with React Native and Expo. This app allows users to add, complete, edit, and delete tasks with an intuitive user interface and smooth interactions.

## Features

### Core Functionality

- ✅ **Add Tasks**: Create new tasks with a brief description through an intuitive input field
- ✅ **Mark Tasks as Complete**: Toggle task completion status with visual feedback (checkboxes)
- ✅ **Delete Tasks**: Remove tasks from the list with a confirmation dialog for safety
- ✅ **Task List Display**: View all tasks organized into two sections:
  - **To Do**: Active tasks that need to be completed
  - **Completed**: Finished tasks with visual distinction (strikethrough text, muted colors)
- ✅ **Edit Tasks**: Update task descriptions through a dialog interface
- ✅ **Task Statistics**: View total tasks and active tasks count in the header

### User Interface

- 🎨 **Modern Design**: Clean, intuitive interface built with React Native Paper (Material Design)
- 🎯 **Visual Feedback**:
  - Touch feedback on interactive elements
  - Color-coded status indicators (indigo for active, green for completed)
  - Smooth transitions and animations
  - Confirmation dialogs for destructive actions
- 📱 **Responsive Layout**: Works seamlessly on Android, iOS, and Web platforms
- ♿ **Accessible**: Uses accessible components with proper touch targets and feedback

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager
- **Expo CLI** (optional, but recommended for better development experience)
- **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator on macOS)

### Installation Steps

1. **Clone or extract the project**

   ```bash
   # If using git
   git clone <repository-url>
   cd React-Native

   # Or extract the project files to a directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required dependencies including React Native, Expo, and React Native Paper.

3. **Start the development server**

   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your preferred platform**

   After starting the development server, you can:

   - **Android**:

     ```bash
     npm run android
     ```

     Or press `a` in the terminal after running `npm start`

   - **iOS** (macOS only):

     ```bash
     npm run ios
     ```

     Or press `i` in the terminal after running `npm start`

   - **Web**:

     ```bash
     npm run web
     ```

     Or press `w` in the terminal after running `npm start`

   - **Expo Go App**: Scan the QR code with the Expo Go app on your mobile device

### Troubleshooting

- If you encounter issues with the Android emulator, ensure Android Studio is installed and an emulator is running
- For iOS, ensure Xcode and iOS Simulator are installed (macOS only)
- If dependencies fail to install, try clearing the cache:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

## Usage Instructions

### Adding a Task

1. Locate the input field at the top of the screen labeled "What needs to be done?"
2. Type your task description
3. Press **Enter** on your keyboard or tap the **plus icon** (➕) to add the task
4. The task will appear in the "To Do" section

### Completing a Task

1. Find the task you want to mark as complete
2. Tap the **checkbox** next to the task description
3. The task will automatically move to the "Completed" section with visual changes:
   - Strikethrough text
   - Muted gray color
   - Green checkmark

### Editing a Task

1. Find the task you want to edit
2. Tap the **pencil icon** (✏️) on the right side of the task card
3. A dialog will open with the current task description
4. Modify the text as needed
5. Tap **Save** to update or **Cancel** to discard changes

### Deleting a Task

1. Find the task you want to delete
2. Tap the **delete icon** (🗑️) on the right side of the task card
3. A confirmation dialog will appear asking "Are you sure you want to delete this task?"
4. Tap **Delete** to confirm or **Cancel** to abort

### Viewing Task Statistics

The header displays:

- **Total**: Total number of tasks (both completed and incomplete)
- **Active**: Number of tasks that are not yet completed

## Third-Party Libraries

This project uses the following third-party libraries:

### UI Component Library

- **react-native-paper** (^5.14.5)
  - **Purpose**: Provides Material Design components for React Native
  - **Usage**: Used for Cards, TextInput, Checkbox, Buttons, Dialogs, Chips, Icons, and other UI elements
  - **Why**: Ensures a consistent, modern, and accessible user interface following Material Design guidelines

### Navigation & Routing

- **expo-router** (~6.0.15)

  - **Purpose**: File-based routing system for Expo applications
  - **Usage**: Handles navigation and screen management in the app
  - **Why**: Simplifies navigation setup and provides a declarative routing approach

- **@react-navigation/native** (^7.1.8)

  - **Purpose**: Core navigation library for React Native
  - **Usage**: Foundation for navigation functionality
  - **Why**: Provides the underlying navigation infrastructure

- **@react-navigation/bottom-tabs** (^7.4.0)
  - **Purpose**: Bottom tab navigation component
  - **Usage**: Used for tab-based navigation (if needed)
  - **Why**: Provides ready-made tab navigation UI

### Icons

- **react-native-vector-icons** (^10.3.0)

  - **Purpose**: Icon library providing Material Community Icons
  - **Usage**: Supplies icons used throughout the app (check-circle, clock-outline, pencil, delete-outline, etc.)
  - **Why**: Provides a comprehensive set of icons that match Material Design

- **@expo/vector-icons** (^15.0.3)
  - **Purpose**: Expo's icon library wrapper
  - **Usage**: Additional icon support for Expo projects
  - **Why**: Ensures icon compatibility with Expo ecosystem

### Core Framework

- **expo** (~54.0.25)

  - **Purpose**: Framework and platform for React Native applications
  - **Usage**: Provides development tools, APIs, and build system
  - **Why**: Simplifies React Native development with pre-configured tools and services

- **react-native** (0.81.5)

  - **Purpose**: Core React Native framework
  - **Usage**: Base framework for building mobile applications
  - **Why**: Enables cross-platform mobile development with React

- **react** (19.1.0)
  - **Purpose**: JavaScript library for building user interfaces
  - **Usage**: Core library for component-based UI development
  - **Why**: Foundation of React Native applications

### Additional Dependencies

- **react-native-gesture-handler** (~2.28.0): Handles touch gestures and interactions
- **react-native-reanimated** (~4.1.1): Provides smooth animations and transitions
- **react-native-safe-area-context** (~5.6.0): Manages safe area insets for different devices
- **react-native-screens** (~4.16.0): Native screen management for better performance
- **react-native-web** (~0.21.0): Enables web platform support

## Project Structure

```
React-Native/
├── app/
│   ├── _layout.tsx          # Root layout component with PaperProvider setup
│   └── index.tsx            # Main screen entry point (renders TaskManager)
├── components/
│   └── TaskManager.tsx      # Main task management component with all functionality
├── assets/                  # Images and static assets
├── package.json             # Project dependencies and scripts
├── app.json                 # Expo configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Technical Details

### State Management

- **Approach**: Uses React's built-in `useState` hook for local component state
- **State Variables**:
  - `tasks`: Array of all tasks
  - `taskDescription`: Current input value for adding/editing tasks
  - `dialogVisible`: Controls edit dialog visibility
  - `editingTask`: Currently selected task for editing
- **Why Local State**: Simple and sufficient for this app's requirements. No external state management needed.

### TypeScript

- Fully typed with TypeScript for better code quality
- Interface defined for Task structure:
  ```typescript
  interface Task {
    id: string;
    description: string;
    completed: boolean;
  }
  ```

### Platform Support

- ✅ **Android**: Fully supported
- ✅ **iOS**: Fully supported
- ✅ **Web**: Fully supported

### Code Quality Features

- Clean, organized component structure
- Proper error handling with user-friendly alerts
- Input validation (prevents empty tasks)
- Confirmation dialogs for destructive actions
- Responsive design that adapts to different screen sizes
- Accessible components with proper touch targets
- Consistent styling with StyleSheet

## Development Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the app on Android emulator
- `npm run ios`: Start the app on iOS simulator
- `npm run web`: Start the app in web browser
- `npm run lint`: Run ESLint to check code quality

## Future Enhancements (Optional)

While not required for this project, potential improvements could include:

- Persistent storage (AsyncStorage or SQLite)
- Task categories or tags
- Due dates and reminders
- Task prioritization
- Search and filter functionality
- Dark mode support
- Task sharing capabilities

## License

This project is created for evaluation purposes as part of a technical screening.

## Contact

For questions or issues, please contact: eng@startchapterone.com

---

**Note**: This app demonstrates core React Native concepts including component composition, state management, user interactions, and modern UI design patterns.
