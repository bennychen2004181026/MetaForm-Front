import { debounce } from 'lodash';

import { ApiError } from '@/interfaces/ApiError';
import { IGetCloudFrontPreSignedUrlResponse, IGetS3PreSignedUrlResponse } from '@/interfaces/IUser';
import userApis from '@/services/Auth/user';
import s3Apis from '@/services/S3';

interface UploadUtilsProps {
    file: File;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    showSnackbar: (
        message: string,
        variant: 'default' | 'error' | 'success' | 'warning' | 'info',
    ) => void;
    userId: string | undefined;
}
const uploadFileToS3 = async ({
    file,
    setIsLoading,
    setUploadProgress,
    onDataChange,
    showSnackbar,
    userId,
}: UploadUtilsProps): Promise<string | void> => {
    const debouncedProgressUpdate = debounce((progress) => {
        setUploadProgress(progress);
    }, 100);

    if (!userId) {
        const errorMessage = 'User ID is required for uploading.';
        showSnackbar(errorMessage, 'error');
        setIsLoading(false);
        return;
    }

    const { useLazyGetS3PreSignedUrlQuery, useLazyGetCloudFrontPreSignedUrlQuery } = userApis;
    const [getS3PreSignedUrlQuery, { data }] = useLazyGetS3PreSignedUrlQuery();

    const { useUploadFileToS3Mutation } = s3Apis;
    const [uploadToS3] = useUploadFileToS3Mutation();

    try {
        await getS3PreSignedUrlQuery().unwrap();

        const { uploadUrl, key } = data as IGetS3PreSignedUrlResponse;

        const uploadParams = {
            url: uploadUrl,
            file,
            headers: {
                'Content-Type': file.type,
            },
        };
        await uploadToS3(uploadParams).unwrap();

        const [getCloudFrontPreSignedUrlQuery, { data: response }] =
            useLazyGetCloudFrontPreSignedUrlQuery();

        await getCloudFrontPreSignedUrlQuery(key).unwrap();

        showSnackbar(`You had successfully uploaded the logo`, 'success');
        onDataChange('companyLogo')((response as IGetCloudFrontPreSignedUrlResponse).data);
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage =
            apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

        showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        setIsLoading(false);
    }
};

export default uploadFileToS3;
