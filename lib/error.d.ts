/**
 * Error indicating that the EchoRequest is missing or empty
 */
export declare class EmptyEchoRequestError extends Error {
    constructor();
}
/**
 * Error indicating that too many proerties were defined on the EchoRequest
 */
export declare class TooManyPropertiesError extends Error {
    constructor();
}
