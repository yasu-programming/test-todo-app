# Todo API

A simple Todo management REST API built with NestJS, TypeORM, and SQLite.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Input validation
- ✅ CORS enabled for frontend integration
- ✅ Swagger API documentation
- ✅ SQLite database with TypeORM
- ✅ Proper error handling

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Installation

```bash
npm install
```

## Running the app

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## API Documentation

After starting the application, visit http://localhost:3000/api to access the Swagger documentation.

## Todo Data Model

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, bread, and eggs",
  "completed": false,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Technology Stack

- **NestJS** - Node.js framework
- **TypeORM** - ORM for database operations
- **SQLite** - Database
- **class-validator** - Input validation
- **Swagger** - API documentation
- **TypeScript** - Type-safe JavaScript

## Learning Objectives

This project demonstrates:
- NestJS basic architecture (Controllers, Services, Modules)
- Decorator usage (@Controller, @Get, @Post, etc.)
- Dependency Injection
- TypeORM database operations
- Input validation with class-validator
- API documentation with Swagger
