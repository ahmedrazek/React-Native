import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TaskManagerScreen from "./src/screens/TaskManagerScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <TaskManagerScreen />
    </SafeAreaProvider>
  );
}
