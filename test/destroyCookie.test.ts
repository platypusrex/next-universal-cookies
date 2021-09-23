import { GetServerSidePropsContext } from 'next';
import * as http from 'http';
import * as net from 'net';
import { destroyCookie } from '../src';

describe('destroyCookie', () => {
  it('should destroy cookies on the server via context', () => {
    const setHeader = jest.fn(() => {
      const socket = new net.Socket();
      const incomingMessage = new http.IncomingMessage(socket);
      return new http.ServerResponse(incomingMessage);
    });
    const getHeader = jest.fn(() => {
      return undefined;
    });

    const ctx = {
      res: {
        setHeader,
        getHeader
      },
      req: {},
    } as unknown as GetServerSidePropsContext;

    destroyCookie(ctx, 'mock-cookie');

    expect(getHeader).toHaveBeenCalledWith('Set-Cookie');
    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', ['mock-cookie=; Max-Age=-1']);
  });
  it('should set multiple cookie via document on the client', () => {
    Object.defineProperty(global.document, 'cookie', {
      get(){
        return this.value || '';
      },
      set(value: any) {
        if (!this.value) {
          this.value = '';
        }
        this.value += value + ';';
      },
    });

    destroyCookie('mock-cookie');

    expect(document.cookie).toEqual('mock-cookie=; Max-Age=-1;');
  });
})
