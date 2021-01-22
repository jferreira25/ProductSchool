## Sumário

1. [Introdução](#intro)
2. [Funcionalidades](#func)
3. [Pré-requisitos para o ambiente](#prereq)
4. [Como executar o projeto](#execute)
5. [Passo à passo para criar uma nova funcionalidade](#dev)
5. [Estrutura de pastas do projeto](#struct)


## <a id="intro"></a>Introdução
Este projeto tem a finalidade de calcular tarifas aeroportuárias e aeronáuticas. O cliente tem a necessidade de auditar as faturas dos aeroportos, possibilitando quaisquer contestações caso diferirem os valores obtidos, poupando capital.


## <a id="func"></a>Funcionalidades

- Autenticação
- Cadastro de Fórmulas (Formula);
	- Consulta paginada com filtros;
	- Cadastro de fórmula;
	- Alteração de fórmula;
	- Validação de fórmula;
- Cadastro de Tipos de Taxa (RateType);
	- Consulta paginada com filtros;
	- Cadastro de tipos de taxa;
	- Alteração de tipos de taxa;
- Cadastro de Operadoras (Operators);
	- Consulta paginada com filtros;
	- Cadastro de operadoras;
	- Alteração de operadoras;


## <a id="prereq"></a>Pré-requisitos para o ambiente

1. Uma IDE para facilitar o desenvolvimento, recomenda-se o [VS Code](https://code.visualstudio.com/download "VS Code");

2. O [[node v12.9.1+]](https://nodejs.org/pt-br/download/ "node") instalado na máquina;

3. O [[npm v6.10.2+]](https://www.npmjs.com/ "npm") instalado na máquina *(já vem embarcado no node)*;

4. O [[Angular CLI v8.3.24+]](https://angular.io/guide/setup-local#step-1-install-the-angular-cli "Angular") instalado na máquina;

5. Um [navegador](https://www.google.com/intl/pt-BR/chrome/ "navegador") instalado na máquina.


## <a id="execute"></a>Como executar o projeto

1. Efetue o clone do projeto

2. Na pasta raíz, abra o prompt de comando e digite:
```$ npm install```

3. Aguarde o fim da instalação e em seguida digite:
`$ ng serve -o`


## <a id="dev"></a>Passo à passo para criar uma nova funcionalidade

1. Criar um módulo no contexto interno para desenvolver uma nova funcionalidade:
`$ ng g m internal/nome_do_modulo --routing`

2. Criar um componente de consulta e/ou exibição:
`$ ng g c internal/<nome_do_modulo>/form/<nome_do_modulo>-form --flat --module=<nome_do_modulo>`

3. Criar um componente de formulário e/ou persistência:
`$ ng g c internal/<nome_do_modulo>/list/<nome_do_modulo>-list --flat --module=<nome_do_modulo>`

4. Criar um serviço:
`$ ng g s common/services/<nome_do_modulo>`


## <a id="struct"></a>Estrutura de pastas do projeto

```
app/
app/common/
app/common/components/
app/common/directives/
app/common/enuns/
app/common/services/
app/common/models/
app/common/utils/
app/external/
app/external/login/
app/external/login/form/
app/internal/
app/internal/formula/
app/internal/formula/form/
app/internal/formula/list/
app/internal/operator/
app/internal/operator/form/
app/internal/operator/list/

```
