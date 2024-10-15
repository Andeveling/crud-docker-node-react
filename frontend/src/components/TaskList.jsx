import { Grid2 as Grid, Typography } from "@mui/material"
import TaskCard from "./TaskCard"
import { useTasks } from "../hooks/useTasks"

export default function TaskList() {
    const { state: { tasks }, loading } = useTasks()

    if (loading) {
        return <Typography variant="h5" align="center">Cargando...</Typography>
    }
    return (
        <>
            {tasks.length > 0 ? (
                <Grid container spacing={2} justifyContent={"center"}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Grid>
            ) :
                (<Typography variant="h5" align="center">No hay tareas disponibles</Typography>)
            }
        </>
    )
}