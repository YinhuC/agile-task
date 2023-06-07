import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 20)
  email: string;

  @IsNotEmpty()
  @Length(0, 20)
  firstname: string;

  @IsNotEmpty()
  @Length(0, 20)
  lastname: string;

  @IsNotEmpty()
  password: string;

  authMethod?: string;
}
