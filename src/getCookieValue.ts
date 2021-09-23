import { CookieParseOptions } from 'cookie';
import { NextContext } from './types';
import { parseCookies } from './parseCookies';

export function getCookieValue (name: string, options?: CookieParseOptions): string | undefined;
export function getCookieValue (
  ctx: NextContext,
  name: string,
  options?: CookieParseOptions
): string | undefined;
export function getCookieValue (
  ctxOrName?: NextContext | string,
  nameOrOptions?: string | CookieParseOptions,
  options?: CookieParseOptions
): string | undefined {
  const hasCtx = ctxOrName && typeof ctxOrName !== 'string';
  let ctx, name, cookieOptions;

  if (hasCtx) {
    ctx = ctxOrName;
    name = nameOrOptions;
    cookieOptions = options;
  } else {
    ctx = null;
    name = ctxOrName;
    cookieOptions = nameOrOptions;
  }

  const cookies = ctx
    ? parseCookies(ctx as NextContext, cookieOptions as CookieParseOptions)
    : parseCookies(cookieOptions as CookieParseOptions);
  return cookies[name as string];
}
