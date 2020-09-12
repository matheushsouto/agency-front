import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

export function emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true});
        }
    };
}

export function dateValidator(AC: AbstractControl) {
    const year = AC.value.split('-')[0];
    const fullYear = new Date().getFullYear();
    const dateInitial = fullYear - 10;
    const dateFinal = fullYear + 10;

    if (AC && AC.value && (year < dateInitial || year > dateFinal)) {
        return {dateValidator: true};
    }
    return null;
}


export function cpfValidator(AC: AbstractControl) {
    const cpf = AC.value;

    if (!AC || !AC.value) {
        return null;
    }

    let numeros, digitos, soma, i, resultado;
    let digitos_iguais = 1;
    if (cpf.length < 11) {
        return {cpfValidator: true};
    }
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (digitos_iguais) {
        return {cpfValidator: true};
    }

    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) {
        soma += numeros.charAt(10 - i) * i;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        return {cpfValidator: true};
    }
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--) {
        soma += numeros.charAt(11 - i) * i;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        return {cpfValidator: true};
    }
    return null;

}

export function cnpjValidator(AC: AbstractControl) {
    const cnpj = AC.value;

    if (!AC || !AC.value) {
        return null;
    }

    if (cnpj.length != 14) {
        return {cnpjValidator: true};
    }

    let digitos_iguais = 1;
    for (let i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (digitos_iguais) {
        return {cnpjValidator: true};
    }

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        return {cnpjValidator: true};
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        return {cnpjValidator: true};
    }

    return null;
}
