import { CookieSerializeOptions, serialize } from 'cookie';
import { getCookieHeadersWithCookie, isBrowser } from './utils';
import { Cookie, NextContext } from './types';

export interface SetCookieOptions extends Omit<Cookie, 'options'> {
  options?: CookieSerializeOptions;
}

export function setCookie(cookie: SetCookieOptions | SetCookieOptions[]): void;
export function setCookie(ctx: NextContext, cookie: SetCookieOptions | SetCookieOptions[]): void;
export function setCookie(
  ctxOrCookie: NextContext | SetCookieOptions | SetCookieOptions[],
  cookie?: SetCookieOptions | SetCookieOptions[]
): void {
  let cookies;
  if (cookie) {
    cookies = cookie;
  } else {
    cookies = ctxOrCookie;
  }
  cookies = Array.isArray(cookies) ? cookies : [cookies];

  const ctx = ctxOrCookie as NextContext;
  if (ctx?.res && ctx.res.getHeader && ctx.res.setHeader) {
    const setCookieHeaders = ctx.res.getHeader('Set-Cookie');

    /* Adds the cookie to the list. */
    const newSetCookieHeaders = (cookies as Cookie[]).flatMap((c) =>
      getCookieHeadersWithCookie({ ...c, options: c.options || {} }, setCookieHeaders)
    );

    ctx.res.setHeader('Set-Cookie', newSetCookieHeaders);
  }

  if (isBrowser()) {
    (cookies as Cookie[]).forEach((c) => {
      document.cookie = serialize(c.name, c.value, c.options);
    });
  }
}
