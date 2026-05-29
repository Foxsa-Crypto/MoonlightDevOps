import { isPasswordConfirmed } from "../../dataRules/confirmPass";
import { isCPFValid } from "../../dataRules/cpf";
import { isEmailValid } from "../../dataRules/email";
import { isNameValid } from "../../dataRules/name";
import { getPasswordVerifiedLevel } from "../../dataRules/password";
import { isUserTypeValid } from "../../dataRules/userType";
import type { UserFormData, UserTouched } from "./formErrorsTypesAdmin";

export function getUserFormErrors(data: UserFormData, touched: UserTouched, submitted: boolean){
     /* validações para mostrar erro */
    const nameValid = isNameValid(data.name);
    const cpfValid = isCPFValid(data.cpf);
    const emailValid = isEmailValid(data.email);
    const strengthLevel = getPasswordVerifiedLevel(data.password);
    const passwordMatch = isPasswordConfirmed(data.password, data.confirmPassword);
    const typeValid = isUserTypeValid(data.type);
    
    return {
        showErrorUser: (touched.name || submitted) && !nameValid,
        showErrorEmail: (touched.email || submitted) && !emailValid,
        showErrorCpf: (touched.cpf || submitted) && !cpfValid,
        showErrorPassword: (touched.password || submitted) && strengthLevel < 5,
        showErrorConfirmPass: (touched.confirmPassword || submitted) && !passwordMatch,
        showErrorUserType: (touched.type || submitted) && !typeValid
    }
}


