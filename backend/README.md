<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Provider portal backend api. It providers access to the patient details and their status for a given provider/physician and thier doctors group using GraphQL queries and mutations.

## Major Technologies

NestJS
TypeORM
GraphQL

## Installation

To run this api, you must have stable NODE 18+ version and NestJS 9+ version

Please go to NodeJS to install 18+ version then install NestJs by running the following command

```bash
npm i -g @nestjs/cli
```

Navigate to the backend folder of the application run the following command

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# To generate migration
$ npm run typeorm:generate-migration --name:migration_name (name of the migration like User_PrimaryKey_Added)

# To create custom migration queries
$ npm run typeorm:create-migration --name:migration_name (name of the migration like Initial_Schema)

# To run the migration
$ npm run typeorm:run-migrations
```
