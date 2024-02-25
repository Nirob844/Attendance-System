import { hash as _hash, compare, genSalt } from "bcryptjs";
import { sign } from "jsonwebtoken";
import error from "../utils/error.js";
import { createNewUser, findUserByProperty } from "./user";

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) {
    throw error("User already exists", 400);
  }

  const salt = await genSalt(10);
  const hash = await _hash(password, salt);
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw error("Invalid Credential", 400);
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw error("Invalid Credential", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return sign(payload, "secret-key", { expiresIn: "2h" });
};

export default { registerService, loginService };
