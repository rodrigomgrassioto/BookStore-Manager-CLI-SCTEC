import { AutorModel } from "../models/AutorModel";
import { EmprestimoCompletoModel } from "../models/EmprestimoModel";
import {LivroCompletoModel} from "../models/LivroModel";
import {gerarTabela} from "./gerarTabela";

export function exibirAutoresTabela(autores: AutorModel[]): void {
    // console.table(
    const autoresFormatado = autores.map(autor => ({
        ID: autor.id_autor,
        Nome: autor.nome,
        Nacionalidade: autor.nacionalidade ?? "-"
    }));
    gerarTabela(autoresFormatado);
};

export function exibirEmprestimosDetalhadoTabela(emprestimos: EmprestimoCompletoModel[]): void {
    const emprestimosFormatado = emprestimos.map(emprestimo => ({
        "ID Empréstimo": emprestimo.id_emprestimo,
        "Cliente": emprestimo.cliente.nome,
        "Emprestimo": formatarDataPrompt(emprestimo.data_emprestimo),
        "Devolução": formatarDataPrompt(emprestimo.data_devolucao_prevista),
        "Status": emprestimo.status
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
}

//para exibir a data no formato dd/mm/yyyy na data de nascimento de clientes
export function formatarDataPrompt(data?: Date | null): string {
    if (!data) return "";
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
}