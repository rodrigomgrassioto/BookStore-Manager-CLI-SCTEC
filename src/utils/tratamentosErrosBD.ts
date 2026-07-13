// Tratamentos de erro proveniente do DB
export function tratarErroBanco(error: any): void {
    switch (error.code) {
        case '23505': // Unique Violation ->  falta incluir no DB constraint de UNIQUE no nome do autor
            console.error("❌ Já existe um autor cadastrado com este nome.");
            break;
        case '23503': // Foreign Key Violation
            console.error("❌ ID do Autor informado não existe no sistema.");
            break;
        case '23502': // Not Null Violation
            console.error("❌ Campo obrigatório não foi preenchido corretamente.");
            break;
        default:
            // Exibe a mensagem genérica do banco caso seja outro erro (ex: falha de conexão)
            console.error(`❌ Erro crítico no Banco de Dados ( ${error.code} ): ${error.message}`);
    };
};
