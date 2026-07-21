import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg } from "../estilos/estilo";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { EmprestimoService } from "../services/EmprestimoService";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { ClienteService } from "../services/ClienteService";
import { ClienteRepository } from "../repositories/ClienteRepository"; // Importação adicionada
import { LivroService } from "../services/LivroService";
import { LivroRepository } from "../repositories/LivroRepository";

export interface Imenu {
    subMenuEmprestimo(): Promise<void>;
}

export class EmprestimoMenu implements Imenu {
    private readonly controller: EmprestimoController;

    private static criarControllerPadrao(): EmprestimoController {
        const emprestimoRepository = new EmprestimoRepository();
        const livroService = new LivroService(new LivroRepository(), emprestimoRepository);
        emprestimoRepository.definirLivroService(livroService);

        const clienteService = new ClienteService(new ClienteRepository());
        const emprestimoService = new EmprestimoService(emprestimoRepository, clienteService, livroService);

        return new EmprestimoController(emprestimoService, livroService, clienteService);
    }

    constructor(
        controller: EmprestimoController = EmprestimoMenu.criarControllerPadrao()
    ) {
        this.controller = controller;
    }

    async subMenuEmprestimo(): Promise<void> {
        console.clear();

        let noSubMenu = true;
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Opções em empréstimo');
            opcoes('1 - Criar Novo Empréstimo');
            opcoes('2 - Buscar Empréstimo Por ID');
            opcoes('3 - Devolver Empréstimo');
            opcaoSair('0 - Voltar menu anterior');
            divisor();

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Novo Empréstimo');
                    await this.controller.criarEmprestimoController();
                    break;

                case '2':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Buscar Empréstimo por ID');
                    await this.controller.buscarEmprestimoPorIdController();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Devolver Empréstimo');
                    await this.controller.devolverEmprestimoController();
                    break;

                case '0':
                    console.clear();
                    noSubMenu = false;
                    break;

                default:
                    console.clear();
                    erroMsg('Opção inválida.');
            }
        }
    }
}