export const validatePasswordLength = (password: string) => {
  return !!password && password.length > 3;
};
