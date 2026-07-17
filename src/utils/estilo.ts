import { cores } from "./estiloCores";

// Auxiliar para desenhar linhas divisórias elegantes no terminal
const divisorConst = (caractere = "─", tamanho = 50) => `${cores.dim}${caractere.repeat(tamanho)}${cores.reset}`;
export function divisor (){
    console.log(`${divisorConst("─", 30)}`);
}

export function tituloMsg(msg: string): void {
    console.log(`\n${divisorConst("═")}`);
    console.log(`${cores.tituloPrincipal}🔮  ${msg.toUpperCase()}${cores.reset}`);
    console.log(`${divisorConst("═")}`);
}

export function subtituloMsg(msg: string): void {
    console.log(`\n${cores.subtitulo}🔹 ${msg}${cores.reset}`);
    console.log(`${divisorConst("─", 30)}`);
}

export function sucessoMsg(msg: string): void {
    console.log(`${cores.verde}🟢 ${msg}${cores.reset}`);
}

export function alertaMsg(msg: string): void {
    console.log(`${cores.amarelo}🟡 ${msg}${cores.reset}`);
}

export function erroMsg(msg: string): void {
    console.log(`${cores.vermelho}🔴 ${msg}${cores.reset}`);
}

export function pergunta(msg: string): void {
    // console.log(`${divisorConst("─", 30)}`);
    // Note o \n inicial para dar espaço da resposta anterior e o espaço no final para o input
    // process.stdout.write(`\n${cores.promptPergunta}❓ ${msg}${cores.reset} `); // causa erro ao pressionar backspace
    console.log(`\n${cores.promptPergunta}❓ ${msg}${cores.reset} `);
}

export function opcoes(msg: string): void {
    // Usa a cor DIM (fosca) para o número da opção e preserva o texto padrão
    console.log(`  ${cores.dim}▪${cores.reset} ${msg}`);
}

export function opcaoSair(msg: string): void {
    console.log(`  ${cores.amarelo}↩ ${msg}${cores.reset}`);
}

// 💡 COMPONENTE EXTRA: Para exibir tabelas ou dados formatados de livros/clientes
export function infoDado(rotulo: string, valor: string | number): void {
    console.log(`  ${cores.ciano}${rotulo}:${cores.reset} ${cores.negrito}${valor}${cores.reset}`);
}
