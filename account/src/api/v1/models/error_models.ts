
interface IError {
    code: number;
    message: string;
    details?: object;
}

export interface ValidationDetail {
    property: string;
    reason: string;
}

export class BaseError implements IError {
    code: number;
    message: string;
    details?: object;

    constructor(message: string,code:number,details?: object) {
        this.code=code;
        this.message=message;
        this.details=details;
    }
}

export class ValidationError extends BaseError {
    details?: ValidationDetail[];
    constructor(message: string, details?: ValidationDetail[]) {
        super(message,400,details);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string, details?: object) {
        super(message,404,details);
    }
}

