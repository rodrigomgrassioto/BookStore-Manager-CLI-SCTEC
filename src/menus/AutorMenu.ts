import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
// import { autorControllerCadastrar,
//          autorControllerListar,
//          autorControlerBuscarPorId,
//          autorControllerAtualizar,
//          autorControllerDeletar } from "../controllers/AutorController";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../estilos/estilo";
import {AutorController} from "../controllers/AutorController";

export interface IMenu {
    subMenuAutor(): Promise<void>;
}
export class AutorMenu implements IMenu {
    private readonly controller: AutorController;

    constructor(controller: AutorController = new AutorController()) {
        this.controller = controller;
    }

   public async subMenuAutor(): Promise<void> {
        console.clear();

        let continuar = true;
        while (continuar) {
            tituloMsg('BookStore Manager');
            subtituloMsg('Opções em Autor');
            opcoes('1 - Adicionar autor');
            opcoes('2 - Listar autores');
            opcoes('3 - Buscar autor por ID');
            opcoes('4 - Atualizar autor');
            opcoes('5 - Deletar autor');
            opcaoSair('0 - Voltar para o menu anterior');
            divisor();

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {

                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Adicionar autor');
                    await this.controller.autorControllerCadastrar();
                    break;

                case '2':
                    console.clear();
                    subtituloMsg('Lista de autores');
                    await this.controller.autorControllerListar();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Buscar autor por ID');
                    await this.controller.autorControlerBuscarPorId();
                    break;

                 case '4':
                    console.clear();
                     tituloMsg('BookStore Manager');
                     subtituloMsg('Atualizar autor');
                    await this.controller.autorControllerAtualizar();
                    break;

                case '5':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Deletar autor');
                    await this.controller.autorControllerDeletar();
                    break;

                case '0':
                    console.clear();
                    continuar = false;
                    break;

                default:
                    console.clear();
                    erroMsg('Opção inválida.');
            }
        }
    }
}