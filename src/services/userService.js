import * as repository from "../repository/userRepository.js";

export const login = async (email, password) => {
  const user = await repository.getUserByEmail(email);

  if (!user || user.password !== password) return null;
  
  return user;
};

export const getUsers = async () => repository.getAllUsers();

export const getUserById = async (id) => repository.getUserById(id);

export const create = async (data) => {
  const existingUser = await repository.getUserByEmail(data.login_email);

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  return repository.create(data);
};

export const update = async (id, data) => repository.update(id, data);

export const remove = async (id) => {
  const user = await repository.getUserById(id);

  if (!user) {
    return null;
  }
  
  return repository.remove(id);
};
