import { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../components/EmptyState";
import TaskComposer from "../components/TaskComposer";
import TaskItem from "../components/TaskItem";
import { theme } from "../constants/theme";
import type { Task } from "../types/task";

export default function TaskManagerScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const nextIdRef = useRef(1);

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  const handleDraftChange = (value: string) => {
    setDraft(value);

    if (inputError) {
      setInputError(null);
    }
  };

  const handleAddTask = () => {
    const nextDescription = draft.trim();

    if (!nextDescription) {
      setInputError("Enter a task before tapping add.");
      return;
    }

    const newTask: Task = {
      id: String(nextIdRef.current),
      description: nextDescription,
      completed: false,
    };

    nextIdRef.current += 1;
    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setDraft("");
    setInputError(null);
    Keyboard.dismiss();
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const summary =
    tasks.length === 0
      ? "Nothing added yet."
      : `${remainingCount} open, ${completedCount} completed.`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.backgroundOrbTop} />
      <View style={styles.backgroundOrbBottom} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.headerBlock}>
              <View style={styles.heroCard}>
                <Text style={styles.eyebrow}>Simple Task Manager</Text>
                <Text style={styles.title}>Keep the list focused.</Text>
                <Text style={styles.summary}>
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}. {summary}
                </Text>

                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{remainingCount}</Text>
                    <Text style={styles.statLabel}>Open</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{completedCount}</Text>
                    <Text style={styles.statLabel}>Done</Text>
                  </View>
                  <View style={[styles.statCard, styles.statCardAccent]}>
                    <Text style={[styles.statValue, styles.statValueAccent]}>
                      {tasks.length}
                    </Text>
                    <Text style={[styles.statLabel, styles.statLabelAccent]}>
                      Total
                    </Text>
                  </View>
                </View>
              </View>

              <TaskComposer
                value={draft}
                onChangeText={handleDraftChange}
                onSubmit={handleAddTask}
                hasError={Boolean(inputError)}
                errorMessage={inputError}
                isAddDisabled={draft.trim().length === 0}
              />

              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Tasks</Text>
                {tasks.length > 0 ? (
                  <Text style={styles.listMeta}>
                    Tap a row to toggle completion.
                  </Text>
                ) : null}
              </View>
            </View>
          }
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundOrbTop: {
    position: "absolute",
    top: -80,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: theme.colors.canvas,
  },
  backgroundOrbBottom: {
    position: "absolute",
    bottom: 40,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.accentTint,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    flexGrow: 1,
  },
  headerBlock: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  heroCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceStrong,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 5,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  summary: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statCardAccent: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 2,
  },
  statValueAccent: {
    color: theme.colors.white,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  statLabelAccent: {
    color: "#dcece6",
  },
  listHeader: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  listTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: theme.colors.text,
  },
  listMeta: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
    color: theme.colors.textSubtle,
  },
});
