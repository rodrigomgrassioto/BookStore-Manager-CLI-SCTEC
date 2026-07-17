import {cores} from "./coresTerminal";

export function verdeMsg(msg: string): void {
    console.log(`${cores.verde} ${msg} ${cores.reset}`);
}

export function vermelhoMsg(msg: string): void {
    console.log(`${cores.vermelho} ${msg} ${cores.reset}`);
}

export function amareloMsg(msg: string): void {
    console.log(`${cores.amarelo} ${msg} ${cores.reset}`);
}

export function cianolNegritoMsg(msg: string): void {
    console.log(`${cores.negrito}${cores.ciano} ${msg} ${cores.reset}`);
}

export function tituloMsg(msg: string): void {
    console.log(`${cores.negrito}${cores.vermelho}🟢  === ${msg} === 🟢${cores.reset}`);

}export function subtituloMsg(msg: string): void {
    console.log(`${cores.negrito}${cores.ciano}🔵  -- ${msg} -- 🔵${cores.reset}`);
}

export function sucessoMsg(msg: string): void {
    console.log(`${cores.verde}✅ ${msg} ${cores.reset}`);
}

export function alertaMsg(msg: string): void {
    console.log(`${cores.amarelo}❗ ${msg} ${cores.reset}`);
}
export function erroMsg(msg: string): void {
    console.log(`${cores.vermelho}❌ ${msg} ${cores.reset}`);
}
export function pergunta(msg: string): void {
    console.log(`${cores.negrito}${cores.azulMarinhoVivo}❓ ${msg} ${cores.reset}`);
}
export function opcoes(msg: string): void {
    console.log(`${cores.azul} ${msg} ${cores.reset}`);
}
