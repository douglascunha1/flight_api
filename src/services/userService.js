import * as repository from "../repository/userRepository.js";

export async function findAll() {
  return repository.findAll();
}

export async function findById(id) {
  const result = await repository.findById(id);

  if (!result.length) {
    throw new Error('User not found');
  }

  return result[0];
}

export async function create(data) {
  return repository.create(data);
}

export async function update(id, data) {
  return repository.update(id, data);
}

export async function remove(id) {
  return repository.remove(id);
}
