export interface IResponse<T> {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}