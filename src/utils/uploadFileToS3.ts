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
const uploadFileToS3 = ({
    file,
    setIsLoading,
    setUploadProgress,
    onDataChange,
    showSnackbar,
    userId,
}: UploadUtilsProps): Promise<unknown> => {
    const debouncedProgressUpdate = debounce((progress) => {
        setUploadProgress(progress);
    }, 100);

    return new Promise((resolve, reject) => {
        if (!userId) {
            const errorMessage = 'User ID is required for uploading.';
            showSnackbar(errorMessage, 'error');
            setIsLoading(false);
            reject(new Error(errorMessage));
            return;
        }
        showSnackbar('Send request', 'info');
    });
};

export default uploadFileToS3;
