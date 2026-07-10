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
