// Regexes to match user input
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const REGEXES = { PASSWORD_REGEX, EMAIL_REGEX };

// Messages displayed when input does not match regex
const PASSWORD_REGEX_MESSAGE =
  'Password must be at least 8 characters long, contain a number, uppercase character and lower case character.';

const EMAIL_REGEX_MESSAGE = 'Please provide a valid email.';

export const MESSAGES = { PASSWORD_REGEX_MESSAGE, EMAIL_REGEX_MESSAGE };
