import { TerminalController } from './controllers/TerminalController.js';
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

async function main() {
    const inicioMenu = new InicioMenu();
    inicioMenu.iniciarMenu()
}

// main();
testes();
/**
 * Forma SIMPLES de testar os repositórios.
 *
 * OBS: Tem que comentar a linha 22 main() e des-comentar a linha 23 testes()
 * e o item abaixo a result... ser testado e também o console.log respectivo.
 */
async function testes() {
    // const result = await criarEmprestimoRP({
    //     id_cliente: 5,
    //     ids_livros: [10, 11],
    //     dias_para_devolucao: 3
    // });
    const result = await devolucaoEmprestimoRP(1);
    console.log(result)

////////////////////////////////////////////////
// ***** Testes referente a Entidade Autor *****

    // *** Controllers:
        //const resultCadastrar = await autorControllerCadastrar();
        //const resultListar = await autorControllerListar();
        //const resultBuscarPorId = await autorControlerBuscarPorId();
        //const resultAtualizar = await autorControllerAtualizar();
        //const resultDeletar = await autorControllerDeletar();

    // *** Menus:

    // *** Repositories:
        //const resultListar = await listarAutores()
        //console.table(resultListar);

        //const resultBuscarId = await buscarAutorPorId(1)
        //console.log(resultBuscarId);

    // *** Services
        //const resultCadastrar = await cadastrarAutorServ("Autor Teste Três", "Nacionalidade Teste 3");
        //console.log(resultCadastrar);

        //const resultListar = await listarAutoresServ();
        //console.log(resultListar);

        //const resultBuscarId = await buscarAutorPorIdServ(-1)
        //console.log(resultBuscarId);

        //const resultAtualizar = await atualizarAutorServ(25, "Autor Teste Atualizado", "Nacionalidade Teste Atualizada");
        //console.log(resultAtualizar);
        
        //const resultDeletar = await deletarAutorServ(26);
        //console.log(resultDeletar);

////////////////////////////////////////////////
// ***** Testes referente a Entidade Livro *****

    // const resultListar = await listarLivros()
    // console.log(resultListar);


    // const resultBuscarId = await buscarLivroPorIdRP(5)
    // console.log(resultBuscarId);

    // const resultBuscar = await buscarLivroPorTitulo("o amor")
    // console.log(resultBuscar);

    // const resultCriar = await criaLivro("Teste Titulo 6", "12345f", 1953, 3 ,12)
    // console.log(resultCriar);

    // const resultAtualizar = await atualizarLivro(3,"Teste Atualização 2", "12345e", 1953, 3 ,12)
    // console.log(resultAtualizar);

    // const resultDeletar = await deletarLivro(32);
    // console.log(resultDeletar);

    // const listarLivrosComService = await listarLivrosServ()
    // console.log(listarLivrosComService);

    // const criarLivroComService = await criarLivroServ('Livro com validador de isbn','978535912432', 5, 2, -350)
    // console.log(criarLivroComService);

    // const atualizarLivroComService = await atualizarLivroServ(1,'Dom Casmurro','9788594318602', 1899, 5, 1)
    // console.log(atualizarLivroComService);

    // const buscarEmprestimoPorIdRp = await buscarEmprestimoPorIdRP(33)
    // console.dir(buscarEmprestimoPorIdRp, { depth: 3 });

    // const livroJaFoiEmprestadoNoRP = await livroJaFoiEmprestadoRP(136);
    // console.log(livroJaFoiEmprestadoNoRP)

    // const deletarLivroSr  = await deletarLivroServ(13);
    // console.log(deletarLivroSr);

    // console.log(consultarSeLivroJaFoiEmprestadoRP);

    // livroControllerCriar();

//     try {
//         const resultado = await pool.query('SELECT NOW();');
//         console.log('🎉 Conexão com o banco realizada com sucesso!');
//         console.log('📅 Data e Hora do Banco:', resultado.rows[0].now);
//
//     } catch (erro) {
//         console.error('❌ Erro ao conectar no banco de dados:', erro);
//     } finally {
//         // Fecha o pool para o Node não ficar "preso" rodando no terminal
//         await pool.end();
//     }
}