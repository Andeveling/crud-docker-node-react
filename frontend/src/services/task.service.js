import api from "../api/api"

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks")
    return response.data
  } catch (error) {
    console.log("Error :: ", error)
  }
}

export const createTask = async (task) => {
  try {
    const response = await api.post("/tasks", task)
    return response.data
  } catch (error) {
    console.log("Error :: ", error)
  }
}

export const updateTask = async (task) => {
  try {
    const response = await api.put(`/tasks/edit/${task.id}`, task)
    return response.data
  } catch (error) {
    console.log("Error :: ", error)
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  } catch (error) {
    console.log("Error :: ", error)
  }
}