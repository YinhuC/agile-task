import { Length } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 20)
  email?: string;

  @Length(0, 20)
  firstname?: string;

  @Length(0, 20)
  lastname?: string;

  password?: string;

  authMethod?: string;
}
