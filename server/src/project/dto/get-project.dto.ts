import { IsNotEmpty } from 'class-validator';

export class GetProjectDto {
  @IsNotEmpty()
  groupId: number;
}
