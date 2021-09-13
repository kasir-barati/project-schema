type metaType = Record<string, unknown> & {
    returnedCount: number;
    totalCount: number;
    page: number;
};
export class Response<T> {
    successful: boolean;
    message?: string;
    data: T;
    meta: metaType;

    constructor(
        success: boolean,
        data: T,
        meta?: metaType,
        message?: string | string[],
    ) {
        this.successful = success;
        this.data = data;
        this.meta = meta;
        if (message) {
            if (Array.isArray(message)) {
                message = message.join(', ');
                this.message = message;
            } else if (typeof message == 'string')
                this.message = message;
        }
    }
}
