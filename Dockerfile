# Build environment
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# Execution environment
FROM node:alpine
WORKDIR /app
COPY --from=build /app/build /app/build
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN npm i -g npm@latest && npm i --production
ENTRYPOINT ["npm", "run", "check"]
CMD ["jita"]
