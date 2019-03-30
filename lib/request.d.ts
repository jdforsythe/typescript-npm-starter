/**
 * A valid request is an object with string or number values
 */
export interface EchoRequest {
    [key: string]: string | number;
}
/**
 * Given an EchoRequest, get the request URL for the echo.jsontest.com call
 */
export declare const getRequestUrl: (req: EchoRequest) => string;
/**
 * Make request to JSON Test API
 */
export declare const apiRequest: (req: EchoRequest) => Promise<EchoRequest>;
