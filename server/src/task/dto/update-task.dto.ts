import { IsOptional, Length } from 'class-validator';

export class UpdateTaskDto {
  @Length(0, 50)
  @IsOptional()
  name: string;

  @IsOptional()
  index: number;
}
