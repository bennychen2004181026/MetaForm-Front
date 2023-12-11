import { useCallback, useRef, useState } from 'react';

import { PixelCrop } from 'react-image-crop';

import uploadFileToS3 from '@/utils/uploadFileToS3';
import uploadFileValidators from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface UseUploadProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    userId: string | undefined;
}

const useUpload = ({ setIsLoading, setUploadProgress, onDataChange, userId }: UseUploadProps) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);

    const logoValidators = [
        uploadFileValidators.logoSizeValidator(128 * 1024),
        uploadFileValidators.logoTypeValidator([
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/bmp',
            'image/x-icon',
            'image/vnd.microsoft.icon',
        ]),
        uploadFileValidators.logoDimensionValidator(100, 100, 600, 600),
    ];

    const handleFileSelection = useCallback(
        async (file: File) => {
            const validationResult = await uploadFileValidators.validateFile(file, logoValidators);
            if (typeof validationResult === 'string') {
                showSnackbar(`Validation Error: ${validationResult}`, 'error');
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
            setCroppedImageBlob(null);
            setIsCropping(true);
        },
        [logoValidators, showSnackbar],
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
        }).then(() => {
            setCroppedPreviewUrl(null);
        });
    }, [croppedImageBlob, userId, setIsLoading, setUploadProgress, onDataChange, showSnackbar]);

    const handleDragActions = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(event.type === 'dragenter');
    }, []);

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            handleDragActions(event);
            const file = event.dataTransfer.files[0];
            if (file) {
                await handleFileSelection(file);
            }
        },
        [handleDragActions, handleFileSelection],
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
        handleDragActions,
        handleDrop,
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
    };
};

export default useUpload;
