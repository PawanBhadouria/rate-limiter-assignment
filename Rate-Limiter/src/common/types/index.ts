
/** Success response type */
type JsonResponseType = {
    status: number,
    message: string,
    data: object
}

/** Error response type */
type ErrorResponseType = {
    status: number,
    message: string,
    error: object
}


/** Object / Record Type */
type TObject = Record<string, any>;


/**
 * Exporting application-wide used common types
 */
export {
    JsonResponseType,
    ErrorResponseType,
    TObject,
}