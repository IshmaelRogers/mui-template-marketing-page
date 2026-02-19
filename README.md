# MUI Template: marketing-page (Docker Classroom Scaffold)

This repository packages the MUI marketing page template as a runnable React app with a Docker-only workflow for students.

## Prerequisite

- Docker Desktop

No local Node.js or npm setup is required for students.

## Run Development Environment

```bash
docker compose up --build dev
```

Open: `http://localhost:5173`

## Run Production Container

```bash
docker compose --profile prod up --build prod
```

Open: `http://localhost:8080`

## Optional Environment Variable

- `TEMPLATE_IMAGE_URL`

If set, template image URLs are built from this base URL. If not set, the app falls back to `https://mui.com`.

Example:

```bash
TEMPLATE_IMAGE_URL=https://mui.com docker compose up --build dev
```

## Project Notes

- JavaScript is the active runtime path (`src/marketing-page/MarketingPage.js`).
- TypeScript files are preserved in the repo as parallel reference sources.
- Students should use Docker commands only; all installs and runtime commands happen in containers.
