
export type UserFormData = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    confirmPassword: string
    type: string
}

export type UserTouched = {
    name: boolean,
    email: boolean,
    cpf: boolean,
    password: boolean,
    confirmPassword: boolean
    type: boolean
}