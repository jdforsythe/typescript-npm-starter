"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error indicating that the EchoRequest is missing or empty
 */
class EmptyEchoRequestError extends Error {
    constructor() {
        super('EchoRequest is empty or not provided');
    }
}
exports.EmptyEchoRequestError = EmptyEchoRequestError;
/**
 * Error indicating that too many proerties were defined on the EchoRequest
 */
class TooManyPropertiesError extends Error {
    constructor() {
        super('Too many properties');
    }
}
exports.TooManyPropertiesError = TooManyPropertiesError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQWEscUJBQXNCLFNBQVEsS0FBSztJQUM5QztRQUNFLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRjtBQUpELHNEQUlDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLEtBQUs7SUFDL0M7UUFDRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFKRCx3REFJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IHRoZSBFY2hvUmVxdWVzdCBpcyBtaXNzaW5nIG9yIGVtcHR5XG4gKi9cbmV4cG9ydCBjbGFzcyBFbXB0eUVjaG9SZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdFY2hvUmVxdWVzdCBpcyBlbXB0eSBvciBub3QgcHJvdmlkZWQnKTtcbiAgfVxufVxuXG4vKipcbiAqIEVycm9yIGluZGljYXRpbmcgdGhhdCB0b28gbWFueSBwcm9lcnRpZXMgd2VyZSBkZWZpbmVkIG9uIHRoZSBFY2hvUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgVG9vTWFueVByb3BlcnRpZXNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1RvbyBtYW55IHByb3BlcnRpZXMnKTtcbiAgfVxufVxuIl19