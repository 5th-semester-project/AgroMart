// __mocks__/next/router.js
const useRouter = () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    asPath: '/',
    pathname: '/',
    query: {},
    route: '/',
  });
  
  module.exports = { useRouter };
  