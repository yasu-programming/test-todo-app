import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
      };

      const mockTodo = {
        id: 1,
        ...createTodoDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.create.mockResolvedValue(mockTodo);

      const result = await controller.create(createTodoDto);

      expect(mockTodosService.create).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [
        {
          id: 1,
          title: 'Todo 1',
          description: 'Description 1',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Todo 2',
          description: 'Description 2',
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTodosService.findAll.mockResolvedValue(mockTodos);

      const result = await controller.findAll();

      expect(mockTodosService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockTodos);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const mockTodo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.findOne.mockResolvedValue(mockTodo);

      const result = await controller.findOne(1);

      expect(mockTodosService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    it('should update and return the todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };

      const mockTodo = {
        id: 1,
        title: 'Updated Todo',
        description: 'Test Description',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.update.mockResolvedValue(mockTodo);

      const result = await controller.update(1, updateTodoDto);

      expect(mockTodosService.update).toHaveBeenCalledWith(1, updateTodoDto);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('remove', () => {
    it('should remove the todo', async () => {
      mockTodosService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(mockTodosService.remove).toHaveBeenCalledWith(1);
    });
  });
});
