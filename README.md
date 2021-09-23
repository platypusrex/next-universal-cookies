# 🍪 next-universal-cookies 🍪

[![npm Package](https://img.shields.io/npm/v/next-merge-props.svg)](https://www.npmjs.org/package/next-merge-props)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/platypusrex/next-merge-props/blob/master/LICENSE)

A proper collection of cookie helpers for use on both the client and server in Next.js applications

### Installation
npm
```shell script
npm install --save merge-next-props
```

or yarn
```shell script
yarn add merge-next-props
```

### Usage

#### Server

Any of the set of helpers can be utilized in `getServerSideProps`, `getInitialProps`, API routes.
For either `getServerSideProps` | `getInitialProps`, just pass in the context object as the first argument. 
If using the helpers in next API routes, pass `req` and `res` as an object in the first parameter:

```typescript
import { parseCookies } from 'next-universal-cookies';

const cookies = parseCookies({ req, res })
```

```typescript
// Parsing
import { getCookieValue, parseCookies } from 'next-universal-cookies';

// Parse all cookies
const cookies = parseCookies(ctx);

// Parse and get single cookie value
const cookieValue = getCookieValue(ctx, 'cookie');
```

```typescript
// Setting
import { setCookie } from 'next-universal-cookies';

// Set single cookie
setCookie(ctx, {
  name: 'cookie',
  value: 'cookie-value',
  options: {
    path: '/my-path',
    sameSite: 'strict'
  }
});

// or Set multiple cookies
setCookie(ctx, [
  {
    name: 'cookie',
    value: 'cookie-value',
    options: {
      path: '/my-path',
      sameSite: 'strict',
    },
  },
  {
    name: 'cookie-too',
    value: 'cookie-value-too',
  },
]);
```

```typescript
// Destroying
import { destroyCookie } from 'next-universal-cookies';

// Destory cookie with name 'cookie'
destroyCookie(ctx, 'cookie');
```

#### Client

The cookie helpers can also be utilized on the client. The function's input signature
is slightly altered when used client side. The `context` object is no longer required as 
an argument.

```typescript
// Parsing
import { getCookieValue, parseCookies } from 'next-universal-cookies';

// Parse all cookies
const cookies = parseCookies();

// Parse and get single cookie value
const cookieValue = getCookieValue('cookie');
```

```typescript
// Setting
import { setCookie } from 'next-universal-cookies';

// Set single cookie
setCookie({
  name: 'cookie',
  value: 'cookie-value',
  options: {
    path: '/my-path',
    sameSite: 'strict'
  }
});

// or Set multiple cookies
setCookie([
  {
    name: 'cookie',
    value: 'cookie-value',
    options: {
      path: '/my-path',
      sameSite: 'strict',
    },
  },
  {
    name: 'cookie-too',
    value: 'cookie-value-too',
  },
]);
```

```typescript
// Destroying
import { destroyCookie } from 'next-universal-cookies';

// Destory cookie with name 'cookie'
destroyCookie('cookie');
```

### Contributors
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### LICENSE
MIT
