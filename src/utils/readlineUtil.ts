import * as readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface OpcoesPergunta {
    aceitarVazio?: boolean;
    tipoRetorno?: 's' | 'i_zero' | 'i_null';
}

// 1. Assinatura para quando pedir STRING ("s")
export async function fazerPergunta(
    enunciado: string,
    opcoes?: { aceitarVazio?: boolean; tipoRetorno?: 's' }
): Promise<string>;

// 2. Assinatura para quando pedir NÚMERO INTEIRO com Zero quando receber "" ("i_zero")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'i_zero' }
): Promise<number>;

// 3. Assinatura para quando pedir NÚMERO INTEIRO com null ("i_null")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'i_null' }
): Promise<number | null>;

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
            // rl.question(enunciado, (resposta) => resolve(resposta));
            rl.question(enunciado, resolve);
        });

        let respostaLimpa = resposta.trim();

        if (respostaLimpa === "") {
            if (aceitarVazio) {
                if (tipoRetorno === "i_null") return null;
                if (tipoRetorno === "i_zero") return 0;
                return "";
            }
            console.error("❌ Campo é obrigatório.");
            continue;
        }

        if (tipoRetorno === "s") return respostaLimpa

        // Se entrar "R$ 1.234,56" vai sair 123456
        if (tipoRetorno == "i_zero" || tipoRetorno == "i_null") {
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
