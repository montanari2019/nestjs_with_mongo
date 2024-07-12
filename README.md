<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/prisma/prisma-original.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.mongodb.com/" target="blank"><img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" width="200" alt="Nest Logo" /></a>
</p>

<div align="center">
   
</div>
<h1 align="center" >Api NestJS with MongoDB and Prisma io</h1 >

<h2 style="" >Tabela de Conteúdo</h2>

<ul>
   <li><a href="#tabela">Tabela de Conteúdo</a></li>
   <li><a href="#sobre">Sobre</a></li>
   <li><a href="#tecnologias">Tecnologias</a></li>
   <li><a href="#requisitos">Requisitos</a></li>
   <li><a href="#autores">Autor</a></li>

</ul>

</br>

# Sobre

<p dir="auto">
A aplicação back-end é uma API REST desenvolvida em NestJS. Ela utiliza o banco de dados MongoDB e o ORM Prisma para gerenciar as operações de persistência de dados. Este projeto foi criado exclusivamente para fins de estudo, visando a compreensão e a prática de tecnologias modernas de desenvolvimento web.
</br>

# Objetivo

O objetivo desta aplicação é explorar a utilização do MongoDB para criar uma API REST. Este projeto foi desenvolvido como parte de um desafio para testar bancos de dados não relacionais, com a finalidade de futuramente construir um data lake. Através desta aplicação, busca-se entender melhor as opções disponíveis e adquirir experiência prática com MongoDB e a integração com APIs REST.

# Características Principais

- **Modularidade**: Facilita a organização do código em módulos, tornando o desenvolvimento e a manutenção mais gerenciáveis.

- **Injeção de Dependência**s: Promove a reutilização e a testabilidade do código.

- **Arquitetura**: Baseado na arquitetura de servidores modernos, usando controladores, provedores e middleware.

- **Suporte para TypeScript**: Aproveita os recursos do TypeScript para aumentar a segurança e a produtividade.

- **Banco de Dados NoSQL**: Armazena dados em documentos JSON flexíveis, permitindo um esquema dinâmico.

- **Escalabilidade**: Suporta a distribuição de dados em várias máquinas.

- **Alto Desempenho**: Oferece consultas rápidas e eficientes, suportando grandes volumes de dados.

- **ORM**: Facilita a interação com o banco de dados, abstraindo consultas SQL complexas.

- **Type Safety**: Garante segurança de tipo nas operações do banco de dados, integrando-se bem com TypeScript.

- Gerenciamento de Migrações: Simplifica a criação e a aplicação de migrações de esquema.

### Mudança do Prisma para o Mongoose

- Pretende-se trocar o Prisma pelo Mongoose, pois o Prisma não oferece uma forma eficiente de usar classes que podem ser herdadas, algo que o Mongoose suporta de maneira nativa. A utilização de classes e herança no Mongoose permite uma modelagem de dados mais flexível e reutilizável, o que é crucial para o desenvolvimento e a manutenção a longo prazo da aplicação.

</br>

# Tecnologias

<ul>
   <li>
    <a target="_blank" href="https://nestjs.com/">NestJs</a>

   </li>
      <li>
      <a target="_blank" href="https://www.mongodb.com/">Mongo</a>
    </li>
   <li>
        <a  target="_blank"href="https://www.prisma.io/">Prisma IO</a>

   </li>
   <li>
        <a  target="_blank"href="https://www.docker.com/">Docker</a>

   </li>

   <li>
        <a  target="_blank"href="https://www.typescriptlang.org/">TypeScript</a>

   </li>

</ul>

</br>

# Requisitos

Para executar o projeto tanto local quanto para deploy basta seguir os passos abaixo. Não se esqueça de se atentar as variáveis de ambiente dispostas no arquivo **_.env.exemple_** que se encontra na raiz do projeto.

<ul>
   <li>Possuir Node.js versão LTS instalada</li>
   <li>Possuir NPM instalado (normalmente vem junto ao node.js)</li>
   <li>Seguir os passos abaixo</li>

 <br/>

      #clone este repositório
      $ git clone <https://github.com/montanari2019/nestjs_with_mongo.git>

      # Acesse a pasta do projeto no terminal/cmd
      $ cd posicao-diaria-back

      # Instale as dependências com o comando
      $ npm install

      # Execute o comando para iniciar o prisma
      $ npx prisma generate

      # Execute o comando para regularizar as migrações
      $ npx prisma migrate dev

      # Execute a aplicação em modo de desenvolvimento
      $ npm run dev


      # Servidor ira executar na porta indicada -
      $ acesse <http://localhost:3000 porta indiciada/>

<br/> <br/>

### Para executar o docker

  <ul>
     <li>Ter docker instalado</li>
   <li>Garantir que a pasta <strong>certs</strong> está na raiz o do projeto com o certificado digital e sua chave.</li>
   <li>Garanta que as configurações do arquivo <strong>  main.js </strong> na pasta src da aplicação para funcionar com ssh</li>
   <li>Seguir os passos abaixo</li>
   <li><strong>observação</strong/>: caso não queira executar o docker com ssh basta apenas remover os scripts que são relacionados a pasta certs</li>
  </ul>
  
  <br/>

      #Arquivo main.ts

      async function bootstrap() {

        const httpsOptions = {
          key: fs.readFileSync("./certs/chave.key"),
          cert: fs.readFileSync("./certs/newcert.cer"),
        }


        const app = await NestFactory.create(AppModule, {
          // httpsOptions,
        });

        app.enableCors({origin: "*"});




        const config = new DocumentBuilder()
          .setTitle('Performance Corporativa Documentation')
          .setDescription('This API refers to the creation of a tool to automate the extraction an consumption of large number from the cooperative Sicoob Credisul')
          .setVersion('1.0')
          .addTag('Performance Corporation Documentation')
          .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);

        app.useGlobalPipes(
          new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        );
        await app.listen(parseInt(process.env.PORT));
      }
      bootstrap();




      --------------------------------------------------------------------------------------

</br>
</br>
</br>

      # Arquivo Dockerfile/>

        FROM node

        # Create app directory
        WORKDIR ./

        # A wildcard is used to ensure both package.json AND package-lock.json are copied
        COPY package*.json ./
        COPY prisma ./prisma/
        # COPY .env .



        # Install app dependencies
        RUN npm install

        # Bundle app source
        COPY . .

        # Creates a "dist" folder with the production build
        RUN npm run build

        # EXPOSE 2106
        # Start the server using the production build
        CMD [ "node", "dist/main" ]

</br>
</br>
</br>

      #Arquivo docker-compose.yml

      version: '3.9'
        services:
        api:
            image: repoimage/nome_iamgem:1.2.5
            build: .
            env_file:
              .env
            ports:
              - 3000:3000

</br>
</br>
</br>

      #Execute o comando docker compose
      $ docker-compose up --build --force-recreate

      # Execute o push da sua imagem para o docker hub
      $ docker push nome_da_iamgem:lasted

      # Acesse o seu servidor
      ## execute o comando abaixo para executar o docker no servidor hospede

      $ docker run -d --name nome_contianer -p 3000:300 --restart always nome_da_imagem:lasted

</ul>

# Licença

<p dir="auto">Distribuído sob a licença MIT. Veja <code>LICENSE</code> para mais informações.</p>

# Autor

<p dir="auto">Ikaro Montanari, entusiasta por tecnologia e desenvolvedor front-end</p>
<p dir="auto">Formado em Análie e Desenvolvimento de Sistemas pelo IFRO em Vilhena-RO</p>

<p dir="auto">Desenvolvedor FullStack na Sicoob Credisul</p>

# Contato

<p>Linkedin <a target="_blank" href="https://www.linkedin.com/in/ikaro-montanari-5aa120208/">Ikaro Montanari</a> </p>
<p>Instagram  <a target="_blank" href="https://www.instagram.com/ikaro.montanari/">@ikaro_montanari</a> </p>
<p>Telefone <a target="_blank" href="https://api.whatsapp.com/send?phone=5569993569547&text=Ol%C3%A1%20ikaro">(69) 99356-9547</a> </p>
