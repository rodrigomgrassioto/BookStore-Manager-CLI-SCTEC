import { AutorModel } from "../models/AutorModel";
import {LivroCompletoModel} from "../models/LivroModel";
import {gerarTabela} from "./gerarTabela";

export function exibirAutoresTabela(autores: AutorModel[]): void {
    // console.table(
    const autoresFormatado = autores.map(autor => ({
        ID: autor.id_autor,
        Nome: autor.nome,
        Nacionalidade: autor.nacionalidade ?? "-"
    }))
    // );
    gerarTabela(autoresFormatado);
}

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