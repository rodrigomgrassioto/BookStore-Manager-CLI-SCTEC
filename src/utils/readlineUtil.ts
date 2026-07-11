import * as readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface OpcoesPergunta {
    aceitarVazio?: boolean;
    tipoRetorno?: 's' | 'i';
}

/**
 * Faz uma pergunta no terminal. Por padrão, o campo é obrigatório.
 * Para tornar o campo opcional, passe { aceitarVazio: true } como segundo argumento.
 * Para tornar como numero inteiro, passe { tipoRetorno: "i" } como segundo argumento.
 */
export async function fazerPergunta(
    enunciado: string,
    opcoes: OpcoesPergunta = {}
): Promise<string |number | null> {
    const aceitarVazio = opcoes.aceitarVazio ?? false;
    const tipoRetorno = opcoes.tipoRetorno ?? "s";
    while (true) {
        // Cria a Promise para ler a linha do terminal
        const resposta = await new Promise<string>((resolve) => {
            rl.question(enunciado, (resposta) => resolve(resposta));
        });

        let respostaLimpa = resposta.trim();

        // Se não aceita vazio e usuário deixou em branco
        if (respostaLimpa === "") {
            if (aceitarVazio) {
                return tipoRetorno === "i" ? null : ""; // Evita NaN
            }
            console.error("❌ Campo é obrigatório.");
            continue;
        }

        if (tipoRetorno == "s") return respostaLimpa

        // Se entrar "R$ 1.234,56" vai sair 123456
        if (tipoRetorno == "i") {
            const apenasNumeros = respostaLimpa.replace(/\D/g, ''); // mantém apenas números
            if (apenasNumeros === "") {
                console.error("❌ Digite um número válido.");
                continue;
            }
            return parseInt(apenasNumeros, 10);
        }
        // se não entrar em nenhum if
        console.error("❌ Tipo inválido.");
    }
}
