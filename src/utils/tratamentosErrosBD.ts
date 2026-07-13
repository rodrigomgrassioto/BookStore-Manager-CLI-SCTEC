// Tratamentos de erro proveniente do DB para as entidades do sistema Autor, Livro e Cliente
export function tratarErroBanco(error: any): void {
    switch (error.code) {
        case '23505': // Unique Violation
            console.error("❌ Já existe cadastrado com este nome.");
            break;
        case '23503': // Foreign Key Violation
            console.error("❌ O ID informado não existe no sistema.");
            break;
        case '23502': // Not Null Violation
            console.error("❌ Campo obrigatório não foi preenchido corretamente.");
            break;
        default:
            // Exibe a mensagem genérica do banco caso seja outro erro (ex: falha de conexão)
            console.error(`❌ Erro crítico no Banco de Dados (${error.code}): ${error.message}.`);
    };
};
