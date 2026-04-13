// 导入Expo Router的路由hooks
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// 导入SafeAreaView用于安全区域处理
import { SafeAreaView } from "react-native-safe-area-context";
// 导入Todo上下文hook
import { useTodo } from "../../contexts/TodoContext";

// 任务详情页面组件：显示单个任务的详细信息，支持状态切换和删除
export default function TodoDetail() {
  const router = useRouter();

  // 获取路由参数中的任务ID
  const { id } = useLocalSearchParams<{ id: string }>();

  // 从上下文获取任务相关状态和方法
  const { todos, loading, updateTodoStatus, deleteTodo } = useTodo();

  // 根据ID查找当前任务
  const todo = todos.find((t) => t.id === id);

  // 加载状态显示
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  // 任务不存在时的错误显示
  if (!todo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>任务不存在</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>返回列表</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 根据任务状态确定显示文本和颜色
  const statusText = todo.status === "completed" ? "已完成" : "未完成";
  const statusColor = todo.status === "completed" ? "#34C759" : "#FF9500";

  // 任务状态切换
  const handleStatusToggle = () => {
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
            updateTodoStatus(todo.id, newStatus);
          },
        },
      ]
    );
  };

  // 任务删除
  const handleDelete = () => {
    Alert.alert("删除任务", "确定要删除这个任务吗？", [
      { text: "取消", style: "cancel" },
      {
        text: "删除",
        style: "destructive",
        onPress: () => {
          deleteTodo(todo.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 任务标题部分 */}
        <View style={styles.section}>
          <Text style={styles.label}>任务标题</Text>
          <Text style={styles.title}>{todo.title}</Text>
        </View>

        {/* 任务状态部分 */}
        <View style={styles.section}>
          <Text style={styles.label}>状态</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusColor + "20" },
              ]}
            >
              <Text style={[styles.statusBadgeText, { color: statusColor }]}>
                {statusText}
              </Text>
            </View>
          </View>
        </View>

        {/* 任务描述部分 */}
        {todo.description ? (
          <View style={styles.section}>
            <Text style={styles.label}>任务描述</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>{todo.description}</Text>
            </View>
          </View>
        ) : null}

        {/* 操作按钮部分 */}
        <View style={styles.section}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.statusButton]}
              onPress={handleStatusToggle}
            >
              <Text style={styles.buttonText}>
                {todo.status === "completed"
                  ? "标记为未完成"
                  : "标记为已完成"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteBtn]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteBtnText}>删除任务</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// 样式定义
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 32,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  descriptionBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  actionButtons: {
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statusButton: {
    backgroundColor: "#007AFF",
  },
  deleteBtn: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  backBtn: {
    paddingVertical: 10,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    marginBottom: 16,
  },
});
