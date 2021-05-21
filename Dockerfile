# Build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

# Execution environment
FROM node:latest
WORKDIR /app
COPY --from=build /app/build /app/build
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
ENTRYPOINT ["npm", "run", "check"]
CMD ["jita"]
