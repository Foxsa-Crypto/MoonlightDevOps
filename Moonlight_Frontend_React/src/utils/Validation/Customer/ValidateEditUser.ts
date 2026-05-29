import { isPasswordConfirmed } from "../dataRules/confirmPass";
import { isCPFValid } from "../dataRules/cpf";
import { isNameValid } from "../dataRules/name";
import { getPasswordVerifiedLevel } from "../dataRules/password";

export function validateEditUser(data: {
    name: string,
    password: string,
    confirmPassword: string,
    cpf: string
}) {

    const { name, password, confirmPassword, cpf } = data;

    const nameValid = isNameValid(name);
    const strengthLevel = getPasswordVerifiedLevel(password);
    const passwordMatch = isPasswordConfirmed(password, confirmPassword);
    const cpfValid = isCPFValid(cpf);

    const isFormFilled = !!(
        name && name.length <= 16 && 
        password && password.length <= 16 &&
        confirmPassword &&
        cpf
    );

    
    const isPasswordValid = passwordMatch && strengthLevel > 4;

    const isValid = isFormFilled && isPasswordValid && nameValid && cpfValid ;

    return{
        isValid
    }


}