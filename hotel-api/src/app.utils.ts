const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&+-]).{8,64}$/;

const PASSWORD_MESSAGE =
  'The password must have at least one uppercase letter, one lowercase letter, one number, and one symbol.';
export const REGEX = {
  PASSWORD_RULE,
  PASSWORD_MESSAGE,
};