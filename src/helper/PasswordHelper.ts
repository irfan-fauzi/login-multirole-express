import bcrypt from "bcrypt";

const PasswordHashing = async (password: string) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const PasswordCompare = async (password: string, passwordHash: string) => {
  const metched = await bcrypt.compare(password, passwordHash);
  return metched;
};

export default { PasswordHashing, PasswordCompare };
