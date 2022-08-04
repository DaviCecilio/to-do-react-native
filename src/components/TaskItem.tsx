import React, { useEffect, useRef, useState } from "react"
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native"
import Icon from "react-native-vector-icons/Feather"

import trashIcon from "../assets/icons/trash/trash.png"
import { Task } from "./TasksList"

export interface TaskItemProps {
  task: Task
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (id: number, newTaskTitle: string) => void
}

export function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState<string>(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleToogleTaskDone() {
    toggleTaskDone(task.id)
  }

  function handleRemoveTask() {
    removeTask(task.id)
  }

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setIsEditing(false)

    setNewTaskTitle(task.title)
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle)

    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) textInputRef.current?.focus()
      else textInputRef.current?.blur()
    }
  }, [isEditing])

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={handleToogleTaskDone}
        >
          <View
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTaskTitle}
            editable={isEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            onChangeText={setNewTaskTitle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Icon name="edit" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          testID={`trash-${task.id}`}
          disabled={isEditing}
          onPress={handleRemoveTask}
        >
          <Image
            source={trashIcon}
            style={{
              opacity: isEditing ? 0.2 : 1,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  taskButton: {
    flex: 1,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
})
