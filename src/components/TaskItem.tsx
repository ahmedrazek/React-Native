import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../constants/theme";
import type { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View
      style={[
        styles.container,
        task.completed ? styles.containerCompleted : styles.containerActive,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          task.completed
            ? `Mark ${task.description} as incomplete`
            : `Mark ${task.description} as complete`
        }
        onPress={() => onToggle(task.id)}
        style={({ pressed }) => [styles.mainAction, pressed && styles.pressed]}
      >
        <View
          style={[
            styles.checkbox,
            task.completed && styles.checkboxCompleted,
          ]}
        >
          {task.completed ? <Text style={styles.checkboxMark}>Done</Text> : null}
        </View>

        <View style={styles.content}>
          <Text
            style={[
              styles.description,
              task.completed && styles.descriptionCompleted,
            ]}
          >
            {task.description}
          </Text>
          <Text
            style={[
              styles.meta,
              task.completed ? styles.metaCompleted : styles.metaActive,
            ]}
          >
            {task.completed ? "Completed" : "Open"}
          </Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete ${task.description}`}
        onPress={() => onDelete(task.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    marginBottom: 12,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 3,
  },
  containerActive: {
    backgroundColor: theme.colors.surface,
  },
  containerCompleted: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  mainAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.sm,
  },
  pressed: {
    opacity: 0.84,
  },
  checkbox: {
    width: 52,
    height: 32,
    borderRadius: theme.radius.pill,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.input,
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.accentSoft,
    borderColor: theme.colors.accent,
  },
  checkboxMark: {
    color: theme.colors.accentStrong,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.text,
    fontWeight: "600",
  },
  descriptionCompleted: {
    color: theme.colors.textMuted,
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  metaActive: {
    color: theme.colors.accent,
  },
  metaCompleted: {
    color: theme.colors.textSubtle,
  },
  deleteButton: {
    minHeight: 38,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.dangerSoft,
    backgroundColor: theme.colors.dangerSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonPressed: {
    opacity: 0.82,
  },
  deleteText: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
});
