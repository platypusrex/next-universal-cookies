import { CookieParseOptions, parse } from 'cookie';
import { isBrowser } from './utils';
import { NextContext } from './types';

export function parseCookies(
  ctx: NextContext,
  options?: CookieParseOptions
): Record<string, string>;
export function parseCookies(
  options?: CookieParseOptions
): Record<string, string>;
export function parseCookies(
  ctxOrOptions?: NextContext | CookieParseOptions,
  options?: CookieParseOptions
): Record<string, string> {
  const ctx = (ctxOrOptions as NextContext)?.req ? ctxOrOptions : null;
  const cookieOptions = ctx ? options : (ctxOrOptions as CookieParseOptions);
  const req = (ctx as NextContext)?.req;
  if (req?.headers.cookie) {
    return parse(req.headers.cookie as string, cookieOptions);
  }

  if (isBrowser()) {
    return parse(document.cookie, cookieOptions);
  }

  return {};
}
