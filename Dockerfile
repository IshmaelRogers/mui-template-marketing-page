FROM node:22-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM base AS build
ARG TEMPLATE_IMAGE_URL=
ENV TEMPLATE_IMAGE_URL=${TEMPLATE_IMAGE_URL}
RUN npm run build

FROM nginx:alpine AS prod
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
