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
    userId?: string | null;
    getS3PreSignedUrlQuery: ReturnType<typeof userApis.useLazyGetS3PreSignedUrlQuery>[0];
    uploadToS3: ReturnType<typeof s3Apis.useUploadFileToS3Mutation>[0];
    getCloudFrontPreSignedUrlQuery: ReturnType<
        typeof userApis.useLazyGetCloudFrontPreSignedUrlQuery
    >[0];
    ApiErrorHelper: (
        error: unknown,
        showSnackbar: (
            message: string,
            variant: 'default' | 'error' | 'success' | 'warning' | 'info',
        ) => void,
    ) => void;
    handleInvalidToken: (error: unknown) => void;
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
    ApiErrorHelper,
    handleInvalidToken,
}: UploadUtilsProps): Promise<string | void> => {
    if (!userId) {
        const errorMessage = 'User ID is required for uploading.';
        showSnackbar(errorMessage, 'error');
        setIsLoading(false);
        return;
    }

    try {
        setIsLoading(true);
        const s3PreSignedUrlData = await getS3PreSignedUrlQuery().unwrap();

        const { url, key } = s3PreSignedUrlData as IGetS3PreSignedUrlResponse;

        const uploadParams = {
            url,
            file,
            headers: {
                'Content-Type': file.type,
            },
        };
        await uploadToS3(uploadParams).unwrap();
        const cloudFrontData = await getCloudFrontPreSignedUrlQuery(key).unwrap();

        showSnackbar(`You had successfully uploaded the logo`, 'success');
        onDataChange('logo')(
            (cloudFrontData as IGetCloudFrontPreSignedUrlResponse).cloudFrontSignedUrl,
        );
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        ApiErrorHelper(error, showSnackbar);
        handleInvalidToken(error);
    }
};

export default uploadFileToS3;
