Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
})
global.crypto.subtle = {}

jest.mock('query-string', () => ({
  stringifyUrl: jest.fn().mockImplementation(({ url, query }) => `${url}?${new URLSearchParams(query).toString()}`),
}));
