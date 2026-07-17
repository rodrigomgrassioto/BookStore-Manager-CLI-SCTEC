import { AutorModel } from "../models/AutorModel";
import { ClienteModel } from "../models/ClienteModel";
import { EmprestimoCompletoModel } from "../models/EmprestimoModel";
import {LivroCompletoModel} from "../models/LivroModel";
import { ClienteComEmprestimoAtivoModel, EmprestimosPorLivroModel, LivroDisponivelModel, LivroEmprestadoModel, LivroPorAutorModel } from "../models/RelatorioModel";
import {gerarTabela} from "./gerarTabela";

//para exibir a data no formato dd/mm/yyyy na data de nascimento de clientes
export function formatarDataPrompt(data?: Date | null): string {
    if (!data) return "";
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
};

export function exibirAutoresTabela(autores: AutorModel[]): void {
    // console.table(
    const autoresFormatado = autores.map(autor => ({
        ID: autor.id_autor,
        Nome: autor.nome,
        Nacionalidade: autor.nacionalidade ?? "-"
    }));
    gerarTabela(autoresFormatado);
};

export function exibirLivrosTabela(livros: LivroCompletoModel[]): void {
    const livrosFormatado = livros.map(livro => ({
            ID: livro.id_livro,
            Titulo: livro.titulo,
            ISBN: livro.isbn,
            Ano: livro.ano_publicacao ?? "-",
            Total: livro.quantidade_estoque,
            Empr: livro.quantidade_emprestada,
            Disp: livro.quantidade_disponivel,
            Autor: livro.autor.nome
        }));
    gerarTabela(livrosFormatado);
};

export function exibirClientesTabela(clientes: ClienteModel[]): void {
    const clientesFormatados = clientes.map(clientes => ({
        "ID Cliente": clientes.id_cliente,
        Nome: clientes.nome,
        "e-mail": clientes.email,
        Telefone: clientes.telefone,
        "Data Nascimento": clientes.data_nascimento,
        "Data Cadastro": clientes.data_cadastro
    }));
    gerarTabela(clientesFormatados);
};

export function exibirEmprestimosDetalhadoTabela(emprestimos: EmprestimoCompletoModel[]): void {
    const emprestimosFormatado = emprestimos.map(emprestimo => ({
        "ID Empréstimo": emprestimo.id_emprestimo,
        Cliente: emprestimo.cliente.nome,
        Emprestimo: formatarDataPrompt(emprestimo.data_emprestimo),
        Devolução: formatarDataPrompt(emprestimo.data_devolucao_prevista),
        Status: emprestimo.status
    }));
    gerarTabela(emprestimosFormatado);
    
    const livrosFormatados = emprestimos.flatMap(emprestimo =>
    emprestimo.livros.map(livro => ({
        "ID Livro": livro.id_livro,
        Título: livro.titulo,
        Autor: livro.autor.nome,
        ISBN: livro.isbn
    })));
    gerarTabela(livrosFormatados);
};

export function exibirLivrosDisponiveisTabela(livrosDisponiveis: LivroDisponivelModel[]): void {
    const livrosFormatados = livrosDisponiveis.map(livrosDisponiveis => ({
        "ID Livro": livrosDisponiveis.id_livro,
        Título: livrosDisponiveis.titulo,
        ISBN: livrosDisponiveis.isbn,
        Estoque: livrosDisponiveis.quantidade_estoque,
        Disponíveis: livrosDisponiveis.quantidade_disponivel,
        Autor: livrosDisponiveis.autor_nome
    }));
    gerarTabela(livrosFormatados);
};

export function exibirLivrosEmprestados(livrosEmprestados: LivroEmprestadoModel[]): void {
    const livrosFormatados = livrosEmprestados.map(livrosEmprestados => ({
        "ID Livro": livrosEmprestados.id_livro,
        Título: livrosEmprestados.titulo,
        ISBN: livrosEmprestados.isbn,
        "Quantidade Emprestada": livrosEmprestados.quantidade_emprestada,
        Autor: livrosEmprestados.autor_nome
    }));
    gerarTabela(livrosFormatados);
};

export function exibirLivrosCadastradosPorAutor(livrosPorAutor: LivroPorAutorModel[]): void {
    const livrosFormatados = livrosPorAutor.map(livrosPorAutor => ({
        "ID Autor": livrosPorAutor.id_autor,
        Autor: livrosPorAutor.autor_nome,
        "ID Livro": livrosPorAutor.id_livro,
        Título: livrosPorAutor.titulo
    }));
    gerarTabela(livrosFormatados);
};

export function exibirQuantidadeEmprestimoPorLivro(emprestimoPorLivro: EmprestimosPorLivroModel[]): void {
    const livrosFormatados = emprestimoPorLivro.map(emprestimoPorLivro => ({
        "ID Livro": emprestimoPorLivro.id_livro,
        Título: emprestimoPorLivro.titulo,
        Empréstimos: emprestimoPorLivro.total_emprestimos
    }));
    gerarTabela(livrosFormatados);
};

export function exibirClientesComEmprestivosAtivos(clientesEmprestimosAtivos: ClienteComEmprestimoAtivoModel[]): void {
    const livrosFormatados = clientesEmprestimosAtivos.map(clientesEmprestimosAtivos => ({
        "ID Cliente": clientesEmprestimosAtivos.id_cliente,
        Nome: clientesEmprestimosAtivos.cliente_nome,
        "e-mail": clientesEmprestimosAtivos.email,
        "ID Livro": clientesEmprestimosAtivos.id_livro,
        Título: clientesEmprestimosAtivos.titulo,
        "Devolução Prevista": clientesEmprestimosAtivos.data_devolucao_prevista
    }));
    gerarTabela(livrosFormatados);
};



