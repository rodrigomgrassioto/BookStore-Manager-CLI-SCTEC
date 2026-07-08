import * as readline from "readline";

export class TerminalController {
    private rl: readline.Interface;

    constructor(){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // váriável do MENU
    private perguntar = (texto: string): Promise<string> => {
        return new Promise((resolve) =>  this.rl.question(texto, resolve));
    };

    // Menu
    async iniciarMenu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('1. Autor');
            console.log('2. Livros');
            console.log('3. Clientes');
            console.log('4. Empréstimos');
            console.log('5. Relatórios');
            console.log('S. Sair');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {
                case '1':
                    continuar = false;
                    console.clear()
                    this.subMenuAutor();
                    break;

                case '2':
                    continuar = false;
                    console.clear()
                    this.subMenuLivro();
                    break;

                case '3':
                    continuar = false;
                    console.clear()
                    this.subMenuCliente();
                    break;
            //     case '4':
            //         if (!await this.boxService.salvarJson()) {
            //             console.log('❌ Erro ao salvar o catálogo.');
            //             break;
            //         }
            //         console.log('✅ Catálogo salvo');
            //         break
            //
            //
                case 's':
                    console.clear()
                    console.log('👋 👋 👋  Até mais!');
                    continuar = false;
                    this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuAutor(): Promise<void> {
        console.clear()
        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Autor --- 🟦');
            console.log('1. Adicionar autor');
            console.log('2. Listar autores');
            console.log('3. Procurar autor');
            console.log('4. Excluir autor');
            console.log('v. Voltar menu anterior');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {

                case '1':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Adicionar autor --- 🟦');
                    break;

                case '2':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Listar autores --- 🟦');
                    break;

                case '3':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Procurar autor --- 🟦');
                    break;

                case '4':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Excluir autor --- 🟦');
                    break;

                case 'v':
                    console.clear()
                    console.log('🔙 Voltando menu inicial');
                    this.iniciarMenu()
                    continuar = false;
                    // this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuLivro(): Promise<void> {
        console.clear()
        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Livro --- 🟦');
            console.log('1. Adicionar livro');
            console.log('2. Listar livro');
            console.log('3. Procurar livro');
            console.log('4. Excluir livro');
            console.log('v. Voltar menu anterior');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {

                case '1':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Adicionar livro --- 🟦');
                    break;

                case '2':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Listar livros --- 🟦');
                    break;

                case '3':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Procurar livro --- 🟦');
                    break;

                case '4':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Excluir livro --- 🟦');
                    break;

                case 'v':
                    console.clear()
                    console.log('🔙 Voltando menu inicial');
                    this.iniciarMenu()
                    continuar = false;
                    // this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuCliente(): Promise<void> {
        console.clear()
        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Cliente --- 🟦');
            console.log('1. Adicionar Cliente');
            console.log('2. Listar Clientea');
            console.log('3. Procurar Cliente');
            console.log('4. Excluir Cliente');
            console.log('v. Voltar menu anterior');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {

                case '1':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Adicionar Cliente --- 🟦');
                    break;

                case '2':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Listar Clientea --- 🟦');
                    break;

                case '3':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Procurar Cliente --- 🟦');
                    break;

                case '4':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Excluir Cliente --- 🟦');
                    break;

                case 'v':
                    console.clear()
                    console.log('🔙 Voltando menu inicial');
                    this.iniciarMenu()
                    continuar = false;
                    // this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuEmprestimo(): Promise<void> {
        console.clear()
        let continuar = true;
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('🟦 --- Empréstimo --- 🟦');
            console.log('1. Emprestar');
            console.log('2. Listar empréstimos ativos');
            console.log('3. Devolução');
            console.log('v. Voltar menu anterior');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {

                case '1':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Emprestar --- 🟦');
                    break;

                case '2':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Empréstimos ativos --- 🟦');
                    break;

                case '3':
                    continuar = true;
                    console.clear()
                    console.log('\n🟦 --- Devolução --- 🟦');
                    break;

                case 'v':
                    console.clear()
                    console.log('🔙 Voltando menu inicial');
                    this.iniciarMenu()
                    continuar = false;
                    // this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }
}
