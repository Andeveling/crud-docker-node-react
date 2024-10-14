import PropTypes from "prop-types"
import { createContext, useEffect, useReducer, useState } from "react"
import { createTask, getTasks, updateTask, deleteTask } from "../services/task.service"

// reducer

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            }
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            }
        case "SET_ALL_TASKS":
            return {
                ...state,
                tasks: action.payload,
            }
        default:
            return state
    }
}

// Estado inicial
const initialState = { tasks: [] }


// Contexto
export const TodoContext = createContext(null)


export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTasks()
            .then((tasks) => {
                dispatch({
                    type: "SET_ALL_TASKS",
                    payload: tasks,
                })
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    const addTask = async (newTask) => {
        try {
            const task = await createTask(newTask)
            dispatch({
                type: "ADD_TASK",
                payload: task,
            })
        } catch (error) {
            console.log("Error :: ", error)
        }
    }

    const updateTasks = async (task) => {
        try {
            const updatedTask = await updateTask(task)
            dispatch({
                type: "UPDATE_TASK",
                payload: updatedTask,
            })
        } catch (error) {
            console.log("Error :: ", error)
        }
    }

    const deleteTasks = async (id) => {
        try {
            await deleteTask(id)
            dispatch({
                type: "DELETE_TASK",
                payload: id,
            })
        } catch (error) {
            console.log("Error :: ", error)
        }
    }

    const value = { state, error, loading, addTask, updateTasks, deleteTasks }
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}


TodoProvider.propTypes = {
    children: PropTypes.node.isRequired,
}