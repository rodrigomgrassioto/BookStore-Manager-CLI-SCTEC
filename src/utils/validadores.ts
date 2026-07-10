// Função de validação do ISBN do livro
export function validarISBN(isbn: string): boolean {
    // 1. Remove hifens, espaços ou letras (mantém só números)
    const numeros = isbn.replace(/[^0-9]/g, "");

    // 2. O ISBN-13 precisa ter exatamente 13 dígitos e começar com 978 ou 979
    if (numeros.length !== 13 || (!numeros.startsWith("978") && !numeros.startsWith("979"))) {
        return false;
    }

    // 3. Aplica o cálculo matemático (Algoritmo oficial do ISBN)
    let soma = 0;
    for (let i = 0; i < 12; i++) {
        const digito = parseInt(numeros[i]);
        // Multiplica por 1 se for posição par, por 3 se for ímpar
        soma += i % 2 === 0 ? digito * 1 : digito * 3;
    }

    const resto = soma % 10;
    let digitoVerificadorEsperado = 10 - resto;
    if (digitoVerificadorEsperado === 10) digitoVerificadorEsperado = 0;

    const digitoVerificadorReal = parseInt(numeros[12]);

    // Retorna true se a conta bater com o último dígito do código enviado
    return digitoVerificadorEsperado === digitoVerificadorReal;
}



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////// validadores para cadastro de clientes ////////////
///////////////////////////////////////////////////////////////

export function emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function telefoneValido(telefone: string): boolean {
    return /^\d{10,11}$/.test(telefone);
}

export function nomeValido(nome: string): boolean {
    return /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
}

export function dataNascimentoValida(data: Date): boolean {
    // Garante que a data não está no futuro e é uma data real/válida
    return data <= new Date() && !isNaN(data.getTime());
}

export function dataNascimentoMaior18Anos(data: Date): boolean {
    if (!dataNascimentoValida(data)) return false;
    const hoje = new Date();
    const data18AnosAtras = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    return data <= data18AnosAtras;
}

export function clienteValidoParaBusca(nome: string): boolean {
    return nome !== undefined && nome.trim().length > 0 && nomeValido(nome);
}

export function clienteValidoParaExclusao(id_cliente: number): boolean {
    return id_cliente !== undefined && id_cliente > 0 && Number.isInteger(id_cliente);
}

export function camposObrigatoriosPreenchidos(nome: string, email: string, telefone: string, data_nascimento: Date): boolean {
    return (
        !!nome && nome.trim().length > 0 &&
        !!email && email.trim().length > 0 &&
        !!telefone && telefone.trim().length > 0 &&
        !!data_nascimento
    );
}

//////////////////////////////////////////////////
////////////           FIM            ////////////
//////////////////////////////////////////////////