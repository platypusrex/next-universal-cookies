import { Cookie } from '../types';

export const areCookiesEqual = (a: Cookie, b: Cookie): boolean =>
  a.name === b.name &&
  a.options.domain === b.options.domain &&
  a.options.path === b.options.path &&
  a.options.httpOnly === b.options.httpOnly &&
  a.options.secure === b.options.secure &&
  a.options.sameSite === b.options.sameSite;
