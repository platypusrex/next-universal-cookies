import { CookieParseOptions } from 'cookie';
import { NextContext } from './types';
import { parseCookies } from './parseCookies';

export function getCookieValue(
  name: string | string[],
  options?: CookieParseOptions
): string | undefined;
export function getCookieValue(
  ctx: NextContext,
  name: string | string[],
  options?: CookieParseOptions
): string | undefined;
export function getCookieValue(
  ctxOrName?: NextContext | string | string[],
  nameOrOptions?: string | string[] | CookieParseOptions,
  options?: CookieParseOptions
): string | Record<string, string | undefined> | undefined {
  const hasCtx =
    ctxOrName && typeof ctxOrName !== 'string' && !Array.isArray(ctxOrName);
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

  return Array.isArray(name)
    ? name.reduce<Record<string, string>>((acc, curr) => {
        acc[curr] = cookies[curr];
        return acc;
      }, {})
    : cookies[name as string];
}
