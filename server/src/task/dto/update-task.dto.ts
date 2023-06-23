import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateTaskDto {
  @Length(0, 50)
  @IsOptional()
  name: string;

  @IsOptional()
  index: number;

  @IsNotEmpty()
  categoryId: number;
}
