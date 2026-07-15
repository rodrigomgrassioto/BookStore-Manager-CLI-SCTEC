Este arquivo é um rascunho para depois ser adicionado as informações no README.md

***********

- melhorias em livroControllerListar -> exibir autor na tabela 

- melhorias no tratamento de erro do banco de dados: evitar uso do tipo any, usando o tipo unknown

- implementar busca do autor por nome caso sobre tempo se nao fica como melhoria futura

add na tabela livro... quantidade disponível e quantidade emprestada

melhoria... colocar a devolução por Livro ao invés de por emprestimo..
garantir que no service uma devolução já realizada seja devolvida novamente
garantir no service que sejam usadas as configurações max_livros_por_emprestimo e permitir_quantidade_livro_disponivel_negativo