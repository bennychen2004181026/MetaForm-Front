import { debounce } from 'lodash';

import AWS from '@/utils/awsConfig';

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
        setIsLoading(true);
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'metaform-company-logo',
            Key: `companyLogos/${userId}/${file.name}`,
            Body: file,
        };

        s3.upload(params)
            .on('httpUploadProgress', (progress: { loaded: number; total: number }) => {
                const calculatedProgress = Math.round((progress.loaded / progress.total) * 100);
                debouncedProgressUpdate(calculatedProgress);
            })
            .send((err: Error, data: { Location: string }) => {
                setIsLoading(false);
                if (err) {
                    showSnackbar(`Error uploading: ${err}`, 'error');
                    reject(err);
                } else {
                    onDataChange('companyLogo')(data.Location);
                    showSnackbar('You had successfully uploaded the logo', 'success');
                    resolve(data);
                }
            });
    });
};

export default uploadFileToS3;
