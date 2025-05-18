import * as repository from "../repository/boardingPassRepository.js";

export async function findAll() {
  return repository.findAll();
}

export async function findById(id) {
  const result = await repository.findById(id);

  if (!result.length) {
    throw new Error('BoardingPass not found');
  }

  return result[0];
}

export async function create(data) {
  const formattedData = {
    ...data,
    issue_time: new Date(data.issue_time)
  };

  return repository.create(formattedData);
}

export async function update(id, data) {

  if (data.issue_time) {
    data.issue_time = new Date(data.issue_time);
  }

  return repository.update(id, data);
}

export async function remove(id) {
  return repository.remove(id);
}

export async function getDetailedBoardingPasses() {
  return repository.findDetailedBoardingPasses();
}