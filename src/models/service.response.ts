interface BaseResponse {
    success: boolean;
    message: string;
    time: string;
}

export interface ServiceResponse<T = any> extends BaseResponse {
    data: {value: T}
}