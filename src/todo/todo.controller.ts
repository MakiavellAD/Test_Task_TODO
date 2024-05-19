import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoActor } from '../todo/todo.actor';
import { TodoEntity } from '../entity/todo.entity';
import { CreateTodoDto } from './dtos/create-item.dto';
import { EditItemDto } from './dtos/edit-item.dto';
import { QueryItems } from './dtos/get-all-items.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoActor: TodoActor) {}

  @Get('all/item')
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todo'})
  findAll(@Query() params: QueryItems,
): Promise<TodoEntity[]> {
    return this.todoActor.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'Return the todo', type: TodoEntity })
  findOne(@Param('id') id: number): Promise<TodoEntity> {
    return this.todoActor.findOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created.'})
  create(@Body() body: CreateTodoDto): Promise<CreateTodoDto> {
    return this.todoActor.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by id' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully updated.'})
  update(@Param('id') id: number, @Body() todo: EditItemDto): Promise<EditItemDto> {
    return this.todoActor.update(id, todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by id' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.todoActor.remove(id);
  }
}
