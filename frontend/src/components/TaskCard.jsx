import { Card, CardActions, CardContent, CardHeader, Grid2 as Grid, Switch, Typography } from "@mui/material"
import PropTypes from "prop-types"
import TaskMenu from "./TaskMenu"
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";

export default function TaskCard({ task }) {

  const { updateTasks } = useTasks();
  const [checked, setChecked] = useState(task.status === "completada")

  const handleChange = (event) => {
    const isCompleted = event.target.checked;
    setChecked(isCompleted);

    const newStatus = isCompleted ? "completada" : "pendiente";
    const updatedTask = {
        ...task,
        status: newStatus,
    };

    console.log(updatedTask);
    updateTasks(updatedTask);
};



  
    return (
        <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ minWidth: 360 }} item>
            <Card sx={ checked ? { opacity: 0.5 } : {} }>
                <CardHeader title={task.title} action={<TaskMenu task={task} />} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                        {checked ? "completada" : "pendiente"}
                    </Typography>
                  <Switch
                  checked={checked}
                  onChange={handleChange}
                  />
                </CardActions>
            </Card>
        </Grid>
    )
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }),
}