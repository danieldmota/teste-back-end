# Usa imagem oficial do Node
FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração primeiro (para cache eficiente)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pelo servidor (ajuste se necessário)
EXPOSE 3000

# Comando padrão para iniciar o servidor
CMD ["npm", "start"]
