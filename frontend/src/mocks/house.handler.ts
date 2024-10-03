import { delay, http, HttpResponse } from 'msw';
import {
  HouseListEntity,
  HouseRatingEntry,
} from '../app/halloween/pages/house-rating/types';

const fakeHouses: HouseListEntity[] = [
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

const weirdData = [
  {
    id: '1',
    address: {
      street: '506 Reed',
      city: 'Akron',
      state: 'Oh',
    },
    ratings: {
      ambiance: 3,
      candy: 4,
    },
    qualityRating: 3,
    quantityRating: 4,
  },
];

const handlers = [
  http.get('/api/houses', async () => {
    //return HttpResponse.json([{ name: 'Brad' }, { name: 'Sarah' }]);
    //return HttpResponse.json(weirdData);
    return HttpResponse.json(fakeHouses);
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
  http.delete('/api/houses/:id', async ({ params }) => {
    const { id } = params;
    const index = fakeHouses.findIndex((house) => house.id === id);
    if (index === 12) {
      return new HttpResponse('House Not Found', { status: 404 });
    }
    fakeHouses.splice(index, 1);
    return new HttpResponse('House Deleted', { status: 200 });
  }),
];

export default handlers;
