FROM node:24-alpine


WORKDIR /app/webporto-be


COPY package*.json ./


RUN npm install


COPY . .


RUN npx prisma generate

RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "cluster"]
