FROM node:18.12.1-alpine3.17

WORKDIR /app

# Copie os arquivos de definição do pacote
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install --production

# Copie os outros arquivos para a imagem
COPY /dist/ ./dist/

CMD [ "node", "dist/main.js" ]
