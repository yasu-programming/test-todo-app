# Todo App - Full Stack Integration

A full-stack Todo application with NestJS backend and Next.js frontend, featuring complete API integration and deployment-ready configuration.

## Architecture

- **Backend**: NestJS with TypeScript, TypeORM, SQLite
- **Frontend**: Next.js with TypeScript, SWR, Tailwind CSS
- **Database**: SQLite (development), configurable for production
- **API Documentation**: Swagger UI available at `/api`

## Development Environment Setup

### Prerequisites

- Node.js 20+
- npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3001`
API documentation at `http://localhost:3001/api`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running Both Services

You can run both services simultaneously using the provided Docker Compose configuration:

```bash
# Development environment
docker-compose up

# Production environment
docker-compose -f docker-compose.prod.yml up
```

## API Integration

The frontend communicates with the backend through RESTful APIs:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

### Error Handling

The application includes comprehensive error handling:
- Network connectivity errors
- API validation errors
- Server errors
- Optimistic updates with rollback on failure

## Environment Variables

### Backend (.env)
```
PORT=3001
DATABASE_PATH=database.sqlite
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

## Testing

### Backend Tests
```bash
cd backend
npm test                # Unit tests
npm run test:e2e       # E2E tests
npm run test:cov       # Coverage report
```

### Frontend Linting
```bash
cd frontend
npm run lint
```

## Production Deployment

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

#### Backend Deployment (Railway)
1. Connect your repository to Railway
2. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=3001`
   - `CORS_ORIGIN=https://your-frontend-domain.vercel.app`
3. Deploy using the provided `railway.json` configuration

#### Frontend Deployment (Vercel)
1. Connect your repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app`
3. Deploy using the provided `vercel.json` configuration

### Option 2: Docker Deployment

#### Single Server with Docker Compose
```bash
# Production deployment
FRONTEND_URL=https://your-domain.com BACKEND_URL=https://your-api-domain.com docker-compose -f docker-compose.prod.yml up -d
```

#### Separate Container Deployment
Build and deploy individual containers:

```bash
# Backend
cd backend
docker build -t todo-backend .
docker run -p 3001:3001 -e NODE_ENV=production todo-backend

# Frontend
cd frontend
docker build -t todo-frontend .
docker run -p 3000:3000 -e NODE_ENV=production todo-frontend
```

## Features

### Backend Features
- ✅ RESTful API with full CRUD operations
- ✅ TypeScript with strong typing
- ✅ Data validation with class-validator
- ✅ Swagger API documentation
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Docker containerization
- ✅ Comprehensive test suite

### Frontend Features
- ✅ Modern React with Next.js App Router
- ✅ TypeScript integration
- ✅ Real-time data fetching with SWR
- ✅ Optimistic updates
- ✅ Error handling and loading states
- ✅ Responsive design with Tailwind CSS
- ✅ Docker containerization

### Integration Features
- ✅ Frontend-Backend API integration
- ✅ Environment-based configuration
- ✅ CORS configuration for cross-origin requests
- ✅ Type-safe API communication
- ✅ Error boundary and fallback handling
- ✅ Development proxy configuration

## Future Enhancements

- [ ] Authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Database migrations
- [ ] Automated testing pipeline
- [ ] Monitoring and logging
- [ ] Performance optimization

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS configuration includes your frontend domain
2. **API Connection**: Verify the `NEXT_PUBLIC_API_URL` environment variable
3. **Database Issues**: Check SQLite file permissions and path
4. **Port Conflicts**: Ensure ports 3000 and 3001 are available

### Development Tips

- Use browser developer tools to inspect network requests
- Check backend logs for API errors
- Verify environment variables are loaded correctly
- Use the Swagger documentation to test API endpoints directly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
