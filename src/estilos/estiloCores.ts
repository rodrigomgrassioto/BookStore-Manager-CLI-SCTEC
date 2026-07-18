// export const cores = {
//     reset: "\x1b[0m",
//     negrito: "\x1b[1m",
//     vermelho: "\x1b[31m",
//     verde: "\x1b[32m",
//     amarelo: "\x1b[33m",
//     azul: "\x1b[34m",
//     azulMarinhoVivo: "\x1b[1m\x1b[34m",
//     roxo: "\x1b[35m",
//     ciano: "\x1b[36m",
//     branco: "\x1b[37m",
// };

export const cores = {
    reset: "\x1b[0m",
    negrito: "\x1b[1m",
    dim: "\x1b[2m", // Texto fosco/opaco para divisores e detalhes secundarios

    // Cores Principais (Baseadas no padrão de sucesso/erro/alerta)
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    roxo: "\x1b[35m",
    ciano: "\x1b[36m",

    // Combinações de Alta Visibilidade para Títulos e Destaques
    tituloPrincipal: "\x1b[1m\x1b[35m", // Roxo Negrito (Moderno e elegante)
    subtitulo: "\x1b[1m\x1b[36m",        // Ciano Negrito
    promptPergunta: "\x1b[1m\x1b[34m",   // Azul Negrito

    // tabela cinza
    // bordaTabela: "\x1b[38;5;244m",     // Cinza elegante para as linhas divisórias
    // textoCabecalho: "\x1b[1m\x1b[37m", // Branco negrito
    // fundoCabecalho: "\x1b[48;5;238m", // Fundo cinza escuro para destacar o topo da tabela
    // tabela cinza fim

    bordaTabela: "\x1b[1m\x1b[36m",
    textoCabecalho: "\x1b[34m",
    fundoCabecalho: "\x1b[32m",
    fundoZebra: "\x1b[48;5;235m",
};
