import { IsNotEmpty, Length } from 'class-validator';

export class UpdateTaskDto {
  @Length(0, 50)
  @IsNotEmpty()
  name: string;
}
