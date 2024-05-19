import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoService } from '../todo/todo.service';
import { TodoEntity } from '../entity/todo.entity';
import { CreateTodoDto } from './dtos/create-item.dto';
import { EditItemDto } from './dtos/edit-item.dto';
import { QueryItems } from './dtos/get-all-items.dto';

@Injectable()
export class TodoActor {
  constructor(private readonly todoService: TodoService) {}

  async findAll(params: QueryItems): Promise<TodoEntity[]> {
    const { search, isCompleted, orderBy, sortOrder } = params;
    return this.todoService.findAll(search, orderBy, sortOrder, isCompleted);
  }

  async findOne(id: number): Promise<TodoEntity> {
    const existingItem = await this.todoService.findById(id)
    if(!existingItem){
        throw new Error('Item with this id not exist')
    }
    return this.todoService.findOne(id);
  }

  async create(body: CreateTodoDto): Promise<CreateTodoDto> {
    return this.todoService.create(body);
  }

  async update(id: number, body: EditItemDto): Promise<EditItemDto> {
    const existingItem = await this.todoService.findById(id);
    if (!existingItem) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return this.todoService.update(id, body);
  }

  async remove(id: number): Promise<void> {
    const existingItem = await this.todoService.findById(id)
    if(!existingItem){
        throw new Error('Item with this id not exist')
    }
    return this.todoService.remove(id);
  }
}
