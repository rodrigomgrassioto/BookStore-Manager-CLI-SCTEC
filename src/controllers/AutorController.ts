import * as readline from 'readline';
import { atualizarAutorServ, listarAutoresServ, cadastrarAutorServ, deletarAutorServ } from '../services/AutorService';
import { fazerPergunta } from "../utils/readlineUtil";
import * as formatadoresTexto from "../utils/formatadoresTexto";

export async function autorControllerCadastrar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO AUTOR ===");

    // Imput do usuário
    const nome = await fazerPergunta("Digite o nome do autor: ");
    const nacionalidade = await fazerPergunta("Digite a nacionalidade do autor (Opcional): ", {aceitarVazio: true});

    // Chama o serviço para cadastrar o autor
    await cadastrarAutorServ(nome, nacionalidade);
};

export async function autorControllerListar(): Promise<void> {
    console.log("\n=== LISTA DE AUTORES ===");

    // Chama o serviço para listar os autores
    const autores = await listarAutoresServ();
    
    // Exibe os autores no console
    formatadoresTexto.exibirAutoresTabela(autores);
};

export async function autorControllerAtualizar(): Promise<void> {
    console.log("\n=== ATUALIZAÇÃO DE AUTOR ===");

    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o ID do autor: ", {tipoRetorno: 'i'});
    const nome = await fazerPergunta("Digite o novo nome do autor: ");
    const nacionalidade = await fazerPergunta("Digite a nova nacionalidade do autor (Opcional): ", {aceitarVazio: true});

    // Chama o serviço para atualizar o autor
    await atualizarAutorServ(id_autor, nome, nacionalidade);
};

export async function autorControllerDeletar(): Promise<void> {
    console.log("\n=== EXCLUSÃO DE AUTOR ===");

    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o ID do autor a ser excluído: ", {tipoRetorno: 'i'});

    // Chama o serviço para deletar o autor
    await deletarAutorServ(id_autor);
};