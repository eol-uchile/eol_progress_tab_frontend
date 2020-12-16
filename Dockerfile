# pull official base image
FROM node:12.18.3-stretch as dev

# Add apt dependencies
RUN apt update \
  && apt install -yq libglu1 \
  && rm -rf /var/lib/apt/lists/*

# add `/app/node_modules/.bin` to $PATH
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Build Dependencies
COPY package.json ./
COPY package-lock.json ./

# Install
RUN npm install --silent
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]