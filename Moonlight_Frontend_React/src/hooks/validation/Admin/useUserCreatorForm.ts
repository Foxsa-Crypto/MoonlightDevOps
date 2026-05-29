// hooks/validation/useAdminUserForm.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "../../../utils/Validation/dataRules/cpf";
import { createUser } from "../../../services/realServices/user.service";
import { validateUser } from "../../../utils/Validation/Admin/ValidateUser";
import { getUserFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";

export function useUserCreatorForm() {
    const navigate = useNavigate();

    type UserType = "customer" | "admin";

    const [fields, setFields] = useState({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
        type: "",
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

    const handleSubmit = async () => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            await createUser({      
                name: fields.name,
                email: fields.email,
                cpf: fields.cpf,
                password: fields.password,
                type: fields.type as UserType,
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