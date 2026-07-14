import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { autorControllerCadastrar, 
         autorControllerListar, 
         autorControlerBuscarPorId, 
         autorControllerAtualizar,
         autorControllerDeletar } from "../controllers/AutorController";

export class AutorMenu {
   async subMenuAutor(): Promise<void> {
        console.clear();

        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Autor --- 🟦');
            console.log('1. Adicionar autor');
            console.log('2. Listar autores');
            console.log('3. Buscar autor por ID');
            console.log('4. Atualizar autor');
            console.log('5. Deletar autor');
            console.log('0. Voltar para o menu anterior');

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {

                case '1':
                    console.clear();
                    console.log('\n🟦 --- Adicionar autor --- 🟦');
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