import { Stack, Typography } from "@mui/material"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { useSeo } from "../hooks/useSeo"

export default function TodoPage() {
    useSeo({ title: "Lista de Tareas" })
    return (
        <Stack spacing={2} direction={"column"} sx={{ maxWidth: 800, margin: "auto" }}>
            <Typography variant="h1">
                Lista de Tareas
            </Typography>
            <TaskForm />
            <TaskList />
        </Stack>
    )
}