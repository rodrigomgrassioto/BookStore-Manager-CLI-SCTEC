import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { autorControllerCadastrar, 
         autorControllerListar, 
         autorControlerBuscarPorId, 
         autorControllerAtualizar,
         autorControllerDeletar } from "../controllers/AutorController";
import {divisor, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../utils/estilo";

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
            divisor()

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {

                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Adicionar autor');
                    // console.log('\n🟦 --- Adicionar autor --- 🟦');
                    await autorControllerCadastrar();
                    break;

                case '2':
                    console.clear();
                    console.log('\n🟦 --- Listar autores --- 🟦');
                    await autorControllerListar();
                    break;

                case '3':
                    console.clear();
                    console.log('\n🟦 --- Buscar autor por ID --- 🟦');
                    await autorControlerBuscarPorId();
                    break;

                 case '4':
                    console.clear();
                    console.log('\n🟦 --- Atualizar autor --- 🟦');
                    await autorControllerAtualizar();
                    break;

                case '5':
                    console.clear();
                    console.log('\n🟦 --- Deletar autor --- 🟦');
                    await autorControllerDeletar();
                    break;

                case '0':
                    console.clear();
                    continuar = false; // volta para o menu inicial
                    break;

                default:
                    console.clear();
                    console.log('❌ Opção inválida.');
            };
        };
    };
};