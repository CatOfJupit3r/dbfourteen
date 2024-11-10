#Build stage
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]