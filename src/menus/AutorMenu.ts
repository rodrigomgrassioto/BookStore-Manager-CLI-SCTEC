import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { autorControllerCadastrar, 
         autorControllerListar, 
         autorControlerBuscarPorId, 
         autorControllerAtualizar,
         autorControllerDeletar } from "../controllers/AutorController";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../estilos/estilo";

export class AutorMenu {
   async subMenuAutor(): Promise<void> {
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
                    await autorControllerCadastrar();
                    break;

                case '2':
                    console.clear();
                    subtituloMsg('Lista de autores');
                    await autorControllerListar();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Buscar autor por ID');
                    await autorControlerBuscarPorId();
                    break;

                 case '4':
                    console.clear();
                     tituloMsg('BookStore Manager');
                     subtituloMsg('Atualizar autor');
                    await autorControllerAtualizar();
                    break;

                case '5':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Deletar autor');
                    await autorControllerDeletar();
                    break;

                case '0':
                    console.clear();
                    continuar = false;
                    break;

                default:
                    console.clear();
                    erroMsg('Opção inválida.');
            };
        };
    };
};