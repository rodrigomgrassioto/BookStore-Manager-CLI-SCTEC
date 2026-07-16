// Tratamentos de erro proveniente do DB para as entidades do sistema Autor, Livro e Cliente
export function tratarErroBanco(error: any): void {
    switch (error.code) {
        case '23505': // Unique Violation
            console.error("❌ Já existe um registro cadastrado com esses dados.");
            break;
        case '23503': // Foreign Key Violation
            console.error("❌ Operação inválida: o ID referenciado não existe ou este registro está sendo usado por outra tabela.");
            break;
        case '23001':
            console.error("❌ Registro não pode ser modificado devido a registro usando em outra tabela.");
            break;
        case '23502': // Not Null Violation
            console.error("❌ Campo obrigatório não preenchido.");
            break;
        case '23514': // Check Violation
            console.error("❌ Os dados fornecidos não atendem às regras de validação do sistema.");
            break;
        case '22P02': // Invalid Text Representation
            console.error("❌ Formato de dado inválido enviado para o banco (ex: texto onde deveria ser número/UUID).");
            break;
        case '22001': // String Data Right Truncation
            console.error("❌ O texto enviado ultrapassa o limite de caracteres permitido para este campo.");
            break;
        case '08006': // Connection Failure
        case '57P01': // Admin Shutdown
            console.error("❌ Erro de comunicação: Não foi possível conectar ao banco de dados.");
            break;
        default:
            // Exibe a mensagem genérica do banco caso seja outro erro (ex: falha de conexão)
            console.error(`❌ Erro inesperado no banco de dados (${error.code}): ${error.message}.`);
    };
};