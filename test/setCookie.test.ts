import { GetServerSidePropsContext } from 'next';
import * as http from 'http';
import * as net from 'net';
import { setCookie } from '../src';

describe('setCookie', () => {
  it('should set cookies on the server via context', () => {
    const setHeader = jest.fn(() => {
      const socket = new net.Socket();
      const incomingMessage = new http.IncomingMessage(socket);
      return new http.ServerResponse(incomingMessage);
    });
    const getHeader = jest.fn(() => {
      return undefined;
    });

    const ctx = ({
      res: {
        setHeader,
        getHeader,
      },
      req: {},
    } as unknown) as GetServerSidePropsContext;

    setCookie(ctx, {
      name: 'mock-cookie',
      value: 'mock-cookie-value',
    });

    expect(getHeader).toHaveBeenCalledWith('Set-Cookie');
    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', [
      'mock-cookie=mock-cookie-value',
    ]);
  });
  it('should set multipleCookies via server context', () => {
    const setHeader = jest.fn(() => {
      const socket = new net.Socket();
      const incomingMessage = new http.IncomingMessage(socket);
      return new http.ServerResponse(incomingMessage);
    });
    const getHeader = jest.fn(() => {
      return undefined;
    });

    const ctx = ({
      res: {
        setHeader,
        getHeader,
      },
      req: {},
    } as unknown) as GetServerSidePropsContext;

    setCookie(ctx, [
      {
        name: 'mock-cookie',
        value: 'mock-cookie-value',
      },
      {
        name: 'mock-cookie-2',
        value: 'mock-cookie-value-2',
        options: {
          path: '/my-path',
          sameSite: 'strict',
        },
      },
    ]);

    expect(getHeader).toHaveBeenCalledWith('Set-Cookie');
    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', [
      'mock-cookie=mock-cookie-value',
      'mock-cookie-2=mock-cookie-value-2',
    ]);
  });
  it('should set multiple cookie via document on the client', () => {
    Object.defineProperty(global.document, 'cookie', {
      get() {
        return this.value || '';
      },
      set(value: any) {
        if (!this.value) {
          this.value = '';
        }
        this.value += value + ';';
      },
    });

    setCookie([
      {
        name: 'cookie',
        value: 'cookie-value',
      },
      {
        name: 'cookie-2',
        value: 'cookie-value-2',
      },
    ]);

    expect(document.cookie).toEqual(
      'cookie=cookie-value;cookie-2=cookie-value-2;'
    );
  });
});
