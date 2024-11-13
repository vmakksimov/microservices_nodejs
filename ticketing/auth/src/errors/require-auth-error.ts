import { CustomError } from "./custom-error";

export class RequireAuthError extends CustomError {
    statusCode = 401;
    reason = 'User is not signed in';
    constructor() {
        super('User is not signed in')

        Object.setPrototypeOf(this, RequireAuthError.prototype);
    }
    serializeErrors() {
        return [{message: this.reason}]
    }
}