import * as repository from "../repository/flightRepository.js";

export async function findAll() {
  return repository.findAll();
}

export async function findById(id) {
  const result = await repository.findById(id);

  if (!result.length) {
    throw new Error('Flight not found');
  }

  return result[0];
}

export async function create(data) {
  const existingFlight = await repository.findByFlightNumber(data.flight_number);

  if (existingFlight && existingFlight.length > 0) {
    throw new Error('Flight number already exists');
  }

  const formattedData = {
    ...data,
    departure_time: new Date(data.departure_time),
    arrival_time: new Date(data.arrival_time),
  };

  return repository.create(formattedData);
}

export async function update(id, data) {
  if (data.flight_number) {
    const existingFlight = await repository.findByFlightNumber(data.flight_number);

    if (existingFlight && existingFlight.length > 0 && existingFlight[0].id !== id) {
      throw new Error('Flight number already exists');
    }
  }

  if (data.departure_time) {
    data.departure_time = new Date(data.departure_time);
  }
  
  if (data.arrival_time) {
    data.arrival_time = new Date(data.arrival_time);
  }

  return repository.update(id, data);
}

export async function remove(id) {
  return repository.remove(id);
}
