# ESTÁGIO 1: BUILD
# Node compila o projeto React/Vite e gera o /dist
FROM node:24.16.0-alpine3.23 AS builder

WORKDIR /app

# Copia só o package.json primeiro (otimiza cache do Docker)
# Se o código mudar mas as deps não, ele pula o npm ci
COPY package*.json ./
RUN npm ci

# Recebe as variáveis VITE_ como build args
# (Vite embute elas no bundle em tempo de build, não de execução)
ARG VITE_API_URL
ARG VITE_USE_MOCK
ARG VITE_MP_PUBLIC_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK=$VITE_USE_MOCK
ENV VITE_MP_PUBLIC_KEY=$VITE_MP_PUBLIC_KEY

# Agora copia o restante do projeto
COPY . .

# Roda: tsc -b && vite build
RUN npm run build

# ESTÁGIO 2: SERVIR
# Nginx leve servindo só o /dist gerado acima
# Node, node_modules e source code são descartados aqui
FROM nginx:1.31.1-alpine3.23

COPY --from=builder /app/dist /usr/share/nginx/html

# Substitui config padrão do Nginx pela customizada
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
