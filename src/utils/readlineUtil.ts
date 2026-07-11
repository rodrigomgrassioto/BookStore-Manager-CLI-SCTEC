import * as readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface OpcoesPergunta {
    aceitarVazio?: boolean;
}

/**
 * Faz uma pergunta no terminal. Por padrão, o campo é obrigatório.
 * Para tornar o campo opcional, passe { aceitarVazio: true } como segundo argumento.
 */
export async function fazerPergunta(
    enunciado: string,
    opcoes: OpcoesPergunta = { aceitarVazio: false }
) {
    let continua = true
    while (continua) {
        // Cria a Promise para ler a linha do terminal
        const resposta = await new Promise<string>((resolve) => {
            rl.question(enunciado, (resposta) => resolve(resposta));
        });
        console.log(enunciado);
        return "fasfas";


        const respostaLimpa = resposta.trim();

        // Se aceita vazio OU se o usuário digitou algo válido
        if (opcoes.aceitarVazio || respostaLimpa !== "") {
            continua = false;
            console.log("contunua status: " + continua);
            return respostaLimpa; // Retorna a string (pode ser "" se aceitarVazio for true)
        }

        // Condição 2: Se caiu aqui, o campo era obrigatório e o usuário mandou vazio
        console.log("❌ Este campo é obrigatório.");
    } while (continua);
}
