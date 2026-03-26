import { StyleSheet, Text, View } from "react-native";

import { theme } from "../constants/theme";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconShell}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>List</Text>
        </View>
      </View>
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.description}>
        Add your first task above to turn this into a working plan for the day.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 3,
  },
  iconShell: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.accentTint,
    marginBottom: theme.spacing.md,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.accentSoft,
  },
  badgeText: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: theme.colors.textMuted,
    maxWidth: 300,
  },
});
