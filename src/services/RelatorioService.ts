import { livrosDisponiveisRP, livrosEmprestadosRP, livrosCadastradosPorAutorRP, quantidadeEmprestimosPorLivroRP, clientesComEmprestimosAtivosRP } from "../repositories/RelatoriosRepository";
import { LivroDisponivelModel, LivroEmprestadoModel, LivroPorAutorModel, EmprestimosPorLivroModel, ClienteComEmprestimoAtivoModel } from "../models/RelatorioModel";

export async function livrosDisponiveisServ(): Promise<LivroDisponivelModel[]> {
    const livros = await livrosDisponiveisRP();

    if (livros.length === 0) {
        throw new Error("❌ Nenhum livro disponível encontrado.");
    }

    return livros;
};

export async function livrosEmprestadosServ(): Promise<LivroEmprestadoModel[]> {
    const livros = await livrosEmprestadosRP();

    if (livros.length === 0) {
        throw new Error("❌ Nenhum livro emprestado encontrado.");
    }

    return livros;
};

export async function livrosCadastradosPorAutorServ(): Promise<LivroPorAutorModel[]> {
    const livrosPorAutor = await livrosCadastradosPorAutorRP();

    if (livrosPorAutor.length === 0) {
        throw new Error(
            "❌ Nenhum autor ou livro cadastrado foi encontrado."
        );
    }

    return livrosPorAutor;
};

export async function quantidadeEmprestimosPorLivroServ(): Promise<EmprestimosPorLivroModel[]> {
    const emprestimosPorLivro = await quantidadeEmprestimosPorLivroRP();

    if (emprestimosPorLivro.length === 0) {
        throw new Error(
            "❌ Nenhum livro foi encontrado para gerar o relatório."
        );
    }

    return emprestimosPorLivro;
};

export async function clientesComEmprestimosAtivosServ(): Promise<ClienteComEmprestimoAtivoModel[]> {
    const clientes = await clientesComEmprestimosAtivosRP();

    if (clientes.length === 0) {
        throw new Error(
            "❌ Nenhum cliente com empréstimo ativo foi encontrado."
        );
    }

    return clientes;
};