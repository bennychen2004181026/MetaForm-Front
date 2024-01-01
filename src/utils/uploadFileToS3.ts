import axios from 'axios';
import { debounce } from 'lodash';

import { ApiError } from '@/interfaces/ApiError';
import { IGetS3PreSignedUrlResponse } from '@/interfaces/IUser';
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

    const { useGetS3PreSignedUrlQuery } = userApis;
    const { data, error } = useGetS3PreSignedUrlQuery();
    const { uploadUrl, key } = data as IGetS3PreSignedUrlResponse;

    if (error) {
        const apiError = error as ApiError;
        const errorMessage =
            apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

        showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        return;
    }
    const { useUploadFileToS3Mutation } = s3Apis;
    const [uploadToS3] = useUploadFileToS3Mutation();
    const uploadParams = {
        url: uploadUrl,
        file,
        headers: {
            'Content-Type': file.type,
        },
    };

    try {
        await uploadToS3(uploadParams).unwrap();

        const cloudFrontPresignedUrlResponse = await axios.get(
            'http://localhost:3001/users/getCloudFrontPresignedUrl',
            { params: { key } },
        );

        const { cloudFrontSignedUrl } = cloudFrontPresignedUrlResponse.data;
        showSnackbar(`You had successfully uploaded the logo ${cloudFrontSignedUrl}`, 'success');
        onDataChange('companyLogo')(cloudFrontSignedUrl);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        showSnackbar(errorMessage, 'error');
        setIsLoading(false);
    }
};

export default uploadFileToS3;
