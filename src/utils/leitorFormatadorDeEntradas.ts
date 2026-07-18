import * as readline from 'readline';
import {pergunta} from "../estilos/estilo";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface OpcoesPergunta {
    aceitarVazio?: boolean;
    tipoRetorno?: 's' | 'i_zero' | 'i_null' | 'd' | 'd_null';
    valorOriginal?: string | number | Date | null;
}

// 1. Assinatura para quando pedir STRING ("s")
export async function fazerPergunta(
    enunciado: string,
    opcoes?: { aceitarVazio?: boolean; tipoRetorno?: 's'; valorOriginal?: string | number | Date | null; }

): Promise<string>;

// 2. Assinatura para quando pedir NÚMERO INTEIRO com Zero quando receber "" ("i_zero")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'i_zero' ; valorOriginal?: string | number | Date | null; }
): Promise<number>;

// 3. Assinatura para quando pedir NÚMERO INTEIRO com null ("i_null")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'i_null' ; valorOriginal?: string | number | Date | null; }
): Promise<number | null>;

// 4. Assinatura para quando pedir DATE obrigatório ("d")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'd'; valorOriginal?: string | number | Date | null; }
): Promise<Date>;

// 5. Assinatura para quando pedir DATE opcional retornando null ("d_null")
export async function fazerPergunta(
    enunciado: string,
    opcoes: { aceitarVazio?: boolean; tipoRetorno: 'd_null'; valorOriginal?: string | number | Date | null; }
): Promise<Date | null>;

/**
 * Faz uma pergunta no terminal. Por padrão, o campo é obrigatório.
 * Para tornar o campo opcional, passe { aceitarVazio: true } como segundo argumento.
 * Para tornar como numero inteiro, passe { tipoRetorno: "i" } como segundo argumento.
 */
export async function fazerPergunta(
    enunciado: string,
    opcoes: OpcoesPergunta = {}
): Promise<string | number | Date | null> {
    const aceitarVazio = opcoes.aceitarVazio ?? false;
    const tipoRetorno = opcoes.tipoRetorno ?? "s";
    const valorOriginal = opcoes.valorOriginal;
    while (true) {
        // Cria a Promise para ler a linha do terminal
        // const resposta = await new Promise<string>((resolve) => {
        //     // rl.question(enunciado, (resposta) => resolve(resposta));
        //     rl.question(enunciado, resolve);
        // });
        // process.stdout.write(enunciado);
        // console.log(enunciado);
        pergunta(enunciado);

        if (valorOriginal !== undefined && valorOriginal !== null) {
            rl.write(String(valorOriginal));
        }

        // Captura a linha digitada (ou modificada) pelo usuário
        const resposta = await new Promise<string>((resolve) => {
            rl.once('line', resolve); // Ouve a próxima linha enviada
        });

        let respostaLimpa = resposta.trim();

        if (respostaLimpa === "") {
            if (aceitarVazio) {
                if (tipoRetorno === "i_null") return null;
                if (tipoRetorno === "i_zero") return 0;
                if (tipoRetorno === "d_null") return null;
                if (tipoRetorno === "s") return "";
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

        // Tratamento para Datas (espera o formato DD/MM/AAAA ou DD-MM-AAAA)
        if (tipoRetorno === "d" || tipoRetorno === "d_null") {
            // Expressão regular simples para validar formato DD/MM/AAAA
            const regexData = /^(\d{2})[-/](\d{2})[-/](\d{4})$/;
            const match = respostaLimpa.match(regexData);

            if (!match) {
                console.error("❌ Digite uma data válida no formato DD/MM/AAAA.");
                continue;
            }

            const dia = parseInt(match[1], 10);
            const mes = parseInt(match[2], 10) - 1; // Meses no JS começam em 0
            const ano = parseInt(match[3], 10);

            const dataGerada = new Date(ano, mes, dia);

            // Valida se o JS não auto-corrigiu uma data inválida (ex: 31/02 vira 03/03)
            if (
                dataGerada.getFullYear() !== ano ||
                dataGerada.getMonth() !== mes ||
                dataGerada.getDate() !== dia
            ) {
                console.error("❌ Data inválida. Certifique-se de que o dia e mês existem.");
                continue;
            }

            return dataGerada;
        }
        // se não entrar em nenhum if
        console.error("❌ Tipo inválido.");
    }
}
