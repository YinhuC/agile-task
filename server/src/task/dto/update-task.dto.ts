import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateTaskDto {
  @Length(0, 50)
  @IsOptional()
  name?: string;

  @Length(0, 200)
  @IsOptional()
  description?: string;

  @IsOptional()
  index?: number;

  @IsNotEmpty()
  categoryId: number;
}
