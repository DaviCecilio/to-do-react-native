import React, { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"

import { Header } from "../components/Header"
import { Task, TasksList } from "../components/TasksList"
import { TodoInput } from "../components/TodoInput"

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return

    if (tasks.find((task) => task.title === newTaskTitle))
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    else {
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks((oldState) => [...oldState, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id)
        return {
          ...task,
          done: !task?.done,
        }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id)
        return {
          ...task,
          title: newTaskTitle,
        }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const newTasks = tasks.filter((task) => task.id !== id)

            setTasks(newTasks)
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
})
