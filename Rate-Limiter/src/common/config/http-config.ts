const STATUS = {
    INFO: 432,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    TO_MANY_REQUEST: 429,
    REQUEST_TIMEOUT: 408,
    VALIDATION_ERROR: 432,
    SESSION_EXPIRED: 440,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503
}

const MESSAGES = {
    INFO: 'Toast Message',
    OK: 'Success',
    CREATED: 'Done',
    ACCEPTED: 'Request Accepted',
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized Access',
    NOT_FOUND: 'Request Not Found',
    TO_MANY_REQUEST: 'Too Many Request',
    REQUEST_TIMEOUT: 'Request Time Out',
    NOT_IMPLEMENTED: 'Feature Not Available',
    SERVICE_UNAVAILABLE: 'We are under maintainace, Stay Tuned',
    VALIDATION_ERROR: 'Request Validation Error',
    INTERNAL_SERVER_ERROR: 'Something went wrong, Please try again later.',
    SESSION_EXPIRED: 'Your session has expired. Please login to pick up where you left off.',
}

const ERROR_CLASS = {
    400 : 'BAD_REQUEST',
    401 : 'UNAUTHORIZED',
    404 : 'NOT_FOUND',
    429 : 'TO_MANY_REQUEST',
    408 : 'REQUEST_TIMEOUT',
    432 : 'VALIDATION_ERROR',
    440 : 'SESSION_EXPIRED',
    500 : 'INTERNAL_SERVER_ERROR',
    501 : 'NOT_IMPLEMENTED',
    503 : 'SERVICE_UNAVAILABLE'
}

const HEADERS = {
    AUTHORIZATION: 'authorization',
    CONTENT_TYPE: 'Content-Type',
    ACCEPT: 'Accept',
    JSON: 'application/json',
    X_ECRYPTED: 'encrypted-data',
    X_ACCESS_TOKEN: 'authorization'
};

export {
    STATUS,
    MESSAGES,
    HEADERS,
    ERROR_CLASS
}