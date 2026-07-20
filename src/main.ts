import {InicioMenu} from "./menus/InicioMenu";

async function main(): Promise<void> {
    const inicioMenu = new InicioMenu();
    await inicioMenu.iniciarMenu();
};

main();


















