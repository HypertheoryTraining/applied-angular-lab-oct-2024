import { http, HttpResponse, delay } from 'msw';

const handlers = [
  http.get('/api/user-info', async () => {
    //await delay(3000);
    // return new HttpResponse('Not Authorized', {
    //   status: 401,
    // });
    return HttpResponse.json({
      scope: 'openid',
      client_id: 'TestToken',
      iss: 'http://www.bird.com/wam',
      aud: 'http://www.bird.com/wam',
      sub: 'Betty Boop',
      entity_type: 'birdInteral',
      role: ['createacct-01', '*dummy-role*'],
      version: '3.1',
      exp: 1727943623,
    });
  }),
];

export default handlers;
