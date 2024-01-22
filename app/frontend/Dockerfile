FROM node:latest
WORKDIR /app
COPY . .
RUN npm ci
RUN npm i -g serve
RUN npm run build
CMD ["serve", "-s", "build"]