import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entity/todo.entity';
import { CreateTodoDto } from './dtos/create-item.dto';
import { OrderBy, SortOrder } from './dtos/get-all-items.dto';
import { isEmpty } from 'class-validator';
import { EditItemDto } from './dtos/edit-item.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  findAll(search: string, orderBy: OrderBy, sortOrder: SortOrder, isCompleted): Promise<TodoEntity[]> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    if(!isEmpty(search)){
      queryBuilder.where('LOWER(todo.title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
    if(!isEmpty(isCompleted)){
      queryBuilder.where('todo.isCompleted = :isCompleted', {isCompleted});
    }
    switch(orderBy) {
      case OrderBy.dueDate:
        queryBuilder
          .orderBy('todo.dueDate', sortOrder);
        break;
      case OrderBy.title:
        queryBuilder
          .orderBy('todo.title', sortOrder);
        break;
      default:
        queryBuilder
          .orderBy('todo.title', 'DESC');
        break;
  }
  return queryBuilder.getRawMany();
}

  findOne(id: number): Promise<TodoEntity> {
    return this.todoRepository.findOneBy({ id });
  }

  create(body: CreateTodoDto): Promise<CreateTodoDto> {
    return this.todoRepository.save(body);
  }

  async update(id: number, body: EditItemDto): Promise<TodoEntity> {
    await this.todoRepository.update(id, body);
    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async findById(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy({ id });
  }
}

