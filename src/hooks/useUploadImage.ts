import { useCallback, useRef, useState } from 'react';

import { PixelCrop } from 'react-image-crop';

import userApis from '@/services/Auth/user';
import s3Apis from '@/services/S3';
import uploadFileToS3 from '@/utils/uploadFileToS3';
import uploadFileValidators from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface UseUploadImageProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    userId: string | undefined;
}
const useUploadImage = ({
    setIsLoading,
    setUploadProgress,
    onDataChange,
    userId,
}: UseUploadImageProps) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
    const [isFileValid, setIsFileValid] = useState(true);

    const [getS3PreSignedUrlQuery, { data: s3PreSignedUrlData }] =
        userApis.useLazyGetS3PreSignedUrlQuery();
    const [uploadToS3] = s3Apis.useUploadFileToS3Mutation();
    const [getCloudFrontPreSignedUrlQuery, { data: cloudFrontData }] =
        userApis.useLazyGetCloudFrontPreSignedUrlQuery();

    const handleFileSelection = useCallback(
        async (file: File) => {
            const validationResult = await uploadFileValidators.validateFile(
                file,
                uploadFileValidators.logoValidators,
            );
            if (typeof validationResult === 'string') {
                setIsFileValid(false);
                showSnackbar(`Validation Error: ${validationResult}`, 'error');
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
            setIsFileValid(true);
            setCroppedImageBlob(null);
            setIsCropping(true);
        },
        [uploadFileValidators.logoValidators, showSnackbar],
    );

    const handleCropConfirmation = useCallback((croppedBlob: Blob) => {
        setCroppedImageBlob(croppedBlob);
        setIsCropping(false);
    }, []);

    const handleCroppedImage = useCallback(async () => {
        if (!croppedImageBlob) {
            showSnackbar('No cropped image to upload', 'error');
            return;
        }
        const timestamp = new Date().getTime();
        const fileName = `companyLogo-${timestamp}.jpeg`;
        uploadFileToS3({
            file: new File([croppedImageBlob], fileName, { type: 'image/jpeg' }),
            setIsLoading,
            setUploadProgress,
            onDataChange,
            showSnackbar,
            userId,
            getS3PreSignedUrlQuery,
            uploadToS3,
            getCloudFrontPreSignedUrlQuery,
            s3PreSignedUrlData,
            cloudFrontData,
        });
    }, [
        croppedImageBlob,
        userId,
        setIsLoading,
        setUploadProgress,
        onDataChange,
        showSnackbar,
        getS3PreSignedUrlQuery,
        uploadToS3,
        getCloudFrontPreSignedUrlQuery,
        s3PreSignedUrlData,
        cloudFrontData,
    ]);

    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        setIsFileValid(true);
    }, []);

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files[0];
            if (file) {
                await handleFileSelection(file);
            }
        },
        [handleDragEnter, handleDragOver, handleDragLeave, handleFileSelection],
    );

    const handleUploadButton = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files ? event.target.files[0] : null;
            if (file) {
                await handleFileSelection(file);
            }
        },
        [handleFileSelection],
    );

    const canvasPreview = useCallback((crop: PixelCrop) => {
        if (!crop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            showSnackbar('No 2d context', 'error');
            return;
        }

        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const diameter = Math.min(crop.width * scaleX, crop.height * scaleY);
        canvas.width = diameter;
        canvas.height = diameter;

        ctx.beginPath();
        ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
        ctx.clip();

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            diameter,
            diameter,
        );

        const croppedUrl = previewCanvasRef.current.toDataURL('image/webp');
        setCroppedPreviewUrl(croppedUrl);
    }, []);

    return {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        handleDragLeave,
        handleUploadButton,
        selectedImage,
        setSelectedImage,
        croppedImageBlob,
        setCroppedImageBlob,
        handleCropConfirmation,
        handleCroppedImage,
        isCropping,
        previewCanvasRef,
        imgRef,
        canvasPreview,
        croppedPreviewUrl,
        isFileValid,
    };
};

export default useUploadImage;
