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
}
const uploadFileToS3 = ({
    file,
    setIsLoading,
    setUploadProgress,
    onDataChange,
    showSnackbar,
}: UploadUtilsProps): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        setIsLoading(true);
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'metaform-company-logo',
            Key: `companyLogos/${file.name}`,
            Body: file,
        };

        s3.upload(params)
            .on('httpUploadProgress', (progress: { loaded: number; total: number }) => {
                setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
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
