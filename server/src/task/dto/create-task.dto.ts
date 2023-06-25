import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(0, 50)
  @IsNotEmpty()
  name: string;

  @Length(0, 200)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  categoryId: number;
}
