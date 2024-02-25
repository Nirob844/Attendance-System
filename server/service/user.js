import User, {
  find,
  findById,
  findByIdAndUpdate,
  findOne,
} from "../models/User";
import error from "../utils/error";

const findUsers = () => {
  return find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return findById(value);
  }
  return findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);

  if (user) {
    throw error("Email already in use", 400);
  }

  return findByIdAndUpdate(id, { ...data }, { new: true });
};

export default {
  findUserByProperty,
  createNewUser,
  findUsers,
  updateUser,
};
