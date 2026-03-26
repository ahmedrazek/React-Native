import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "../constants/theme";

type TaskComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  hasError: boolean;
  errorMessage?: string | null;
  isAddDisabled: boolean;
};

export default function TaskComposer({
  value,
  onChangeText,
  onSubmit,
  hasError,
  errorMessage,
  isAddDisabled,
}: TaskComposerProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.label}>Add a task</Text>
          <Text style={styles.caption}>Short and clear works best.</Text>
        </View>
        <View style={styles.helperBadge}>
          <Text style={styles.helperBadgeText}>120 max</Text>
        </View>
      </View>

      <View style={[styles.row, hasError && styles.rowError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder="Write a short task description"
          placeholderTextColor={theme.colors.textSubtle}
          style={styles.input}
          returnKeyType="done"
          maxLength={120}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add task"
          onPress={onSubmit}
          disabled={isAddDisabled}
          style={({ pressed }) => [
            styles.button,
            isAddDisabled && styles.buttonDisabled,
            pressed && !isAddDisabled && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      {hasError ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 4,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  helperBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accentTint,
  },
  helperBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.accent,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.input,
  },
  rowError: {
    borderColor: theme.colors.danger,
  },
  input: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 16,
  },
  button: {
    minHeight: 44,
    minWidth: 74,
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
  errorText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.danger,
    fontSize: 13,
    paddingHorizontal: 2,
  },
});
