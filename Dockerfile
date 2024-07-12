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

  # Start the server using the production build
  CMD [ "node", "dist/main" ]