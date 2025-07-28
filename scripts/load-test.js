import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

const errorRate = new Rate('error_rate');

const passengersLatency = new Trend('latency_passengers');
const flightsLatency = new Trend('latency_flights');
const aircraftsLatency = new Trend('latency_aircrafts');
const boardingPassesLatency = new Trend('latency_boarding_passes');
const boardingPassesDetailsLatency = new Trend('latency_boarding_passes_details');

export const options = {
  stages: [
    { duration: '30s', target: 25 },
    { duration: '1m', target: 75 },
    { duration: '2m', target: 150 },
    { duration: '1m30s', target: 150 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_failed': ['rate<0.01'],
    'http_req_duration': ['p(95)<800'],
    'error_rate': ['rate<0.02'],
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  const requestTags = { name: '', group: '' };

  group('Listar Passageiros', function () {
    requestTags.name = 'GET /passengers';
    requestTags.group = 'Listar Passageiros';

    const res = http.get(`${BASE_URL}/passengers`, { tags: requestTags });
    const isSuccess = check(res, { 'status é 200': (r) => r.status === 200 });
    
    errorRate.add(!isSuccess);
    passengersLatency.add(res.timings.duration, { group: requestTags.group });
  });
  
  sleep(1.5);

  group('Listar Voos', function () {
    requestTags.name = 'GET /flights';
    requestTags.group = 'Listar Voos';

    const res = http.get(`${BASE_URL}/flights`, { tags: requestTags });
    const isSuccess = check(res, { 'status é 200': (r) => r.status === 200 });

    errorRate.add(!isSuccess);
    flightsLatency.add(res.timings.duration, { group: requestTags.group });
  });
  
  sleep(1.5);

  group('Listar Aeronaves', function () {
    requestTags.name = 'GET /aircrafts';
    requestTags.group = 'Listar Aeronaves';

    const res = http.get(`${BASE_URL}/aircrafts`, { tags: requestTags });
    const isSuccess = check(res, { 'status é 200': (r) => r.status === 200 });

    errorRate.add(!isSuccess);
    aircraftsLatency.add(res.timings.duration, { group: requestTags.group });
  });
  
  sleep(1.5);

  group('Listar Cartões de Embarque', function () {
    requestTags.name = 'GET /boarding-passes';
    requestTags.group = 'Listar Cartões de Embarque';

    const res = http.get(`${BASE_URL}/boarding-passes`, { tags: requestTags });
    const isSuccess = check(res, { 'status é 200': (r) => r.status === 200 });
    
    errorRate.add(!isSuccess);
    boardingPassesLatency.add(res.timings.duration, { group: requestTags.group });
  });
  
  sleep(1.5);

  group('Listar Cartões com Detalhes', function () {
    requestTags.name = 'GET /boarding-passes/details';
    requestTags.group = 'Listar Cartões com Detalhes';

    const res = http.get(`${BASE_URL}/boarding-passes/details`, { tags: requestTags });
    const isSuccess = check(res, { 'status é 200': (r) => r.status === 200 });

    errorRate.add(!isSuccess);
    boardingPassesDetailsLatency.add(res.timings.duration, { group: requestTags.group });
  });

  sleep(3);
}

export function handleSummary(data) {
  const reportFilename = `relatorio-de-carga-${new Date().toISOString().slice(0,10)}.html`;
  
  return {
    [reportFilename]: htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
}