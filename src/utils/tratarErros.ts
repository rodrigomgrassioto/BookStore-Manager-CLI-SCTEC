import {erroMsg} from "../estilos/estilo";

export function tratarErro(error: any, mensagemPadrao: string): void {
    if (error.code) tratarErroBanco(error); // Erro no PostgreSQL
    else erroMsg(error.message || mensagemPadrao); // Erro do service
}

// Tratamentos de erro do DB para todas entidades do sistema
export function tratarErroBanco(error: any): void {
    
    switch (error.code) {
        case '23505': // Unique Violation
            erroMsg("Já existe um registro cadastrado com esses dados.");
            break;

        case '23503': // Foreign Key Violation
            erroMsg("Operação inválida: o ID referenciado não existe ou este registro está sendo usado por outra tabela.");
            break;

        case '23001':
            erroMsg("Registro não pode ser modificado devido a registro usando em outra tabela.");
            break;

        case '23502': // Not Null Violation
            erroMsg("Campo obrigatório não preenchido.");
            break;

        case '23514': // Check Violation
            erroMsg("Os dados fornecidos não atendem às regras de validação do sistema.");
            break;

        case '22P02': // Invalid Text Representation
            erroMsg("Formato de dado inválido enviado para o banco (ex: texto onde deveria ser número/UUID).");
            break;

        case '22001': // String Data Right Truncation
            erroMsg("O texto enviado ultrapassa o limite de caracteres permitido para este campo.");
            break;

        case '08006': // Connection Failure
        case '57P01': // Admin Shutdown
            erroMsg("Erro de comunicação: Não foi possível conectar ao banco de dados.");
            break;

        default:
            erroMsg(`Erro inesperado no banco de dados (${error.code}): ${error.message}.`);
    };
};