import { IsString, IsDateString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditItemDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Buy groceries', description: 'The title of the todo' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Milk, Bread, Cheese', description: 'The description of the todo' })
  description?: string;

  @IsOptional()
  @IsDateString()
  @IsDate()
  @ApiPropertyOptional({ example: '2024-05-20', description: 'The due date of the todo' })
  dueDate?: Date;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: false, description: 'The completion status of the todo' })
  isCompleted?: boolean;
}
