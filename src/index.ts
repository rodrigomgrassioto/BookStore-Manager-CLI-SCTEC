import {
    atualizarLivroRP, buscarLivroPorIdRP,
    buscarLivroPorTituloRP,
    criaLivroRP,
    deletarLivroRP,
    listarLivrosRP
} from "./repositories/LivroRepository";
import {atualizarLivroServ, criarLivroServ, deletarLivroServ, listarLivrosServ} from './services/LivroService'
import {
    buscarEmprestimoPorIdRP,
    criarEmprestimoRP,
    devolucaoEmprestimoRP,
    livroJaFoiEmprestadoRP
} from "./repositories/EmprestimoRepository";
import {livroControllerCriar} from "./controllers/LivroController";
import {InicioMenu} from "./menus/InicioMenu";
import { cadastrarAutor, listarAutores, atualizarAutor, deletarAutor } from "./repositories/AutorRepository";
import { cadastrarAutorServ, listarAutoresServ, atualizarAutorServ, deletarAutorServ, buscarAutorPorIdServ } from "./services/AutorService";
import { autorControlerBuscarPorId, autorControllerAtualizar, autorControllerCadastrar, autorControllerDeletar, autorControllerListar,  } from "./controllers/AutorController";
import { criarEmprestimoController, buscarEmprestimoPorIdController, devolverEmprestimoController } from './controllers/EmprestimoController.js';
import { clientesComEmprestimosAtivosController, livrosCadastradosPorAutorController, livrosDisponiveisController, livrosEmprestadosController, quantidadeEmprestimoPorLivroController } from './controllers/RelatorioController.js';
import { livrosDisponiveisServ } from './services/RelatorioService.js';

async function main() {
    const inicioMenu = new InicioMenu();
    inicioMenu.iniciarMenu()
}

main();


















