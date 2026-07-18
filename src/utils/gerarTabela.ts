import { cores } from "../estilos/estiloCores";
import {alertaMsg} from "../estilos/estilo";

export function gerarTabela<T extends object>(dados: T[]): void {
    if (!dados || dados.length === 0) {
        alertaMsg("Nenhum registro para exibir.");
        return;
    }

    // Garante que o TypeScript entenda as chaves
    const colunas = Object.keys(dados[0]) as Array<keyof T>;
    const larguras: Record<keyof T, number> = {} as any;

    // 1. Calcula as larguras ideais das colunas
    for (const coluna of colunas) {
        let tamanhoMaximo = String(coluna).length;
        for (const linha of dados) {
            const valor = linha[coluna];
            const valorTexto = valor instanceof Date ? valor.toLocaleDateString("pt-BR") : String(valor ?? "-");
            if (valorTexto.length > tamanhoMaximo) tamanhoMaximo = valorTexto.length;
        }
        larguras[coluna] = tamanhoMaximo;
    }

    const corBorda = cores.bordaTabela;

    // 2. Monta as Linhas Divisórias Contínuas em CIANO
    const linhaTopo = corBorda + "┌─" + colunas.map(c => "─".repeat(larguras[c])).join("─┬─") + "─┐" + cores.reset;
    const linhaMeio = corBorda + "├─" + colunas.map(c => "─".repeat(larguras[c])).join("─┼─") + "─┤" + cores.reset;
    const linhaFundo = corBorda + "└─" + colunas.map(c => "─".repeat(larguras[c])).join("─┴─") + "─┘" + cores.reset;

    // 3. Imprime o Cabeçalho (Bordas Ciano + Fundo Roxo)
    console.log(linhaTopo);

    const cabecalhoTexto = colunas
        .map(c => String(c).toUpperCase().padEnd(larguras[c]))
        .join(`${cores.reset}${corBorda} │ ${cores.textoCabecalho}${cores.fundoCabecalho}`);

    // Aplica o fundo roxo e as bordas ciano perfeitamente alinhadas
    console.log(`${corBorda}│ ${cores.textoCabecalho}${cores.fundoCabecalho}${cabecalhoTexto} ${cores.reset}${corBorda}│${cores.reset}`);

    console.log(linhaMeio);

    // 4. Imprime as Linhas de Dados com o Zebrado sutil de fundo
    dados.forEach((linha, index) => {
        // Altera o fundo da linha de forma sutil para o efeito zebra não brigar com as cores vivas
        const fundoLinha = index % 2 === 0 ? cores.fundoZebra : "";

        const linhaTexto = colunas
            .map(c => {
                const valor = linha[c];
                const textoFinal = valor instanceof Date ? valor.toLocaleDateString('pt-BR') : String(valor ?? "-");
                return textoFinal.padEnd(larguras[c]);
            })
            .join(`${cores.reset}${corBorda} │ ${fundoLinha}`);

        console.log(`${corBorda}│ ${fundoLinha}${linhaTexto} ${cores.reset}${corBorda}│${cores.reset}`);
    });

    // 5. Imprime a base da tabela
    console.log(linhaFundo + "\n");
}
