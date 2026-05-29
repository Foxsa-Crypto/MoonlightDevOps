import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "../../../utils/Validation/dataRules/cpf";
import { updateUser } from "../../../services/realServices/user.service";
import { validateUser } from "../../../utils/Validation/Admin/ValidateUser";
import { getUserFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";

type UserType = "customer" | "admin";

export function useUserEditForm(initialData: {name: string, email: string, cpf: string, type: UserType}) {
    const navigate = useNavigate();


    const [fields, setFields] = useState({
        name: initialData.name,
        email: initialData.email,
        cpf: formatCPF(initialData.cpf),
        password: "",
        confirmPassword: "",
        type: initialData.type as UserType,
    });

    const selectOptions = [
        {
            value: "customer" as UserType,
            label: "Cliente"
        },
        {
            value: "admin" as UserType,
            label: "Admin"
        }
    ]

    const [touched, setTouched] = useState({
        name: false, email: false, cpf: false,
        password: false, confirmPassword: false, type: false
    });

    const [ui, setUi] = useState({
        showPassword: false, showConfirm: false,
        loading: false, submitted: false,
        success: false, apiError: null as string | null,
    });

    const { isValid } = validateUser(fields); // mesma validação
    const showErrors = getUserFormErrors(fields, touched, ui.submitted); // mesmos erros

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const setCpf = (value: string) => {
        setFields(prev => ({ ...prev, cpf: formatCPF(value) }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const toggleShowPassword = () =>
        setUi(prev => ({ ...prev, showPassword: !prev.showPassword }));

    const toggleShowConfirm = () =>
        setUi(prev => ({ ...prev, showConfirm: !prev.showConfirm }));

    const handleSubmit = async (id_user: number) => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            await updateUser(id_user,
            {      
                name: fields.name,
                email: fields.email,
                cpf: fields.cpf,
                password: fields.password,
                type: fields.type,
            });
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => navigate("/admin/users"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        fields, selectOptions, ui, showErrors,
        setField, setCpf, handleBlur,
        toggleShowPassword, toggleShowConfirm, handleSubmit
    };
}