import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import {
    clienteControllerCriar,
    clienteControllerListar,
    clienteControllerAtualizar,
    clienteControllerDeletar,
    clienteControllerBuscarPorId
} from "../controllers/ClienteController";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../estilos/estilo";

export class ClienteMenu {
    async subMenuCliente(): Promise<void> {
        console.clear();

        let continuar = true;
        while (continuar) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Opções em cliente');
            opcoes('1 - Adicionar cliente');
            opcoes('2 - Listar clientes');
            opcoes('3 - Buscar cliente por ID');
            opcoes('4 - Atualizar cliente');
            opcoes('5 - Excluir cliente');
            opcaoSair('0 - Voltar para o menu anterior');
            divisor();

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {

                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Adicionar cliente');
                    await clienteControllerCriar();
                    break;

                case '2':
                    console.clear();
                    subtituloMsg('Lista de clientes');
                    await clienteControllerListar();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Buscar cliente por ID');
                    await clienteControllerBuscarPorId();
                    break;

                case '4':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Atualizar cliente');
                    await clienteControllerAtualizar();
                    break;

                case '5':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Excluir cliente');
                    await clienteControllerDeletar();
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