import { rest } from 'msw';
import { setupServer } from 'msw/node';
import makeHttpRequest, { makeHttpError } from './makeHttpRequest';

const successBody = { message: 'mock message', problems: 99 };
const errorBody = {};

const goodGet = rest.get('https://host.com/path', (req, res, ctx) => {
  return res(ctx.status(200, 'Mocked status'), ctx.json(successBody));
});

const goodGetXML = rest.get('https://host.com/xml', (req, res, ctx) => {
  return res(ctx.status(200, 'Mocked status'), ctx.xml('<key>value</key>'));
});

const badStatusGet = rest.get('https://hostbad.com/path', (req, res, ctx) => {
  return res(ctx.status(400, 'Mocked status'), ctx.json(errorBody));
});

const goodPost = rest.post('https://host.com/post-path', (req, res, ctx) => {
  return res(
    ctx.status(201, 'Mocked status'),
    ctx.json({ message: 'created' })
  );
});

const badServer = rest.put('https://hostbad.com/error', (req, res, ctx) => {
  throw new Error('Bad Server');
});

const server = setupServer(
  goodGet,
  goodGetXML,
  badStatusGet,
  goodPost,
  badServer
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('makeHttpRequest function', () => {
  it('should perform a GET request', async () => {
    const config = { hostname: 'host.com', method: 'GET', path: '/path' };
    const result = await makeHttpRequest(config);
    result.map((value) => expect(value).toEqual(successBody));
  });

  it('should be a resolved promise', async () => {
    const config = { hostname: 'host.com', method: 'GET', path: '/path' };
    return expect(makeHttpRequest(config)).resolves.toEqual(
      expect.objectContaining({ value: successBody })
    );
  });

  it('should perform a GET request and handle Bad Status', async () => {
    const config = { hostname: 'hostbad.com', method: 'GET', path: '/path' };
    const result = await makeHttpRequest(config);
    result.mapErr((err) =>
      expect(err.message).toEqual('http error: Bad Status')
    );
  });

  it('should handle Bad Config', async () => {
    const config = { hostname: 'hostbad.com', method: 'GET' };
    const result = await makeHttpRequest(config);
    result.mapErr((err) =>
      expect(err.message).toEqual('http error: Bad Config')
    );
  });

  it('should perform a POST request', async () => {
    const config = {
      hostname: 'host.com',
      method: 'POST',
      path: '/post-path',
      data: JSON.stringify({ userid: 'abc', thing: {} }),
    };
    const result = await makeHttpRequest(config);
    result.map((value) => expect(value).toEqual({ message: 'created' }));
  });

  it('should perform a GET request, returning a string', async () => {
    const config = { hostname: 'host.com', method: 'GET', path: '/xml' };
    const result = await makeHttpRequest(config);
    result.map((value) => expect(value).toEqual('<key>value</key>'));
  });

  it('should perform a GET request and handle Bad Server', async () => {
    const config = { hostname: 'hostbad.com', method: 'PUT', path: '/error' };
    const result = await makeHttpRequest(config);
    result.mapErr((err) =>
      expect(err.message).toEqual('http error: Bad Server')
    );
  });

  it('should reject a promise', async () => {
    const config = { hostname: 'hostbad.com', method: 'PUT', path: '/error' };
    return expect(makeHttpRequest(config)).resolves.toEqual(
      expect.objectContaining({ error: new Error('http error: Bad Server') })
    );
  });
});

describe('makeHttpError function', () => {
  it('should handle no-errors, edge case', () => {
    expect(makeHttpError({})).toEqual(new Error('http error'));
  });
});
