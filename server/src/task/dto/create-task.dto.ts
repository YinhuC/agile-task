import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(0, 50)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  categoryId: number;
}
