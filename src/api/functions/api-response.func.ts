import { ApiResponse, ResponseCodes } from "@shared/common"

export function APIResponse<DataType>(data?: DataType, message?: string): ApiResponse<DataType> {
    return {
        status: 'success',
        data,
        message
    } as ApiResponse<DataType>
}

export function APIFailResponse(message: string, code?: ResponseCodes): ApiResponse{
    return {
        code,
        status: 'failed',
        errMessage: message
    } as ApiResponse
}