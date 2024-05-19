import { IsNotEmpty, IsString, IsDateString, IsBoolean, isDate, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Buy groceries', description: 'The title of the todo' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Milk, Bread, Cheese', description: 'The description of the todo' })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-05-20', description: 'The due date of the todo' })
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The completion status of the todo' })
  isCompleted: boolean;
}
