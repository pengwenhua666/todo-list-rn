import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTodoModal } from "../components/AddTodoModal";
import { TodoItem } from "../components/TodoItem";
import { useTodo } from "../contexts/TodoContext";

export default function Index() {
  const router = useRouter();
  const { todos, loading, addTodo, deleteTodo, updateTodoStatus, deleteBatch } =
    useTodo();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleAddTodo = (title: string, description?: string) => {
    addTodo(title, description);
  };

  const handleGoToDetail = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const handleSelectTodo = (id: string, isSelected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (isSelected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleStatusToggle = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newStatus = todo.status === "completed" ? "pending" : "completed";
    const actionText = newStatus === "completed" ? "完成" : "未完成";

    Alert.alert(
      "切换任务状态",
      `确定要将任务标记为${actionText}吗？`,
      [
        { text: "取消", style: "cancel" },
        {
          text: "确定",
          onPress: () => {
            updateTodoStatus(id, newStatus);
          },
        },
      ]
    );
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert("删除任务", "确定要删除这个任务吗？", [
      { text: "取消", style: "cancel" },
      {
        text: "删除",
        style: "destructive",
        onPress: () => {
          deleteTodo(id);
          setSelectedIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        },
      },
    ]);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    Alert.alert(
      "删除任务",
      `确定要删除选中的 ${selectedIds.size} 个任务吗？`,
      [
        { text: "取消", style: "cancel" },
        {
          text: "删除",
          style: "destructive",
          onPress: () => {
            deleteBatch(Array.from(selectedIds));
            setSelectedIds(new Set());
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const emptyListMessage = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>暂无任务</Text>
      <Text style={styles.emptySubtext}>
        点击"+"按钮来添加新任务
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedIds.size === 0 && styles.buttonDisabled,
          ]}
          onPress={handleDeleteSelected}
          disabled={selectedIds.size === 0}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={selectedIds.size > 0 ? "#FF3B30" : "#C7C7CC"}
          />
          <Text
            style={[
              styles.buttonText,
              selectedIds.size === 0 && styles.buttonTextDisabled,
            ]}
          >
            删除选中 ({selectedIds.size})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onPress={() => handleGoToDetail(item.id)}
            onStatusToggle={() => handleStatusToggle(item.id)}
            onSelect={(isSelected) => handleSelectTodo(item.id, isSelected)}
            onDelete={() => handleDeleteTodo(item.id)}
            isSelected={selectedIds.has(item.id)}
          />
        )}
        ListEmptyComponent={emptyListMessage}
        scrollEnabled={true}
      />

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonActive: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  buttonTextDisabled: {
    color: "#C7C7CC",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});

