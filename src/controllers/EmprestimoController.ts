import * as readline from 'readline';
import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { exibirEmprestimosDetalhadoTabela, exibirLivrosTabela} from "../utils/formatadoresTexto";
import { tratarErroBanco } from "../utils/tratamentosErrosBD";
import { criarEmprestimoServ, devolucaoEmprestimoServ, buscarEmprestimoPorIdServ } from '../services/EmprestimoService';
import configEmpresa from '../configuracoes_empresa.json'
import { listarClientesServ } from '../services/ClienteService';
import { listarLivrosServ } from '../services/LivroService';

export async function criarEmprestimoController(): Promise<void> {
    console.log("\n=== REGISTRAR NOVO EMPRÉSTIMO ===");

    const clientes =  await listarClientesServ();
    console.table(clientes);       
    const id_cliente = await fazerPergunta("Digite o ID do cliente: ", { tipoRetorno: "i_zero" });
    const livros = await listarLivrosServ();
    exibirLivrosTabela(livros);
    const ids_livros = await fazerPergunta("Digite os IDs dos livros separados por vírgula (ex: 5, 6, 10): ");

    try {
        const entradaLivros = converterIdsLivros(ids_livros); // FUNÇÃO PARA CONVERTER IDS DE LIVROS EM ARRAY DE NÚMEROS

        const emprestimo = await criarEmprestimoServ({
            id_cliente,
            ids_livros: entradaLivros,
            dias_para_devolucao: configEmpresa.dias_de_emprestimo
        });

        console.log("\n🎉 Empréstimo registrado com sucesso!");
        exibirEmprestimosDetalhadoTabela([emprestimo]);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao criar o empréstimo.");
        console.log("========================================\n");
    }; 
};

export async function buscarEmprestimoPorIdController(): Promise<void> {
   console.log("\n=== BUSCAR EMPRESTIMO POR ID ===");

    // Imput do usuário
    const id = await fazerPergunta("Digite o ID do empréstimo: ", { tipoRetorno: "i_zero" });

    try {
        const emprestimo = await buscarEmprestimoPorIdServ(id);
        exibirEmprestimosDetalhadoTabela([emprestimo]);
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o empréstimo.");
        console.log("========================================\n");
    }; 
};

export async function devolverEmprestimoController(): Promise<void> {
    console.log("\n=== DEVOLVER EMPRÉSTIMO ===");

    // Imput do usuário
    const id_emprestimo = await fazerPergunta("Digite o ID do empréstimo: ", { tipoRetorno: "i_zero" });

    try {
        const emprestimo = await buscarEmprestimoPorIdServ(id_emprestimo);

        exibirEmprestimosDetalhadoTabela([emprestimo]);

        if (emprestimo.status === "DEVOLVIDO") {
            console.log("\n❌ Este empréstimo já foi devolvido.");
            return;
        }

        console.log("\n⚠️ A devolução será registrada para todos os livros deste empréstimo.");

        const confirmacao = await fazerPergunta("Confirmar devolução? (S/N): ");

        if (confirmacao.toLowerCase() !== "s") {
            console.log("\nOperação cancelada.");
            return;
        }

        const emprestimoDevolvido = await devolucaoEmprestimoServ(id_emprestimo);

        console.log("\n🎉 Devolução registrada com sucesso!");
        console.log(`ID Empréstimo: "${id_emprestimo}" | Status: "${emprestimoDevolvido.status}"`)
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao devolver o empréstimo.");
        console.log("========================================\n");
    };
};

// Avaliar onde colcoar essa função, mas por enquanto deixo aqui no controller mesmo
function converterIdsLivros(entrada: string): number[] {
    const partes = entrada
        .split(",")
        .map(parte => parte.trim());

    const ids = partes.map(Number);

    const possuiIdInvalido = ids.some(id => !Number.isInteger(id) || id <= 0);

    if (possuiIdInvalido) {
        throw new Error(
            "❌ Informe apenas IDs inteiros positivos separados por vírgula."
        );
    };
    return ids;
};