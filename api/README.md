# Your Pirate Firend - API

## Stack

- Typescript
- NestJS
- Fastify
- Drizzle

## Hosting

- Digital Ocean Droplet (temporary)
- Docker

### Useful commands

```shell
docker build -t maeevick/ypf:latest --platform linux/amd64 .
docker run -d --platform linux/amd64 --env-file .env -p 3000:3000 maeevick/ypf
```
