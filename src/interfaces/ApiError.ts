export interface ApiError {
    data?: {
        errors?: Array<{
            message?: string;
            name?: string;
            statusCode?: number;
            field?: string;
        }>;
    };
    status?: number;
}
