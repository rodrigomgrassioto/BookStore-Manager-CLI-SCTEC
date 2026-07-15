import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import {
    clienteControllerCriar,
    clienteControllerListar,
    clienteControllerAtualizar,
    clienteControllerDeletar
} from "../controllers/ClienteController";

export class ClienteMenu {
    async subMenuCliente(): Promise<void> {
        console.clear();

        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Cliente --- 🟦');
            console.log('1. Adicionar cliente');
            console.log('2. Listar clientes');
            console.log('3. Atualizar cliente');
            console.log('4. Excluir cliente');
            console.log('0. Voltar para o menu anterior');

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {

                case '1':
                    console.clear();
                    console.log('\n🟦 --- Adicionar cliente --- 🟦');
                    await clienteControllerCriar();
                    break;

                case '2':
                    console.clear();
                    console.log('\n🟦 --- Listar clientes --- 🟦');
                    await clienteControllerListar();
                    break;

                case '3':
                    console.clear();
                    console.log('\n🟦 --- Atualizar cliente --- 🟦');
                    await clienteControllerAtualizar();
                    break;

                case '4':
                    console.clear();
                    console.log('\n🟦 --- Excluir cliente --- 🟦');
                    await clienteControllerDeletar();
                    break;

                case '0':
                    console.clear();
                    continuar = false;
                    break;

                default:
                    console.clear();
                    console.log('❌ Opção inválida.');
            };
        };
    };
};