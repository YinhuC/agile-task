import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(0, 30)
  name: string;

  @IsOptional()
  @Length(0, 100)
  description: string;

  @IsNotEmpty()
  groupId: number;
}
