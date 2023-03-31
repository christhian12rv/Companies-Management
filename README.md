<h1 align="center">Companies Management</h1>

<!-- Índice -->
<details>
  <summary>Índice</summary>
  <ol>
        <li><a href="#feito-com">Feito com</a></li>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#rodando-o-projeto">Rodando o projeto</a></li>
      </ul>
    </li>
    <li><a href="#ilustrações">Ilustrações</a></li>
    <li><a href="#explicação-do-projeto">Explicação do projeto</a></li>
  </ol>
</details>

### Feito com


-   [Typescript](https://www.typescriptlang.org)
-   [NodeJS v14.21.3](https://nodejs.org/en/download/releases/)
-   [Express](https://expressjs.com/)
-   [Prisma](https://www.prisma.io)
-   [Postgres](https://www.postgresql.org)
-   [ReactJS](https://reactjs.org/)
-   [Material UI](https://mui.com)
-   [Docker](https://www.docker.com)

<!-- Começando -->

## Começando

### Pré requisitos

#### Docker

Se preferir, pode-se rodar o projeto via Docker e Docker-Compose. Para isso, é necessário ter o [Docker](https://www.docker.com) e o [Docker-Compose](https://docs.docker.com/compose/install/) instalado em sua máquina. Basta acessar os sites clicando no link anterior e instalá-los de acordo com seu sistema operacional.

#### Node

Outra maneira é instalar todas as ferramentas necessárias para rodar o projeto. A primeira a ser instalada é o [NodeJS](https://nodejs.org/en/). <ins>**OBS: Lembre-se de instalar a versão v14.21.3, pois é mais garantida de o projeto funcionar**</ins>.

-   #### Instalação do Node no Windows

    Basta acessar o [site oficial do Node.js](https://nodejs.org/) e baixar o instalador.
    Além disso, certifique-se de ter o `git` disponível em seu PATH, `npm` pode precisar dele (você pode encontrar o git [aqui](https://git-scm.com/)).

-   ##### Instalação do Node no Ubuntu

    Você pode instalar o nodejs e o npm facilmente com o apt install, basta executar os seguintes comandos.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ##### Outros sistemas operacionais
    Você pode encontrar mais informações sobre a instalação no [site oficial do Node.js](https://nodejs.org/) e no [site oficial do NPM](https://npmjs.org/).

    Se a instalação foi bem-sucedida, você poderá executar o seguinte comando.

        $ node --version
        v14.21.3
    
        $ npm --version
        9.6.3

    Se você precisar atualizar o `npm`, você pode fazê-lo usando o `npm`! Legal, certo? Após executar o seguinte comando,    basta abrir novamente a linha de comando e ser feliz.
    
        $ npm install npm -g



### Instalação

1. Clone o repositório
    ```sh
    $ git clone https://github.com/christhian12rv/Companies-Management.git
    ```
    
#### Docker

2. Faça o build do projeto
    ```sh
    $ docker-compose build
    ```
    
#### Sem Docker

2. Vá para a pasta /server e instale os pacotes npm
    ```sh
    $ npm install
    ```
3. Vá para a pasta /client e instale os pacotes npm
    ```sh
    $ npm install
    ```

### Rodando o projeto

#### Docker

1. Rode o projeto. Se preferir, pode-se adicionar o comando "-d" para rodar em background.
    ```sh
    $ docker-compose up
    ```
2. Será necessário rodar as migrations no banco de dados na primeira vez que subir o projeto.
    Para isso, abra outro terminal e execute o seguinte comando
    ```sh
    $ docker exec companies-management-server npx prisma migrate dev
    ```
3. Para usar a aplicação é necessário ter um usuário admnistrador inicial registrado no banco de dados. Para isso, faça os seguintes passos.
Abra um terminal e digite:
```sh
$ docker container ls
```
Copie o CONTAINER ID do "companies-management-server" e faça o seguinte comando:
```sh
$ docker exec -it {CONTAINER ID} bash
```
Acesse o postgres:
```sh
$ psql -h 0.0.0.0 -p 8001 -U postgres
```
Insira o novo usuário no banco de dados. É necessário encriptar a senha, recomendo usar o seguinte site: https://bcrypt-generator.com (use rounds 10):
```sh
$ INSERT INTO "User"(name, cpf, email, password, type, "createdAt", "updatedAt")
VALUES ('Usuário administrador', '111.111.111-11', 'admin@hotmail.com', 'senha encriptada', 'ADMIN', current_timestamp, current_timestamp);
```
4. Para finalizar os containeres, rode o seguinte comando
    ```sh
    $ docker-compose down
    ```

#### Sem Docker

1. Crie um arquivo .env em /server. Em seguida, altere o arquivo .env
    ```sh
    PORT=PORTA_DO_SEU_SERVIDOR
    SERVER_URL=http://localhost/
    DATABASE_URL=postgresql://{USUARIO}:{SENHA}@{HOST}:{PORTA}/companies-management?schema=public&connect_timeout=300
    JWT_SECRET=chave_aleatoria
    ```
2. Altere o arquivo /client/vite.config.ts
    ```sh
    $ target: 'http://companies-management-server:9000/',       // Atual
    $ target: 'http://localhost:9000/',                         // Alteração
    ```

3. Na primeira vez que for rodar o projeto, vá para a pasta /server e rode os 2 seguintes comandos
    ```sh
    $ npx prisma generate
    $ npx prisma migrate dev
    ```

4. Para usar a aplicação é necessário ter um usuário administrador inicial registrado no banco de dados. Para isso, faça os seguintes passos. Acesse o postgres:
```sh
$ sudo -u postgres psql
```
Insira o novo usuário no banco de dados. É necessário encriptar a senha, recomendo usar o seguinte site: https://bcrypt-generator.com (use rounds 10):
```sh
$ INSERT INTO "User"(name, cpf, email, password, type, "createdAt", "updatedAt")
VALUES ('Usuário administrador', '111.111.111-11', 'admin@hotmail.com', 'senha encriptada', 'ADMIN', current_timestamp, current_timestamp);
```

Para executar o front-end e o back-end juntos, vá para a pasta /server e execute

    $ npm run both:dev

Para executar o backend, vá para a pasta /server e execute

    $ npm run dev

Para rodar o frontend, vá até a pasta /client e execute

    $ npm run dev

Ou vá para a pasta /server e execute

    $ npm run client
    
<!-- USAGE EXAMPLES -->

## Ilustrações

<p align="center">
  <img width="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/list_users.png" alt="Listagem de usuários">
  <img width="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/register_user.png" alt="Registro de usuário">
  <img width="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/list_users_dark_mode.png" alt="Listagem de usuários em dark mode">
  <img height="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/create_company_mobile.png" alt="Criação de empresas mobile">
  <img height="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/list_employees_mobile_dark_mode.png" alt="Listagem de funcionários mobile em dark mode">
  <img width="100%" src="https://github.com/christhian12rv/Companies-Management/blob/master/img/login.png" alt="Login">
</p>

## Explicação do projeto
O projeto consiste em um sistema web de gerenciamento de empresas.

Como nas ilustrações acima, você pode ver os usuários, empresas e funcionários registrados, atualizá-los e criar novos usuários, empresas e funcionários. Usuários administradores têm certas ações que usuários comuns não têm, como registrar outro usuário por exemplo.

O projeto é responsivo e totalmente utilizável em dispositivos mobile.