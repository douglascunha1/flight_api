import * as repository from "../repository/passengerRepository.js";

export async function findAll() {
  return repository.findAll();
}

export async function findById(id) {
  const result = await repository.findById(id);

  if (!result.length) {
    throw new Error('Passenger not found');
  }

  return result[0];
}
export async function create(data) {
  const existing = await repository.findByPassportNumber(data.passport_number);

  if (existing && existing.length > 0) {
    throw new Error('Passport number already exists');
  }

  return repository.create(data);
}

export async function update(id, data) {
  if (data.passport_number) {
    const existing = await repository.findByPassportNumber(data.passport_number);

    if (existing && existing.length > 0 && existing[0].id !== id) {
      throw new Error('Passport number already exists');
    }
  }
  
  return repository.update(id, data);
}

export async function remove(id) {
  return repository.remove(id);
}
