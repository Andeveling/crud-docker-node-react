import { Card, CardContent, CardHeader, Grid2 as Grid, Typography } from "@mui/material"
import PropTypes from "prop-types"
import TaskMenu from "./TaskMenu"

export default function TaskCard({ task }) {
    return (
        <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ minWidth: 360 }}>
            <Card>
                <CardHeader title={task.title} action={<TaskMenu task={task} />} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {task.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
}