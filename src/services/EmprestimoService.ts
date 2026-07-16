import { 
    CriarEmprestimoModel,
    EmprestimoCompletoModel
} from '../models/EmprestimoModel';
import {
    criarEmprestimoRP,
    buscarEmprestimoPorIdRP,
    livroJaFoiEmprestadoRP,
    devolucaoEmprestimoRP
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

    const idsUnicos = new Set(dados.ids_livros);
    if (idsUnicos.size !== dados.ids_livros.length) {
        throw new Error("❌ A lista de livros contém IDs duplicados.");
    }

    // cliente precisa existir
    await buscarClientePorIdServ(dados.id_cliente);

    // cada livro precisa existir e estar disponível (sem empréstimo ATIVO no momento)
    for (const id_livro of dados.ids_livros) {
        const livro = await buscarLivroPorIdServ(id_livro);
        if (!livro || livro.length === 0) {
            throw new Error(`❌ O livro de ID ${id_livro} não existe.`);
        }

        const estaEmprestado = await livroJaFoiEmprestadoRP(id_livro);
        if (estaEmprestado) {
            throw new Error(`❌ O livro de ID ${id_livro} já está emprestado e não está disponível.`);
        }
    }

    // 4. Prazo de devolução
    const dias = dados.dias_para_devolucao ?? configEmpresa.dias_padrao_emprestimo;
    if (dias <= 0) {
        throw new Error("❌ O prazo de devolução deve ser maior que zero.");
    }
    const resultado = await criarEmprestimoRP({ ...dados, dias_para_devolucao: dias });
        if (!resultado) throw new Error("❌ Erro ao registrar o empréstimo.");
    return resultado;
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