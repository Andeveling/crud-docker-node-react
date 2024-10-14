import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"

// Hook para obtener el contexto
export const useTasks = () => {
    const context = useContext(TodoContext)
    if (context === null) {
        throw new Error("useTasks must be used within a TodoProvider")
    }
    return context
}