# Projeto Sistema de Login (Layered Architecture)

Este Projeto baseia-se no desenvolvimento Full-Stack de um sistema de Login baseado na *Layered Architecture*, priorizando bons princípos e boas práticas práticas de Design de Software.

---

## Tecnologias

O sistema é totalmente desenvolvido em **Node.js** com **Vite**, usando como principal linguagem o **Typescript** e tecnologias Front-End.

### Front-End

- **React** para tornar a experiência de usuário limpa e tornar o sistema totalmente escalável.

### Back-End

Como citado anteriormente, o sistema é totalmente baseado em Node com **Typescript**, utilizando de frameworkds como:

- **Vitest** para aplicar testes unitários em todos os módulos. 
- **Express** para implementar os `Controllers` Restful de forma simples.
- **Prisma** para manipular Databases por meio de ORM.

> Também foram utilizadas bibliotecas menores para usos específicos, como **vite--tsconfig-parths** para a configuração de *aliases* de `import` e **bcrypt** para criptografia de senhas.

---

## Fluxo de funcionamento

O sistema Full-Stack conta com um simples Front-End para coletas e consulta de dados.
Porém, o foco do projeto está no Back-End, sendo um CRUD focado em *Design de Software*, com classes e interfaces limpas.

> A arquitetura utilizada no projeto é a `Layered Architecture`, que não é puramente baseada em `Entities`, e sim em `Models`, tornando o processo de criação mais simples, abrindo mão de alguns bons princípios.

### Processos

1. Dados serão coletados por rotas HTTP **Express**, na qual serão passados para as classes e serviços de validação.
2. A validação é feita manualmente sem a utilização de APIs e frameworks externos.
3. Dados validados serão passados para um **Mapper**, que os converte para um formato compatível (por meio de **DTO**s) para a operação desejada.
4. O **Mapper** utiliza de bibliotecas externas auxiliares, como a **bcrypt** para a criptografia e hashes de senha.
5. Dados formatados são armazenados / consultados e retornados pelo ORM **Prisma**.
6. Por fim, os dados de resposta passam pelo **Mapper** e pelos **DTO**s para chegarem ao cliente no formato correto.

---

## Finalidade

Apesar de simples, a finalidade desse projeto é unica e exclusivamente para fins de aprendizado. São utilizados testes unitários (TDD), padrões *SOLID*, *Design Patterns* e Técnicas *Clean Code* para tornar o sistema mais escalável e legível.

Como dito anteriormente, a arquitetura base utilizada no projeto é a *Layered Architecture*, baseada em `Models`, com estrutura de três camadas principais:

- **Controllers**: Recebem a request, devolvem a response. Não aplicam lógicas complexas.
- **Services**: Recebem os dados do Controller e chamam os serviços internos e externos para formatar e validar os dados.
- **Repositories**: Recebem os dados formatados do Service, utilizam dos métodos da ORM para fazer operações DB.

> Pode não ser a melhor escolha para projetos com essa finalidade, mas é uma arquitetura simples de ser aplicada por desenvolvedores mais iniciantes ou intermediários (como eu). Creio que valha a pena para o aprendizado, mesmo que não se encaixe a diversos dos principais padrões e princípios de Design modernos.

---

### Observação

> Esse projeto é um reflexo do meu início de estudos sobre Design de Software, pode haver muitos erros e más decisões, mas será uma base de aprendizado do que implementar (e não implementar) no meu próximo projeto derivado, na qual será totalmente baseado na *Clean Architecture* e no livro de mesmo nome, onde abordarei mais à fundo seus princípios.
