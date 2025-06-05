import { NextRequest, NextResponse } from 'next/server';
import { todoStore } from '@/lib/todo-store';
import { CreateTodoRequest } from '@/types/todo';

export async function GET(): Promise<NextResponse> {
  try {
    const todos = todoStore.getAll();
    return NextResponse.json({
      todos,
      total: todos.length,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTodoRequest = await request.json();
    
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = todoStore.create(body.title.trim(), body.description?.trim());
    return NextResponse.json(todo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(): Promise<NextResponse> {
  try {
    todoStore.deleteAll();
    return NextResponse.json({ message: 'All todos deleted' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete todos' },
      { status: 500 }
    );
  }
}