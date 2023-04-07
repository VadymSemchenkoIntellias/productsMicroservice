export enum ErrorCode {
    BAD_REQUEST = 'BAD_REQUEST'
}

export default class ResponseError extends Error {

    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {
        super(message);
        this.code = code;
    }
}

export const ErrorResponseStatusMap = {
    [ErrorCode.BAD_REQUEST]: 400,
}