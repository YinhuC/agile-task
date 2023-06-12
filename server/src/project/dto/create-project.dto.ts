import { IsNotEmpty, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(0, 20)
  name: string;

  @IsNotEmpty()
  @Length(0, 100)
  description: string;

  @IsNotEmpty()
  groupId: number;
}
