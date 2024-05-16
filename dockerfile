# build stage
FROM node:lts-alpine as build-stage

WORKDIR /temp

# Copying package files and installing dependencies
COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile && yarn cache clean --force

# Copying source files and building the application
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine

WORKDIR /chat_ui

# Copying only necessary files from build-stage
COPY --from=build-stage /temp/dist .

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
