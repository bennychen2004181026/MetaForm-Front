import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import ReactCrop, { Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import centerAspectCrop from '@/utils/centerAspectCrop';

export interface CropComponentProps {
    src: string | null;
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
    const boxRef = useRef<HTMLDivElement>(null);
    const [maxDimensions, setMaxDimensions] = useState({ maxWidth: 0, maxHeight: 0 });

    const onImageLoad = useCallback(() => {
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            const initialCrop = centerAspectCrop(width, height, 1);
            setCrop(initialCrop);
            setCompletedCrop(convertToPixelCrop(initialCrop, width, height));
        }
    }, []);

    useEffect(() => {
        if (completedCrop && previewCanvasRef.current && imgRef.current) {
            onCrop(completedCrop);
        }
    }, [completedCrop, onCrop, previewCanvasRef, imgRef]);

    useEffect(() => {
        if (boxRef.current) {
            const width = boxRef.current.offsetWidth;
            const height = boxRef.current.offsetHeight;
            setMaxDimensions({ maxWidth: width - 10, maxHeight: height - 50 });
        }
    }, []);

    const onCropComplete = useCallback(() => {
        if (previewCanvasRef.current) {
            previewCanvasRef.current.toBlob((blob) => {
                if (blob) {
                    onImageCropped(blob);
                }
            }, 'image/webp');
        }
    }, [previewCanvasRef, onImageCropped]);

    return (
        <Box
            ref={boxRef}
            sx={{
                width: { xs: '300px', sm: '400px', md: '500px' },
                height: { xs: '200px', sm: '300px', md: '400px' },
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: 'nowrap',
            }}
        >
            {src && (
                <ReactCrop
                    crop={crop}
                    aspect={1}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={src}
                        style={{
                            maxWidth: maxDimensions.maxWidth,
                            maxHeight: maxDimensions.maxHeight,
                        }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}

            <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                }}
            >
                <Button variant="contained" onClick={onCropComplete}>
                    Confirm Crop
                </Button>
            </Box>
        </Box>
    );
};

export default CropComponent;
