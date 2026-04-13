import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  onStatusToggle: () => void;
  onSelect: (isSelected: boolean) => void;
  onDelete: () => void;
  isSelected: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  onStatusToggle,
  onSelect,
  onDelete,
  isSelected,
}) => {
  const statusIcon = todo.status === 'completed' ? 'checkmark-circle' : 'radio-button-off';
  const statusColor = todo.status === 'completed' ? '#34C759' : '#C7C7CC';
  const titleColor = todo.status === 'completed' ? '#999' : '#000';
  const titleDecoration = todo.status === 'completed' ? 'line-through' : 'none';

  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
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

      <TouchableOpacity
        style={styles.contentContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
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

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

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
