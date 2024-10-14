import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useTasks } from "../hook/useTasks"
import { createTaskSchema } from "../schemas/createTask.schema"
import TaskInputTitle from "./TaskInputTitle"
import PropTypes from "prop-types"


export default function TaskForm({ task }) {
    const isEdit = typeof task?.id === "number"

    const methods = useForm({
        resolver: yupResolver(createTaskSchema),
        defaultValues: {
            id: task?.id ?? null,
            title: task?.title ?? "",
            description: task?.description ?? "",
        }
    })


    const { addTask, updateTasks } = useTasks()

    const onSubmit = async (data) => {
        console.log(data)
        if (data.id) {
            updateTasks(data)
        } else {
            const newTask = {
                title: data.title,
                description: data.description,
            }
            addTask(newTask)
        }

        methods.reset()

    }

    const onError = (errors) => {
        console.log("Errors :: ", errors)
    }
    return (
        <FormProvider {...methods}>
            <Card component={"form"} variant="outlined" onSubmit={methods.handleSubmit(onSubmit, onError)}>
                <CardHeader title={isEdit ? "Formulario de actualización de tareas" : "Formulario de creación de tareas"} />
                <CardContent>
                    <Stack direction={"column"} spacing={2}>
                        <TaskInputTitle />
                        <Controller
                            name="description"
                            control={methods.control}
                            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                                <TextField
                                    label="Descripción"
                                    variant="outlined"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    inputRef={ref}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button type="submit" variant="contained">{
                        isEdit ? "Actualizar" : "Crear"
                    }</Button>
                </CardActions>
            </Card>
        </FormProvider>
    )
}

TaskForm.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
}