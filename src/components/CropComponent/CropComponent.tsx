import React, { useCallback, useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import ReactCrop, { Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import centerAspectCrop from '@/utils/centerAspectCrop';

export interface CropComponentProps {
    src: string;
    onImageCropped: (blob: Blob) => void;
    imgRef: React.RefObject<HTMLImageElement>;
    previewCanvasRef: React.RefObject<HTMLCanvasElement>;
    onCrop: (crop: PixelCrop) => void;
}

const CropComponent: React.FC<CropComponentProps> = ({
    src,
    onImageCropped,
    imgRef,
    previewCanvasRef,
    onCrop,
}) => {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const onImageLoad = useCallback(() => {
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            const newCrop = centerAspectCrop(width, height, 1);
            setCrop(newCrop);
            setCompletedCrop(convertToPixelCrop(newCrop, width, height));
        }
    }, []);

    useEffect(() => {
        if (completedCrop && previewCanvasRef.current && imgRef.current) {
            onCrop(completedCrop);
        }
    }, [completedCrop, onCrop, previewCanvasRef, imgRef]);

    const onCropComplete = useCallback(() => {
        if (previewCanvasRef.current) {
            previewCanvasRef.current.toBlob((blob) => {
                if (blob) {
                    onImageCropped(blob);
                }
            }, 'image/png');
        }
    }, [previewCanvasRef, onImageCropped]);

    return (
        <Box>
            {src && (
                <ReactCrop
                    crop={crop}
                    ruleOfThirds
                    onChange={(newCrop) => setCrop(newCrop)}
                    aspect={1}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={src}
                        style={{ maxWidth: '100%' }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}

            <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
            <Button variant="contained" onClick={onCropComplete}>
                Confirm Crop
            </Button>
        </Box>
    );
};

export default CropComponent;
