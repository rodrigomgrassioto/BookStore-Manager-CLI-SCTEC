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

//para exibir a data no formato dd/mm/yyyy na data de nascimento de clientes
export function formatarDataPrompt(data?: Date | null): string {
    if (!data) return "";
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
}