import { IsNotEmpty } from 'class-validator';

export class DeleteProjectDto {
  @IsNotEmpty()
  groupId: number;
}
