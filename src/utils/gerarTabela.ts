/**
 * Exibe qualquer array de objetos em formato de tabela organizada no terminal
 * @param dados Array de objetos contendo os registros do banco
 */
export function gerarTabela<T extends object>(dados: T[]): void {
    if (!dados || dados.length === 0) {
        console.log("ℹ️ Nenhum registro para exibir.");
        return;
    }

    // 1. Captura os nomes das colunas a partir das propriedades do primeiro objeto
    const colunas = Object.keys(dados[0]) as Array<keyof T>;

    // 2. Calcula dinamicamente a largura ideal de cada coluna (comprimento do maior texto)
    const larguras: Record<keyof T, number> = {} as any;

    for (const coluna of colunas) {
        // O tamanho mínimo inicial é o próprio nome da coluna
        let tamanhoMaximo = String(coluna).length;

        for (const linha of dados) {
            // Varre as linhas para descobrir qual o maior texto impresso naquela coluna
            const valor = linha[coluna];

            const valorTexto =
                valor instanceof Date
                    ? valor.toLocaleDateString("pt-BR")
                    : String(valor ?? "-");

            if (valorTexto.length > tamanhoMaximo) {
                tamanhoMaximo = valorTexto.length;
            }
        }
        larguras[coluna] = tamanhoMaximo;
    }

    // 3. Monta a linha divisória decorativa dinamicamente
    const linhaDivisoria = colunas
        .map(coluna => "-".repeat(larguras[coluna]))
        .join("---");

    const bordaPrincipal = "=".repeat(linhaDivisoria.length + 4);

    // 4. Imprime o Cabeçalho da Tabela
    console.log(bordaPrincipal);
    const cabecalhoTexto = colunas
        .map(coluna => String(coluna).toUpperCase().padEnd(larguras[coluna]))
        .join(" │ ");
    console.log(`  ${cabecalhoTexto}`);
    console.log(`--${linhaDivisoria}--`);

    // 5. Imprime as Linhas de Dados
    for (const linha of dados) {
        const linhaTexto = colunas
            .map(coluna => {
                const valor = linha[coluna];
                // Formatação visual amigável para objetos de data do JS
                const textoFinal = valor instanceof Date
                    ? valor.toLocaleDateString('pt-BR')
                    : String(valor ?? "-");

                return textoFinal.padEnd(larguras[coluna]);
            })
            .join(" │ ");
        console.log(`  ${linhaTexto}`);
    }
    console.log(bordaPrincipal + "\n");
}
