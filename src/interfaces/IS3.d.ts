export interface S3UploadParams {
    url: string;
    file: File;
    headers?: Record<string, string>;
}
