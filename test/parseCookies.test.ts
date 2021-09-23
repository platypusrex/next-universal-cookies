import { GetServerSidePropsContext } from 'next';
import { parseCookies } from '../src';

describe('parseCookies', () => {
  it('should parse cookies using getServerSideProps context', () => {
    const ctx = {
      res: {},
      req: {
        headers: {
          cookie: 'token=1234;foo=bar;'
        }
      },
    } as GetServerSidePropsContext;

    const cookies = parseCookies(ctx);
    expect(cookies).toMatchObject({ token: '1234', foo: 'bar' })
  });
  it('should parse cookies on the client', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'token=1234;foo=bar;',
    });

    const cookies = parseCookies();
    expect(cookies).toMatchObject({ token: '1234', foo: 'bar' });
  });
});
