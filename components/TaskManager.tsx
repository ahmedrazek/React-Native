import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = () => {
    if (taskDescription.trim() === "") {
      Alert.alert("Error", "Please enter a task description");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      description: taskDescription.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskDescription("");
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== taskId));
        },
      },
    ]);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setTaskDescription(task.description);
    setDialogVisible(true);
  };

  const updateTask = () => {
    if (taskDescription.trim() === "" || !editingTask) {
      Alert.alert("Error", "Please enter a task description");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, description: taskDescription.trim() }
          : task
      )
    );
    setDialogVisible(false);
    setTaskDescription("");
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setDialogVisible(false);
    setTaskDescription("");
    setEditingTask(null);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text variant="displaySmall" style={styles.title}>
            My Tasks
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Stay organized and productive
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBadge}>
            <Text variant="labelLarge" style={styles.statNumber}>
              {tasks.length}
            </Text>
            <Text variant="labelSmall" style={styles.statLabel}>
              Total
            </Text>
          </View>
          <View style={[styles.statBadge, styles.statBadgeActive]}>
            <Text variant="labelLarge" style={styles.statNumberActive}>
              {incompleteTasks.length}
            </Text>
            <Text variant="labelSmall" style={styles.statLabelActive}>
              Active
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="What needs to be done?"
          value={taskDescription}
          onChangeText={setTaskDescription}
          mode="outlined"
          style={styles.input}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
          activeOutlineColor="#6366f1"
          onSubmitEditing={addTask}
          placeholder="Enter a new task..."
          right={
            <TextInput.Icon
              icon="plus-circle"
              onPress={addTask}
              disabled={taskDescription.trim() === ""}
              size={28}
            />
          }
        />
      </View>

      <ScrollView
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>✓</Text>
            </View>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No tasks yet
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Add your first task above to get started on your journey to
              productivity!
            </Text>
          </View>
        ) : (
          <>
            {incompleteTasks.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Chip
                    icon="clock-outline"
                    style={styles.sectionChip}
                    textStyle={styles.sectionChipText}
                  >
                    To Do
                  </Chip>
                  <Text variant="labelLarge" style={styles.sectionCount}>
                    {incompleteTasks.length}
                  </Text>
                </View>
                <Divider style={styles.divider} />
                {incompleteTasks.map((task, index) => (
                  <TouchableOpacity key={task.id} activeOpacity={0.7}>
                    <Card
                      style={[
                        styles.taskCard,
                        index === 0 && styles.firstTaskCard,
                      ]}
                      mode="elevated"
                      elevation={2}
                    >
                      <Card.Content style={styles.taskContent}>
                        <TouchableOpacity
                          style={styles.taskRow}
                          onPress={() => toggleTaskComplete(task.id)}
                          activeOpacity={0.6}
                        >
                          <View style={styles.checkboxContainer}>
                            <Checkbox
                              status={task.completed ? "checked" : "unchecked"}
                              onPress={() => toggleTaskComplete(task.id)}
                              color="#6366f1"
                              uncheckedColor="#9ca3af"
                            />
                          </View>
                          <Text variant="bodyLarge" style={styles.taskText}>
                            {task.description}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.taskActions}>
                          <IconButton
                            icon="pencil"
                            size={22}
                            iconColor="#6366f1"
                            style={styles.actionButton}
                            onPress={() => openEditDialog(task)}
                          />
                          <IconButton
                            icon="delete-outline"
                            size={22}
                            iconColor="#ef4444"
                            style={styles.actionButton}
                            onPress={() => deleteTask(task.id)}
                          />
                        </View>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {completedTasks.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Chip
                    icon={({ size, color }) => (
                      <Icon source="check-circle" size={size} color="#10b981" />
                    )}
                    style={[styles.sectionChip, styles.completedChip]}
                    textStyle={[
                      styles.sectionChipText,
                      styles.completedChipText,
                    ]}
                  >
                    Completed
                  </Chip>
                  <Text variant="labelLarge" style={styles.sectionCount}>
                    {completedTasks.length}
                  </Text>
                </View>
                <Divider style={styles.divider} />
                {completedTasks.map((task, index) => (
                  <TouchableOpacity key={task.id} activeOpacity={0.7}>
                    <Card
                      style={[
                        styles.taskCard,
                        styles.completedTaskCard,
                        index === 0 && styles.firstTaskCard,
                      ]}
                      mode="elevated"
                      elevation={1}
                    >
                      <Card.Content style={styles.taskContent}>
                        <TouchableOpacity
                          style={styles.taskRow}
                          onPress={() => toggleTaskComplete(task.id)}
                          activeOpacity={0.6}
                        >
                          <View style={styles.checkboxContainer}>
                            <Checkbox
                              status={task.completed ? "checked" : "unchecked"}
                              onPress={() => toggleTaskComplete(task.id)}
                              color="#10b981"
                              uncheckedColor="#9ca3af"
                            />
                          </View>
                          <Text
                            variant="bodyLarge"
                            style={styles.completedTaskText}
                          >
                            {task.description}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.taskActions}>
                          <IconButton
                            icon="pencil"
                            size={22}
                            iconColor="#6366f1"
                            style={styles.actionButton}
                            onPress={() => openEditDialog(task)}
                          />
                          <IconButton
                            icon="delete-outline"
                            size={22}
                            iconColor="#ef4444"
                            style={styles.actionButton}
                            onPress={() => deleteTask(task.id)}
                          />
                        </View>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={cancelEdit}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>Edit Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Task description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              mode="outlined"
              autoFocus
              style={styles.dialogInput}
              activeOutlineColor="#6366f1"
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              onPress={cancelEdit}
              textColor="#6b7280"
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            <Button
              onPress={updateTask}
              mode="contained"
              buttonColor="#6366f1"
              style={styles.dialogButton}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerContent: {
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 80,
  },
  statBadgeActive: {
    backgroundColor: "#eef2ff",
  },
  statNumber: {
    color: "#6b7280",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
  },
  statNumberActive: {
    color: "#6366f1",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
  },
  statLabel: {
    color: "#9ca3af",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statLabelActive: {
    color: "#818cf8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  input: {
    backgroundColor: "#ffffff",
  },
  inputContent: {
    fontSize: 16,
  },
  inputOutline: {
    borderWidth: 1.5,
    borderRadius: 12,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    padding: 20,
    paddingTop: 16,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 40,
    color: "#6366f1",
    fontWeight: "300",
  },
  emptyTitle: {
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionChip: {
    backgroundColor: "#eef2ff",
    height: 32,
  },
  sectionChipText: {
    color: "#6366f1",
    fontWeight: "600",
    fontSize: 13,
  },
  completedChip: {
    backgroundColor: "#d1fae5",
  },
  completedChipText: {
    color: "#10b981",
  },
  sectionCount: {
    color: "#6b7280",
    fontWeight: "600",
  },
  divider: {
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
  },
  taskCard: {
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  firstTaskCard: {
    marginTop: 4,
  },
  completedTaskCard: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
    opacity: 0.9,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },
  checkboxContainer: {
    marginRight: 4,
  },
  taskText: {
    flex: 1,
    color: "#1f2937",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  completedTaskText: {
    flex: 1,
    textDecorationLine: "line-through",
    color: "#9ca3af",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  taskActions: {
    flexDirection: "row",
    gap: 4,
  },
  actionButton: {
    margin: 0,
  },
  dialog: {
    borderRadius: 16,
  },
  dialogTitle: {
    fontWeight: "600",
    color: "#1f2937",
  },
  dialogInput: {
    backgroundColor: "#ffffff",
  },
  dialogActions: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  dialogButton: {
    marginLeft: 8,
  },
});
