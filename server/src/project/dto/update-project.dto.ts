import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProjectDto {
  @Length(0, 20)
  name: string;

  @IsNotEmpty()
  groupId: number;
}
