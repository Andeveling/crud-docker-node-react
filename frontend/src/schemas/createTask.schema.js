import * as yup from "yup"

export const createTaskSchema = yup.object({
  title: yup.string("El campo debe ser un string")
    .min(3, "El campo debe tener al menos 3 caracteres")
    .max(100, "El campo puede tener al menos 100 caracteres")
    .required("El campo es requerido"),
  description: yup.string().required("El campo es requerido"),
})
