FROM node:17.4-bullseye

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
