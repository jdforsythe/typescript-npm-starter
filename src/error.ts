/**
 * Error indicating that the EchoRequest is missing or empty
 */
export class EmptyEchoRequestError extends Error {
  constructor() {
    super('EchoRequest is empty or not provided');
  }
}

/**
 * Error indicating that too many proerties were defined on the EchoRequest
 */
export class TooManyPropertiesError extends Error {
  constructor() {
    super('Too many properties');
  }
}
