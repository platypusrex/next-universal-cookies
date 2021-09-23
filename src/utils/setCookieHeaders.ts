import { serialize } from 'cookie';
import { Cookie } from '../types';

export const setCookieHeaders = (cookies: Cookie[]): string[] =>
  cookies.map((cookie) => serialize(cookie.name, cookie.value, cookie.options));
