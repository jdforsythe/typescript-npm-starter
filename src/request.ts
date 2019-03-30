import * as got from 'got';

import {
  EmptyEchoRequestError,
  TooManyPropertiesError,
} from './error';

const API_REQUEST_OPTS: got.GotJSONOptions = { json: true, timeout: 3000 };

/**
 * A valid request is an object with string or number values
 */
export interface EchoRequest {
  [key: string]: string | number;
}

/**
 * Given an EchoRequest, get the request URL for the echo.jsontest.com call
 */
export const getRequestUrl = (req: EchoRequest): string => {
  if (!req) {
    throw new EmptyEchoRequestError();
  }

  const keys = Object.keys(req);

  if (keys.length < 1) {
    throw new EmptyEchoRequestError();
  }
  else if (keys.length > 4) {
    throw new TooManyPropertiesError();
  }

  return keys.reduce((acc: string, curr: string) => `${acc}/${curr}/${req[curr]}`, 'http://echo.jsontest.com');
};

/**
 * Make request to JSON Test API
 */
export const apiRequest = async (req: EchoRequest): Promise<EchoRequest> => {
  const res: got.Response<EchoRequest> = await <got.GotPromise<EchoRequest>> got.get(getRequestUrl(req), API_REQUEST_OPTS);

  return res.body;

};
