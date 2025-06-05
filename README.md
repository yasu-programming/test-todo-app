# Todo App

A modern, responsive Todo application built with Next.js 14+, TypeScript, and Tailwind CSS.

![Todo App Screenshot](./docs/screenshot.png)

## 🚀 Features

- ✅ **Todo Management**: Create, read, update, and delete todos
- ✅ **Rich Editing**: Inline editing with title and description
- ✅ **Status Toggle**: Mark todos as complete/incomplete
- ✅ **Responsive Design**: Optimized for mobile and desktop
- ✅ **Real-time Updates**: Optimistic updates with SWR
- ✅ **Loading States**: Visual feedback during operations
- ✅ **Error Handling**: Graceful error handling with retry options
- ✅ **Statistics**: Track total, active, and completed todos
- ✅ **Bulk Operations**: Clear all todos at once
- ✅ **Modern UI**: Clean, accessible interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (with optimistic updates)
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Development**: ESLint, Hot Reload

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📺 Tablets (768px+)
- 💻 Desktop screens (1024px+)

## 🏗️ Architecture

### Frontend (Client Components)
- **TodoForm**: Add new todos with expandable description field
- **TodoList**: Display todos with active/completed sections
- **TodoItem**: Individual todo with inline editing, delete, and toggle
- **LoadingSpinner**: Reusable loading component
- **ErrorState**: Error handling with retry functionality

### Backend (API Routes)
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Fetch a specific todo
- `PATCH /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo
- `DELETE /api/todos` - Delete all todos

### Data Management
- **SWR**: Client-side data fetching with caching
- **Optimistic Updates**: Immediate UI updates with server sync
- **In-Memory Store**: Simple data persistence (can be replaced with database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yasu-programming/test-todo-app.git
cd test-todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── todos/         # Todo CRUD endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── TodoForm.tsx       # Add todo form
│   ├── TodoItem.tsx       # Individual todo item
│   ├── TodoList.tsx       # Todo list container
│   ├── LoadingSpinner.tsx # Loading component
│   └── ErrorState.tsx     # Error handling component
├── hooks/                 # Custom React hooks
│   └── useTodos.ts        # Todo management hook
├── lib/                   # Utilities
│   ├── api.ts             # API client
│   ├── todo-store.ts      # Data store
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
    └── todo.ts            # Todo-related types
```

## 🎯 Learning Objectives

This project demonstrates:

- **Next.js App Router**: Modern routing and server components
- **Server vs Client Components**: Proper component architecture
- **API Development**: RESTful API design with Next.js
- **State Management**: Client-side state with SWR
- **TypeScript**: Type-safe React development
- **Responsive Design**: Mobile-first CSS with Tailwind
- **Error Handling**: Graceful error states and recovery
- **Performance**: Optimistic updates and caching strategies

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Drag-and-drop reordering
- [ ] Dark mode support
- [ ] PWA features (offline support)
- [ ] Real-time collaboration
- [ ] Todo sharing and export

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Heroicons](https://heroicons.com/) for the beautiful icons
- [SWR](https://swr.vercel.app/) for data fetching
- [Vercel](https://vercel.com/) for hosting and deployment
