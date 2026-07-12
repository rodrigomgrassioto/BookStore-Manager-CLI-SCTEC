import { AutorModel } from "../models/AutorModel";

export function exibirAutoresTabela(autores: AutorModel[]): void {
    console.table(
        autores.map(autor => ({
            ID: autor.id_autor,
            Nome: autor.nome,
            Nacionalidade: autor.nacionalidade ?? "-"
        }))
    );
}