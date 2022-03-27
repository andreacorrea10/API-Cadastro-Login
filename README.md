<h1>PROJETO API CADASTRO LOGIN</h1>
<p>Projeto criado em <a href="https://nodejs.org/en/">NodeJS</a></p>

<h2>Frameworks utilizadas:</h2>
 <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>, <a href="https://www.npmjs.com/package/dotenv">Dotenv</a>, 
<a href="https://www.npmjs.com/package/express">Express</a>, <a href="https://www.npmjs.com/package/jsonwebtoken">JWT</a>, <a href="https://www.npmjs.com/package/mongoose">Mongoose</a> e <a href="https://www.npmjs.com/package/nodemon">Nodemon</a>(Dev Dependecies).

Utilizado <a href="https://www.mongodb.com/atlas">MongoDB Atlas</a>.

Sistema de cadastro de usuários e login pensado para empresas do segmento bancário.

Rotas GET e POST;
Rota pública, Registro de usuários, Reforço de senhas com Bcrypt gerando Hash e incluindo algoritimos;
Sistema com diversas validações para proteger os dados enviados;

Solicitação de dados como CPF e RG para cadastro, sendo os dados protegidos no Banco de dados.
Rota de login com Token para o usuário e validação do mesmo através do Token;

Rota privada e autenticação completa com <a href="https://www.npmjs.com/package/jsonwebtoken">JWT</a>.

API testada no <a href="https://www.postman.com/">Postman</a>.


<h3>Informações para uso:</h3>

Inserir o nome de usuário e senha do banco de dados cadastrado no <a href="https://www.mongodb.com/atlas">MongoDB Atlas</a> no arquivo <a href="./.env">.env</a> nos campos DB_USER e DB_PASS.