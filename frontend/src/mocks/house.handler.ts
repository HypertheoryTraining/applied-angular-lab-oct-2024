import { delay, http, HttpResponse } from 'msw';
import {
  HouseListEntity,
  HouseRatingEntry,
} from '../app/halloween/pages/house-rating/types';

let fakeHouses: HouseListEntity[] = [
  {
    id: '1',
    address: '1212 Mockingbird Court',
    hasAmbiance: true,
    hasFullSizeCandy: false,
    qualityRating: 3,
    quantityRating: 1,
  },
  {
    id: '2',
    address: '506 Vaughn',
    hasAmbiance: false,
    hasFullSizeCandy: false,
    qualityRating: 3,
    quantityRating: 4,
  },
  {
    id: '3',
    address: '506 Reed',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 3,
    quantityRating: 4,
  },
  {
    id: '4',
    address: '506 Reed',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 3,
    quantityRating: 4,
  },
  {
    id: '5',
    address: '506 Reed',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 3,
    quantityRating: 4,
  },
  {
    id: '6',
    address: '506 Reed',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 3,
    quantityRating: 4,
  },
];

const handlers = [
  http.get('/api/houses', async () => {
    return HttpResponse.json(fakeHouses);
  }),
  http.delete('/api/houses', async ({ request }) => {
    const id = new URL(request.url).searchParams.get('id');
    fakeHouses = fakeHouses.filter((h) => h.id !== id);
    return HttpResponse.json();
  }),
  http.post('/api/houses', async ({ request }) => {
    const data = (await request.json()) as unknown as HouseRatingEntry;
    await delay(data.address.length * 1000);
    if (data.address === 'prospect') {
      return new HttpResponse('Address Not Found', { status: 400 });
    }
    const response = { id: crypto.randomUUID(), ...data };
    fakeHouses.push(response);
    return HttpResponse.json(response);
  }),
  http.put('/api/houses', async ({ request }) => {
    const data = (await request.json()) as unknown as HouseListEntity;
    await delay(data.address.length * 1000);
    if (data.address === 'prospect') {
      return new HttpResponse('Address Not Found', { status: 400 });
    }
    const response = data;
    fakeHouses = fakeHouses.filter((h) => h.id !== data.id);
    fakeHouses.push(response);
    return HttpResponse.json(response);
  }),
];

export default handlers;
