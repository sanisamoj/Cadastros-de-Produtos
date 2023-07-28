# Cadastros-de-Produtos
Sistema de cadastros de produtos com Nodejs, Prisma ORM e banco de dados PostgresSQL.

##### Este é um sistema básico CRUD que permite cadastrar produtos com nome, descrição e valor, além de visualizá-los. Ele possui um filtro que permite exibir produtos ativos e inativos, com opções para ordená-los por valores crescentes ou decrescentes, e filtrar por valores mínimos e máximos. 
___

O sistema utiliza as seguintes tecnologias:

•	ORM Prisma para interagir com o banco de dados

•	Banco de dados PostgreSQL

•	Server-side com o NodeJS

•	Interface de visualização em ReactJS

Para instalar e visualizar o projeto em sua máquina siga os seguintes passos:

1 – Instale o PostgreSQL em sua máquina e anote a senha do usuário criado na instalação.

2 - Clone o projeto e, dentro das pastas “backend” e “frontend” execute o comando ***“npm install”***.

3 – Crie um arquivo. env na pasta backend, e digite o código 

>***DATABASE_URL="postgresql://postgres:”senha_do_usuário”@localhost:5432/crud_produtos?schema=public"***'''

No lugar de ***“senha_do_usuário”***, substitua pela senha do usuário criada durante a instalação do banco de dados. Geralmente, o nome padrão do usuário é “postgres”. Caso tenha alterado o host do banco de dados, ajuste o ***“localhost:5432”*** para o endereço correto.

4 – Na pasta backend, execute o comando ***‘’npx prisma migrate dev”***. Se tudo estiver correto, o Prisma criará um esquema no banco de dados.

5 – Ainda na pasta backend e execute o comando ‘’npm run dev’’. O console deverá exibir “Servidor online!”

6 – Navegue até a pasta frontend e execute o comando ***‘’npm start’’***. Isso irá abrir uma página no navegador. Caso não abra automaticamente, digite ***http://localhost:3000/*** na barra de endereços.

Com esses passos, você terá o sistema CRUD funcionando em sua máquina. Lembre-se de que esse é um sistema simples, mas pode ser um ótimo ponto de partida para aprender mais sobre o desenvolvimento de aplicações web com essas tecnologias.

---

<p align="center">
    <img src="https://github.com/sanisamoj/Cadastros-de-Produtos/assets/69211869/ecda5f2f-7b32-4f3d-9676-084d6b4a12cb" alt="Texto alternativo" />
</p>
<br/>
<p align="center">
    <img src="https://github.com/sanisamoj/Cadastros-de-Produtos/assets/69211869/ecda5f2f-7b32-4f3d-9676-084d6b4a12cb](https://github.com/sanisamoj/Cadastros-de-Produtos/assets/69211869/85f8bb8a-1ef5-46a7-af50-632f045901a3)" alt="Texto alternativo" />
</p>




