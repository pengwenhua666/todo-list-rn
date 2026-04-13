// 导入Ionicons图标库
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Todo } from '../types/todo';

// 定义TodoItem组件的props接口
interface TodoItemProps {
  todo: Todo; // 任务数据
  onPress: () => void; // 点击任务时的回调
  onStatusToggle: () => void; // 切换状态时的回调
  onSelect: (isSelected: boolean) => void; // 选择/取消选择时的回调
  onDelete: () => void; // 删除任务时的回调
  isSelected: boolean; // 是否被选中
}

// TodoItem组件：显示单个任务项，支持选择、状态切换和删除
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  onStatusToggle,
  onSelect,
  onDelete,
  isSelected,
}) => {
  // 根据任务状态确定图标和颜色
  const statusIcon = todo.status === 'completed' ? 'checkmark-circle' : 'radio-button-off';
  const statusColor = todo.status === 'completed' ? '#34C759' : '#C7C7CC';
  const titleColor = todo.status === 'completed' ? '#999' : '#000';
  const titleDecoration = todo.status === 'completed' ? 'line-through' : 'none';

  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      {/* 选择复选框 */}
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => onSelect(!isSelected)}
      >
        <View 
          style={[
            styles.checkbox, 
            isSelected && styles.checkboxChecked
          ]}
        >
          {isSelected && (
            <Ionicons name="checkmark" size={16} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      {/* 任务内容区域 */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* 状态切换按钮 */}
        <TouchableOpacity
          style={styles.statusButton}
          onPress={(e) => {
            e.stopPropagation();
            onStatusToggle();
          }}
        >
          <Ionicons
            name={statusIcon as any}
            size={24}
            color={statusColor}
          />
        </TouchableOpacity>

        {/* 任务标题 */}
        <Text
          style={[
            styles.title,
            {
              color: titleColor,
              textDecorationLine: titleDecoration,
            },
          ]}
          numberOfLines={1}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      {/* 删除按钮 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  selectedContainer: {
    backgroundColor: '#f0f8ff',
  },
  checkboxContainer: {
    marginRight: 12,
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    paddingRight: 12,
    paddingVertical: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
