import { 
    CriarEmprestimoModel,
    EmprestimoCompletoModel
} from '../models/EmprestimoModel';
import {
    criarEmprestimoRP,
    buscarEmprestimoPorIdRP,
    livroJaFoiEmprestadoRP,
    devolucaoEmprestimoRP,
    buscarLivrosComEmprestimosAtivosPorIdCliente
} from '../repositories/EmprestimoRepository';
import { buscarLivroPorIdServ } from './LivroService';
import { buscarClientePorIdServ } from './ClienteService';
import configEmpresa from '../configuracoes_empresa.json';

// registra um novo empréstimo.
export async function criarEmprestimoServ(dados: CriarEmprestimoModel): Promise<EmprestimoCompletoModel> {

    if (!dados.id_cliente || dados.id_cliente <= 0) {
        throw new Error("❌ ID de cliente inválido.");
    }
    if (!dados.ids_livros || dados.ids_livros.length === 0) {
        throw new Error("❌ Necessário informar ao menos um livro para o empréstimo.");
    }

    if (configEmpresa.dias_de_emprestimo === undefined ||
        configEmpresa.max_livros_por_cliente === undefined) {
        throw new Error("Configurações do sistema ausentes no arquivo JSON. Contate o suporte.");
    }
    
    // validação de limite por pedido
    const emprestimoPedidoMaximo = configEmpresa.max_livros_por_emprestimo;
    if (emprestimoPedidoMaximo !== null && dados.ids_livros.length > emprestimoPedidoMaximo) {
        throw new Error(`❌ Limite de livros excedido. O máximo permitido por empréstimo é de ${emprestimoPedidoMaximo} livros.`);
    }

    const idsUnicos = new Set(dados.ids_livros);
    if (idsUnicos.size !== dados.ids_livros.length) {
        throw new Error("❌ A lista de livros contém IDs duplicados.");
    }

    // cliente precisa existir
    const cliente = await buscarClientePorIdServ(dados.id_cliente);
    if (!cliente) {
        throw new Error(`❌ Cliente com ID ${dados.id_cliente} não encontrado.`);
    }

    // validação de limite por cliente
    await clientePodeEmprestar(dados)

    // cada livro precisa existir e estar disponível
    for (const id_livro of dados.ids_livros) {
        const livroArray = await buscarLivroPorIdServ(id_livro);

        if (!livroArray || livroArray.length === 0) {
            throw new Error(`❌ O livro com ID ${id_livro} não foi encontrado no sistema.`);
        }

        const livro = livroArray[0];

        if (!configEmpresa.permitir_quantidade_livro_disponivel_negativo && livro.quantidade_estoque <= 0) {
            throw new Error(`❌ Estoque indisponível para o livro: "${livro.titulo}".`);
        }
    }

    // prazo de devolução
    const dias = dados.dias_para_devolucao ?? configEmpresa.dias_de_emprestimo;
    if (dias <= 0) {
        throw new Error("❌ O prazo de devolução deve ser maior que zero.");
    }

    const resultado = await criarEmprestimoRP({ ...dados, dias_para_devolucao: dias });
    if (!resultado) throw new Error("❌ Erro ao registrar o empréstimo.");
    return resultado;
}

async function clientePodeEmprestar(dados: CriarEmprestimoModel): Promise<void> {
    const limitePorCliente = configEmpresa.max_livros_por_cliente;
    // se empresa optar por não ter limite por cliente
    if (limitePorCliente === null) return;

    const livrosAtivoCliente = await buscarLivrosComEmprestimosAtivosPorIdCliente(dados.id_cliente);

    // se livroCliente não é null nem undefined -
    // quantidadeDeLivrosAtivos recebe a quantidade de length,
    // se não quantidadeDeLivrosAtivos recebe Zero
    const quantidadeDeLivrosAtivos = livrosAtivoCliente ? livrosAtivoCliente.livros.length : 0;
    const totalLivrosCliente = quantidadeDeLivrosAtivos + dados.ids_livros.length;

    if (totalLivrosCliente > limitePorCliente) {
        throw new Error(`❌ Limite de livros por cliente excedido. O máximo permitido é ${limitePorCliente}, e este cliente já possui ${quantidadeDeLivrosAtivos} livro(s) emprestado(s).`);
    }
}

export async function buscarEmprestimoPorIdServ(id_emprestimo: number): Promise<EmprestimoCompletoModel> {
    if (!id_emprestimo || id_emprestimo <= 0) {
        throw new Error("❌ Necessário informar um ID válido de empréstimo.");
    }

    const emprestimo = await buscarEmprestimoPorIdRP(id_emprestimo);
    if (!emprestimo) {
        throw new Error("❌ Nenhum empréstimo encontrado com o ID fornecido.");
    }
    return emprestimo;
}


export async function livroJaFoiEmprestadoServ(id_livro: number): Promise<boolean> {
    if (!id_livro || id_livro <= 0) {
        throw new Error("❌ Necessário informar um ID válido de livro.");
    }
    return await livroJaFoiEmprestadoRP(id_livro);
}

export async function devolucaoEmprestimoServ(id_emprestimo: number): Promise<EmprestimoCompletoModel> {
    if (!id_emprestimo || id_emprestimo <= 0) {
        throw new Error("❌ Necessário informar um ID válido de empréstimo.");
    }
    const emprestimo = await buscarEmprestimoPorIdRP(id_emprestimo);
    if (!emprestimo) {
        throw new Error("❌ Nenhum empréstimo encontrado com o ID fornecido.");
    }
    if (emprestimo.status === 'DEVOLVIDO') {
        throw new Error("❌ Empréstimo já devolvido.");
    }
    const resultado = await devolucaoEmprestimoRP(id_emprestimo);
    if (!resultado) throw new Error("❌ Erro ao registrar a devolução do empréstimo.");
    return resultado;
} 