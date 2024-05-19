import { IsNotEmpty, IsString, IsDateString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export enum SortOrder {
  asc = 'ASC',
  desc = 'DESC',
}

export enum OrderBy {
  title = 'title',
  dueDate = 'dueDate',
}

export class QueryItems {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsBoolean()
  isCompleted: boolean;

  @ApiPropertyOptional({ enum: OrderBy })
  @IsOptional()
  @IsEnum(OrderBy)
  @IsNotEmpty()
  orderBy: OrderBy;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  @IsNotEmpty()
  sortOrder: SortOrder;
}