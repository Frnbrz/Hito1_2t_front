# react-nestjs-monorepo

**Trabajo para hito segundo trimestre**

## Features

- [Turborepo](https://turborepo.org/)
- [React](https://reactjs.org/) v18, [NestJs](https://nestjs.com/) v8.0.0
- 100% [Typescript](https://www.typescriptlang.org/)
- [Dockerize](https://docs.docker.com/) images

## Get Started

La instalacion de node modules se hace de forma global gracias a la ayuda de `TurboRepo` en vez de tener node_modules en cliente y server 

Instalacion de `node_modules`

```
yarn install
```

Dentro de `package.json` fuera de ambos repos estan los scripts que se ejecutan a la vez en ambos lados

Ejecucion en desarollo 

```
yarn dev
```

Build de front y back

```
yarn build
```

Ejecucion de aplicacion en produccion gracias a `@nestjs/serve-static`

```
npm run start
```
