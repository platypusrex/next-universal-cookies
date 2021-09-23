import { GetServerSidePropsContext } from 'next';
import { getCookieValue } from '../src';

describe('getCookieValue', () => {
  it('should get a cookie value via server context', () => {
    const ctx = {
      res: {},
      req: {
        headers: {
          cookie: 'token=1234;foo=bar;'
        }
      },
    } as GetServerSidePropsContext;

    const cookies = getCookieValue(ctx, 'token');
    expect(cookies).toEqual('1234');
  });
  it('should get a cookies value on the client', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'token=1234;foo=bar;Max-Age=1000',
    });

    const cookies = getCookieValue('token');
    expect(cookies).toEqual('1234');
  });
});
