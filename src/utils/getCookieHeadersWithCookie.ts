import { parseSetCookieHeaders } from './parseCookieHeaders';
import { areCookiesEqual } from './areCookiesEqual';
import { setCookieHeaders } from './setCookieHeaders';
import { Cookie } from '../types';

export const getCookieHeadersWithCookie = (
  cookie: Cookie,
  headers: string | string[] | number | undefined
): string[] => {
  // remove duplicates.
  if (typeof headers === 'string') headers = [headers];
  if (typeof headers === 'number') headers = [];
  if (typeof headers === 'undefined') headers = [];

  const existingCookies = parseSetCookieHeaders(headers);
  const missingCookies: Cookie[] = existingCookies.reduce<Cookie[]>(
    (acc, existingCookie) => {
      if (areCookiesEqual(cookie, existingCookie)) {
        return acc;
      } else {
        return acc.concat(existingCookie);
      }
    },
    [cookie]
  );

  // Parse the new cookies into header.
  return setCookieHeaders(missingCookies);
};
