import { IsNotEmpty, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(0, 20)
  name: string;

  @IsNotEmpty()
  groupId: number;
}
