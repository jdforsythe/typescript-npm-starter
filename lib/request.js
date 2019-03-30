"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
const error_1 = require("./error");
const API_REQUEST_OPTS = { json: true, timeout: 3000 };
/**
 * Given an EchoRequest, get the request URL for the echo.jsontest.com call
 */
exports.getRequestUrl = (req) => {
    if (!req) {
        throw new error_1.EmptyEchoRequestError();
    }
    const keys = Object.keys(req);
    if (keys.length < 1) {
        throw new error_1.EmptyEchoRequestError();
    }
    else if (keys.length > 4) {
        throw new error_1.TooManyPropertiesError();
    }
    return keys.reduce((acc, curr) => `${acc}/${curr}/${req[curr]}`, 'http://echo.jsontest.com');
};
/**
 * Make request to JSON Test API
 */
exports.apiRequest = (req) => __awaiter(this, void 0, void 0, function* () {
    const res = yield got.get(exports.getRequestUrl(req), API_REQUEST_OPTS);
    return res.body;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBMkI7QUFFM0IsbUNBR2lCO0FBRWpCLE1BQU0sZ0JBQWdCLEdBQXVCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFTM0U7O0dBRUc7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLEdBQWdCLEVBQVUsRUFBRTtJQUN4RCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsTUFBTSxJQUFJLDZCQUFxQixFQUFFLENBQUM7S0FDbkM7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkIsTUFBTSxJQUFJLDZCQUFxQixFQUFFLENBQUM7S0FDbkM7U0FDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSw4QkFBc0IsRUFBRSxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFDL0csQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxDQUFPLEdBQWdCLEVBQXdCLEVBQUU7SUFDekUsTUFBTSxHQUFHLEdBQThCLE1BQW9DLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXpILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUVsQixDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGdvdCBmcm9tICdnb3QnO1xuXG5pbXBvcnQge1xuICBFbXB0eUVjaG9SZXF1ZXN0RXJyb3IsXG4gIFRvb01hbnlQcm9wZXJ0aWVzRXJyb3IsXG59IGZyb20gJy4vZXJyb3InO1xuXG5jb25zdCBBUElfUkVRVUVTVF9PUFRTOiBnb3QuR290SlNPTk9wdGlvbnMgPSB7IGpzb246IHRydWUsIHRpbWVvdXQ6IDMwMDAgfTtcblxuLyoqXG4gKiBBIHZhbGlkIHJlcXVlc3QgaXMgYW4gb2JqZWN0IHdpdGggc3RyaW5nIG9yIG51bWJlciB2YWx1ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFY2hvUmVxdWVzdCB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBFY2hvUmVxdWVzdCwgZ2V0IHRoZSByZXF1ZXN0IFVSTCBmb3IgdGhlIGVjaG8uanNvbnRlc3QuY29tIGNhbGxcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlcXVlc3RVcmwgPSAocmVxOiBFY2hvUmVxdWVzdCk6IHN0cmluZyA9PiB7XG4gIGlmICghcmVxKSB7XG4gICAgdGhyb3cgbmV3IEVtcHR5RWNob1JlcXVlc3RFcnJvcigpO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcSk7XG5cbiAgaWYgKGtleXMubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IG5ldyBFbXB0eUVjaG9SZXF1ZXN0RXJyb3IoKTtcbiAgfVxuICBlbHNlIGlmIChrZXlzLmxlbmd0aCA+IDQpIHtcbiAgICB0aHJvdyBuZXcgVG9vTWFueVByb3BlcnRpZXNFcnJvcigpO1xuICB9XG5cbiAgcmV0dXJuIGtleXMucmVkdWNlKChhY2M6IHN0cmluZywgY3Vycjogc3RyaW5nKSA9PiBgJHthY2N9LyR7Y3Vycn0vJHtyZXFbY3Vycl19YCwgJ2h0dHA6Ly9lY2hvLmpzb250ZXN0LmNvbScpO1xufTtcblxuLyoqXG4gKiBNYWtlIHJlcXVlc3QgdG8gSlNPTiBUZXN0IEFQSVxuICovXG5leHBvcnQgY29uc3QgYXBpUmVxdWVzdCA9IGFzeW5jIChyZXE6IEVjaG9SZXF1ZXN0KTogUHJvbWlzZTxFY2hvUmVxdWVzdD4gPT4ge1xuICBjb25zdCByZXM6IGdvdC5SZXNwb25zZTxFY2hvUmVxdWVzdD4gPSBhd2FpdCA8Z290LkdvdFByb21pc2U8RWNob1JlcXVlc3Q+PiBnb3QuZ2V0KGdldFJlcXVlc3RVcmwocmVxKSwgQVBJX1JFUVVFU1RfT1BUUyk7XG5cbiAgcmV0dXJuIHJlcy5ib2R5O1xuXG59O1xuIl19