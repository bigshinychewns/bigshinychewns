FROM node:17.4-bullseye

# Install pnpm
#RUN curl -fsSL https://get.pnpm.io/install.sh | sh -; node - add --global pnpm
RUN corepack enable; corepack prepare pnpm@7.11.0 --activate
