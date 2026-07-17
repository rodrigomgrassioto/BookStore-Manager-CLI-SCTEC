Este arquivo é um rascunho para depois ser adicionado as informações no README.md

***********

- melhorias em livroControllerListar -> exibir autor na tabela 

- melhorias no tratamento de erro do banco de dados: evitar uso do tipo any, usando o tipo unknown

- implementar busca do autor por nome caso sobre tempo se nao fica como melhoria futura

add na tabela livro... quantidade disponível e quantidade emprestada

melhoria... colocar a devolução por Livro ao invés de por emprestimo..
garantir que no service uma devolução já realizada seja devolvida novamente
garantir no service que sejam usadas as configurações max_livros_por_emprestimo e permitir_quantidade_livro_disponivel_negativo

no service antes de criar um emprestimo, deve consultar se o cliente já tem algum emprestimo ativo,
por exemplo se já tiver 1 ativo... só pode emprestar mais 2


*******************************

no PowerShel Windows ao tentar rodar, npm run dev e ter o erro:
npm : O arquivo C:\***\node-v24.18.0-win-x64\npm.ps1 não pode ser carregado porque a execução de
scripts foi desabilitada neste sistema. Para obter mais informações, consulte about_Execution_Policies em
https://go.microsoft.com/fwlink/?LinkID=135170.
No linha:1 caractere:1
+ npm run dev
+ ~~~
    + CategoryInfo          : ErrodeSegurança: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

EXECUTE O COMANDO:
Set-ExecutionPolicy Bypass -Scope Process -Force

Para liberar temporariamente a execução de scripts no Windows PowerShell
*******************************

