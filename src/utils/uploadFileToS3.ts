import axios from 'axios';
import { debounce } from 'lodash';

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

    try {
        const uploadResponse = await axios.get('http://localhost:3001/users/getPresignedUrl');
        const { url: uploadUrl, key } = uploadResponse.data;

        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        const cloudFrontPresignedUrlResponse = await axios.get(
            'http://localhost:3001/users/getCloudFrontPresignedUrl',
            { params: { key } },
        );

        const { cloudFrontSignedUrl } = cloudFrontPresignedUrlResponse.data;
        showSnackbar(`You had successfully uploaded the logo ${cloudFrontSignedUrl}`, 'success');
        onDataChange('companyLogo')(cloudFrontSignedUrl);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        showSnackbar(errorMessage, 'error');
        setIsLoading(false);
    }
};

export default uploadFileToS3;
