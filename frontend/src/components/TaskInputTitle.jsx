import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"

export default function TaskInputTitle() {
    const { register, formState: { errors } } = useFormContext()
    return (
        <TextField label="Titulo" variant="outlined" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
    )
}