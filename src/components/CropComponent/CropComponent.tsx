import React, { useCallback, useEffect, useRef, useState } from 'react';

import CropIcon from '@mui/icons-material/Crop';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactCrop, { Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';
import styled from 'styled-components';

import 'react-image-crop/dist/ReactCrop.css';
import StartIconButton from '@/components/StartIconButton';
import centerAspectCrop from '@/utils/centerAspectCrop';

export interface CropComponentProps {
    src: string | null;
    onImageCropped: (blob: Blob) => void;
    imgRef: React.RefObject<HTMLImageElement>;
    previewCanvasRef: React.RefObject<HTMLCanvasElement>;
    onCrop: (crop: PixelCrop) => void;
}

const StyledCropImageBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;

    ${({ theme }) => theme.breakpoints.up('xs')} {
        width: 300px;
        height: 200px;
    }

    ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 400px;
        height: 300px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        width: 500px;
        height: 400px;
    }
`;

const StyledCropToolBar = styled(Box)`
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
`;

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
    const theme = useTheme();

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
        <StyledCropImageBox ref={boxRef} theme={theme}>
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
            <StyledCropToolBar>
                <StartIconButton
                    text="Confirm"
                    onClick={onCropComplete}
                    startIcon={<CropIcon />}
                    variant="contained"
                />
            </StyledCropToolBar>
        </StyledCropImageBox>
    );
};

export default CropComponent;
