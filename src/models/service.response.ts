interface BaseResponse {
    success: boolean;
    message: string;
    time: string;
}

export interface ServiceResponse extends BaseResponse {
    data: {}
}