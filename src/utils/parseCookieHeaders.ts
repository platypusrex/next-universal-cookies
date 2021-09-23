import { CookieSerializeOptions } from 'cookie';
import { isNonEmptyString } from './isNonEmptyString';
import { Cookie } from '../types';

export const parseSetCookieHeaders = (headers: string[]): Cookie[] =>
  headers.map(header => {
    /* Parses name and value parts. */
    const [nameAndValue, ...parts] = header.split(';').filter(isNonEmptyString);
    const [name, ...rawValue] = nameAndValue.split('=');
    const value = decodeURIComponent(rawValue.join('='));

    /* Parses serialization options. */
    const options = parts.reduce<CookieSerializeOptions>((acc, part) => {
      const [rawKey, ...rawValue] = part.split('=');
      const key = rawKey.trimLeft().toLowerCase();
      const value = rawValue.join('=');

      switch (key) {
        case 'domain':
          return { ...acc, domain: value };
        case 'expires':
          return { ...acc, expres: new Date(value) };
        case 'httponly':
          return { ...acc, httpOnly: true };
        case 'max-age':
          return { ...acc, maxAge: parseInt(value, 10) };
        case 'path':
          return { ...acc, path: value };
        case 'samesite': {
          const sameSite = value.toLowerCase();
          switch (sameSite) {
            case 'strict':
              return { ...acc, sameSite: 'strict' };
            case 'lax':
              return { ...acc, sameSite: 'lax' };
            case 'none':
              return { ...acc, sameSite: 'none' };
            default: {
              throw new Error('samesite value not set.');
            }
          }
        }
        case 'secure':
          return { ...acc, secure: true };
        default:
          return { ...acc, [key]: value };
      }
    }, {});

    const cookie: Cookie = {
      name: name,
      value: value,
      options: options,
    };

    return cookie;
  });
