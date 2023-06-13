import { IsNotEmpty } from 'class-validator';

export class GetTaskDto {
  @IsNotEmpty()
  categoryId: number;
}
