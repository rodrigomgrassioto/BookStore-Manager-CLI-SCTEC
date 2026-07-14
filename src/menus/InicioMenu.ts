import * as readline from "readline";
import {fazerPergunta, rl} from "../utils/leitorFormatadorDeEntradas";
import {LivroMenu} from "./LivroMenu";
import {AutorMenu} from "./AutorMenu";

export class InicioMenu {
    // private rl: readline.Interface;
    //
    // constructor() {
    //     this.rl = readline.createInterface({
    //         input: process.stdin,
    //         output: process.stdout
    //     });
    // }
    //
    // // váriável do MENU
    // private perguntar = (texto: string): Promise<string> => {
    //     return new Promise((resolve) => this.rl.question(texto, resolve));
    // };

    // Menu
    async iniciarMenu(): Promise<void> {
        const livroMenu = new LivroMenu();
        const autorMenu = new AutorMenu();
        let continuar = true;

        console.clear();
        while (continuar) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('1. Autor');
            console.log('2. Livros');
            console.log('3. Clientes');
            console.log('4. Empréstimos');
            console.log('5. Relatórios');
            console.log('0. Sair');

            // const opcao = await this.perguntar('Escolha uma opção: ');
            const opcao = await fazerPergunta('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    console.clear();
                    await autorMenu.subMenuAutor();
                    break;

                case '2':
                    console.clear();
                    await livroMenu.subMenuLivro()
                    break;

                // case '3':
                //     continuar = false;
                //     console.clear()
                //     this.subMenuCliente();
                //     break;

                case '0':
                    console.clear();
                    console.log('👋 👋 👋  Até mais!');
                    continuar = false;
                    rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear();
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            };
        };
    };
};