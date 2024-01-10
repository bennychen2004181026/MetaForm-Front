import { ApiError } from '@/interfaces/ApiError';
import { IGetCloudFrontPreSignedUrlResponse, IGetS3PreSignedUrlResponse } from '@/interfaces/IUser';
import userApis from '@/services/Auth/user';
import s3Apis from '@/services/S3';

interface UploadUtilsProps {
    file: File;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    showSnackbar: (
        message: string,
        variant: 'default' | 'error' | 'success' | 'warning' | 'info',
    ) => void;
    userId?: string;
    getS3PreSignedUrlQuery: ReturnType<typeof userApis.useLazyGetS3PreSignedUrlQuery>[0];
    uploadToS3: ReturnType<typeof s3Apis.useUploadFileToS3Mutation>[0];
    getCloudFrontPreSignedUrlQuery: ReturnType<
        typeof userApis.useLazyGetCloudFrontPreSignedUrlQuery
    >[0];
    s3PreSignedUrlData?: IGetS3PreSignedUrlResponse;
    cloudFrontData?: IGetCloudFrontPreSignedUrlResponse;
}
const uploadFileToS3 = async ({
    file,
    setIsLoading,
    onDataChange,
    showSnackbar,
    userId,
    getS3PreSignedUrlQuery,
    uploadToS3,
    getCloudFrontPreSignedUrlQuery,
    s3PreSignedUrlData,
    cloudFrontData,
}: UploadUtilsProps): Promise<string | void> => {
    if (!userId) {
        const errorMessage = 'User ID is required for uploading.';
        showSnackbar(errorMessage, 'error');
        setIsLoading(false);
        return;
    }

    try {
        setIsLoading(true);
        await getS3PreSignedUrlQuery().unwrap();

        const { url, key } = s3PreSignedUrlData as IGetS3PreSignedUrlResponse;

        const uploadParams = {
            url,
            file,
            headers: {
                'Content-Type': file.type,
            },
        };
        await uploadToS3(uploadParams).unwrap();
        await getCloudFrontPreSignedUrlQuery(key).unwrap();

        showSnackbar(`You had successfully uploaded the logo`, 'success');
        onDataChange('companyLogo')(
            (cloudFrontData as IGetCloudFrontPreSignedUrlResponse).cloudFrontSignedUrl,
        );
        setIsLoading(false);
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage =
            apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

        showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        setIsLoading(false);
    }
};

export default uploadFileToS3;
