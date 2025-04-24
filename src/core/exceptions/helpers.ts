export const NO_PARAMS = "Required body params or queries are missing!";
export const SERVER_ERROR = "Internal Server Error!";
export const NO_TOKEN = "Token is required!";
export const NO_ACCESS = "You're not able to access!";
export const NO_FILE = "File is required!";
export const NO_ID_FOUND = "Required body params id is not found in the database!";
export const DUPLICATE_KEY = "Required body key is already exist!";
export const NO_DATA = "No Data!";


export const STATUS_CODE = {
  /** 100: Continue - The server has received the request headers, and the client should proceed to send the request body */
  CONTINUE: 100,

  /** 101: Switching Protocols - The server is switching protocols as requested by the client */
  SWITCHING_PROTOCOLS: 101,

  /** 102: Processing - The server has received and is processing the request, but no response is available yet */
  PROCESSING: 102,

  /** 103: Early Hints - The server is sending preliminary headers to indicate that the client can start preloading some resources */
  EARLY_HINTS: 103,

  /** 200: OK - The request was successful and the response body contains the result */
  OK: 200,

  /** 201: Created - The request was successful and resulted in the creation of a resource */
  CREATED: 201,

  /** 202: Accepted - The request has been accepted for processing, but the processing has not been completed */
  ACCEPTED: 202,

  /** 203: Non-Authoritative Information - The server is returning information that may be different from the origin server */
  NON_AUTHORITATIVE_INFORMATION: 203,

  /** 204: No Content - The request was successful, but there is no content to return */
  NO_CONTENT: 204,

  /** 205: Reset Content - The request was successful, but the client should reset the document view */
  RESET_CONTENT: 205,

  /** 206: Partial Content - The server is returning a portion of the resource, usually in response to a range request */
  PARTIAL_CONTENT: 206,

  /** 207: Multi-Status - The server is returning multiple status codes for different parts of the request */
  MULTI_STATUS: 207,

  /** 208: Already Reported - The members of a DAV binding have already been enumerated in a previous reply */
  ALREADY_REPORTED: 208,

  /** 226: IM Used - The server has fulfilled a request for the resource and the response is a representation of the result of one or more instance-manipulations */
  IM_USED: 226,

  /** 300: Multiple Choices - The request has more than one possible response */
  MULTIPLE_CHOICES: 300,

  /** 301: Moved Permanently - The resource has been permanently moved to a new URL */
  MOVED_PERMANENTLY: 301,

  /** 302: Found - The resource has been temporarily moved to a different URL */
  FOUND: 302,

  /** 303: See Other - The response to the request can be found under a different URL using the GET method */
  SEE_OTHER: 303,

  /** 304: Not Modified - The resource has not been modified since the last request */
  NOT_MODIFIED: 304,

  /** 305: Use Proxy - The requested resource must be accessed through the specified proxy */
  USE_PROXY: 305,

  /** 307: Temporary Redirect - The resource is temporarily available at a different URL */
  TEMPORARY_REDIRECT: 307,

  /** 308: Permanent Redirect - The resource has been permanently redirected to a new URL */
  PERMANENT_REDIRECT: 308,

  /** 400: Bad Request - The request could not be understood or was missing required parameters */
  BAD_REQUEST: 400,

  /** 401: Unauthorized - The request requires user authentication */
  UNAUTHORIZED: 401,

  /** 402: Payment Required - Reserved for future use, though not commonly used */
  PAYMENT_REQUIRED: 402,

  /** 403: Forbidden - The server understood the request, but is refusing to authorize it */
  FORBIDDEN: 403,

  /** 404: Not Found - The requested resource could not be found */
  NOT_FOUND: 404,

  /** 405: Method Not Allowed - The request method is not allowed for the resource */
  METHOD_NOT_ALLOWED: 405,

  /** 406: Not Acceptable - The resource is not acceptable according to the accept headers sent in the request */
  NOT_ACCEPTABLE: 406,

  /** 407: Proxy Authentication Required - The request requires proxy authentication */
  PROXY_AUTHENTICATION_REQUIRED: 407,

  /** 408: Request Timeout - The client did not produce a request within the time that the server was prepared to wait */
  REQUEST_TIMEOUT: 408,

  /** 409: Conflict - The request could not be completed due to a conflict with the current state of the resource */
  CONFLICT: 409,

  /** 410: Gone - The resource is no longer available and will not be available again */
  GONE: 410,

  /** 411: Length Required - The request did not specify the length of its content */
  LENGTH_REQUIRED: 411,

  /** 412: Precondition Failed - The server does not meet one of the preconditions specified in the request */
  PRECONDITION_FAILED: 412,

  /** 413: Payload Too Large - The request entity is larger than the server is willing or able to process */
  PAYLOAD_TOO_LARGE: 413,

  /** 414: URI Too Long - The URI is too long for the server to process */
  URI_TOO_LONG: 414,

  /** 415: Unsupported Media Type - The media type of the request is not supported by the server */
  UNSUPPORTED_MEDIA_TYPE: 415,

  /** 416: Range Not Satisfiable - The client has requested a range that the server cannot fulfill */
  RANGE_NOT_SATISFIABLE: 416,

  /** 417: Expectation Failed - The server cannot meet the expectations specified in the Expect header */
  EXPECTATION_FAILED: 417,

  /** 418: I'm a Teapot - An April Fools' joke defined in an April Fools' RFC, the server is a teapot and cannot brew coffee */
  I_M_A_TEAPOT: 418,

  /** 421: Misdirected Request - The request was directed at a server that is not able to produce a response */
  MISDIRECTED_REQUEST: 421,

  /** 422: Unprocessable Entity - The server understands the request but cannot process the instructions */
  UNPROCESSABLE_ENTITY: 422,

  /** 423: Locked - The resource that is being accessed is locked */
  LOCKED: 423,

  /** 424: Failed Dependency - The request failed due to a failure of a previous request */
  FAILED_DEPENDENCY: 424,

  /** 425: Too Early - The server is unwilling to risk processing a request that might be replayed */
  TOO_EARLY: 425,

  /** 426: Upgrade Required - The client should upgrade to a different protocol, such as HTTP/2 */
  UPGRADE_REQUIRED: 426,

  /** 428: Precondition Required - The server requires the request to be conditional */
  PRECONDITION_REQUIRED: 428,

  /** 429: Too Many Requests - The user has sent too many requests in a given amount of time */
  TOO_MANY_REQUESTS: 429,

  /** 431: Request Header Fields Too Large - The server is refusing to process a request because the header fields are too large */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

  /** 451: Unavailable For Legal Reasons - The resource is unavailable for legal reasons */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  /** 498: Expired - The token has expired (typically used for authorization tokens) */
  EXPIRED: 498,

  /** 500: Internal Server Error - A generic error occurred on the server */
  INTERNAL_SERVER_ERROR: 500,

  /** 501: Not Implemented - The server does not support the functionality required to fulfill the request */
  NOT_IMPLEMENTED: 501,

  /** 502: Bad Gateway - The server received an invalid response from an inbound server */
  BAD_GATEWAY: 502,

  /** 503: Service Unavailable - The server is currently unable to handle the request due to temporary overload or maintenance */
  SERVICE_UNAVAILABLE: 503,

  /** 504: Gateway Timeout - The server did not receive a timely response from an upstream server */
  GATEWAY_TIMEOUT: 504,

  /** 505: HTTP Version Not Supported - The server does not support the HTTP protocol version used in the request */
  HTTP_VERSION_NOT_SUPPORTED: 505,

  /** 506: Variant Also Negotiates - The server has an internal configuration error regarding content negotiation */
  VARIANT_ALSE_NEGOTIATES: 506,

  /** 507: Insufficient Storage - The server is unable to store the representation needed to complete the request */
  INSUFFICIENT_STORAGE: 507,

  /** 508: Loop Detected - The server detected an infinite loop while processing a request */
  LOOP_DETECTED: 508,

  /** 509: Bandwidth Limit Exceeded - The server has exceeded its bandwidth limit */
  BANDWIDTH_LIMIT_EXCEEDED: 509,

  /** 510: Not Extended - The server requires further extensions to fulfill the request */
  NOT_EXTENDED: 510,

  /** 511: Network Authentication Required - The client needs to authenticate to access the network */
  NETWORK_AUTHENTIICATION_REQUIRE: 511,
};
