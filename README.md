
# Notepad

Este é um bloco de notas criado usando tecnologias web. O objetivo é ter um bloco de notas 100% online e sempre disponível. Geralmente armazenamos informações importantes em nossos celulares ou computadores, mas esses dispositivos podem ficar sem bateria justamente no momento em que precisamos deles. Foi para resolver esse problema que este projeto foi desenvolvido.

## Instalação

1. Certifique-se de ter o Node.js e o MongoDB instalados em seu sistema.
2. Faça o download ou clone o projeto para o seu ambiente de desenvolvimento.

git clone https://github.com/LissaiDev/Notepad.git

3. Navegue até a pasta do projeto.

cd notepad

4. Instale as dependências do projeto.

npm install

markdown


## Configuração

1. No arquivo `app.js`, substitua a variável de ambiente `SESSION_SECRET` pela sua chave secreta para criação de sessão. Isso é importante para garantir a segurança das sessões no bloco de notas.

## Uso

1. Certifique-se de que o MongoDB esteja em execução no seu sistema.
2. No terminal, execute o seguinte comando para iniciar o servidor:

```shell
node app.js

    Abra um navegador da web e acesse http://localhost:8080 para acessar o bloco de notas.

    No bloco de notas, você pode criar, editar e excluir notas conforme necessário. As notas serão armazenadas no banco de dados MongoDB.

Tecnologias Utilizadas

    Node.js: Backend do projeto.
    MongoDB: Banco de dados para armazenar as notas.
    Mongoose: Biblioteca para manipulação de dados no MongoDB.
    EJS: Mecanismo de renderização para exibir as notas na interface do usuário.
    Passport: Biblioteca para autenticação de usuário.

Estrutura do Projeto

    app.js: Arquivo principal do aplicativo, contendo a configuração do servidor e as rotas.
    views/: Pasta contendo os arquivos de visualização EJS para renderizar a interface do usuário.
    public/: Pasta contendo arquivos estáticos, como folhas de estilo CSS e scripts JavaScript.
    package.json: Arquivo de manifesto do Node.js com as dependências e scripts do projeto.
