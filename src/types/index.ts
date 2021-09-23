import { CookieSerializeOptions } from 'cookie';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from 'next';

export interface Cookie {
  name: string;
  value: string;
  options: CookieSerializeOptions;
}

export type NextContext =
  | NextPageContext
  | GetServerSidePropsContext
  | { req: NextApiRequest; res: NextApiResponse };
