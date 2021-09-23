import { CookieParseOptions, CookieSerializeOptions, serialize } from 'cookie';
import { getCookieHeadersWithCookie, isBrowser } from './utils';
import { Cookie, NextContext } from './types';

export function destroyCookie(
  name: string,
  options?: CookieSerializeOptions
): void;
export function destroyCookie(
  ctx: NextContext,
  name: string,
  options?: CookieSerializeOptions
): void;
export function destroyCookie(
  ctxOrName?: NextContext | string,
  nameOrOptions?: string | CookieSerializeOptions,
  options?: CookieSerializeOptions
): void {
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

  const cookie: Cookie = {
    name: name as string,
    value: '',
    options: { ...((cookieOptions as CookieParseOptions) || {}), maxAge: -1 },
  };

  const res = (ctx as NextContext)?.res;
  if (res?.setHeader && res?.getHeader) {
    const setCookieHeaders = res.getHeader('Set-Cookie') || [];

    const newSetCookieHeaders = getCookieHeadersWithCookie(
      cookie,
      setCookieHeaders
    );

    res.setHeader('Set-Cookie', newSetCookieHeaders);
  }

  if (isBrowser()) {
    document.cookie = serialize(cookie.name, cookie.value, cookie.options);
  }
}
