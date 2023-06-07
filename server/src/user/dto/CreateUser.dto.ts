import { IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEXES } from 'src/utils/regex';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 20)
  @Matches(REGEXES.EMAIL_REGEX, { message: MESSAGES.EMAIL_REGEX_MESSAGE })
  email: string;

  @IsNotEmpty()
  @Length(0, 20)
  firstname: string;

  @IsNotEmpty()
  @Length(0, 20)
  lastname: string;

  @IsNotEmpty()
  @Matches(REGEXES.PASSWORD_REGEX, { message: MESSAGES.PASSWORD_REGEX_MESSAGE })
  password: string;

  authMethod?: string;
}
