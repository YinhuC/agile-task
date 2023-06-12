import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProjectDto {
  @Length(0, 20)
  name: string;

  @Length(0, 100)
  description: string;

  @IsNotEmpty()
  groupId: number;
}
