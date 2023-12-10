import React, { useCallback, useEffect, useRef, useState } from 'react';

import ReactCrop, { Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import centerAspectCrop from '@/utils/centerAspectCrop';

interface CropComponentProps {
    src: string;
}

const CropComponent: React.FC<CropComponentProps> = ({ src }) => {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
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

    const canvasPreview = (
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        pixelCrop: PixelCrop,
    ) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = pixelCrop.width * scaleX;
        canvas.height = pixelCrop.height * scaleY;

        ctx.drawImage(
            image,
            pixelCrop.x * scaleX,
            pixelCrop.y * scaleY,
            pixelCrop.width * scaleX,
            pixelCrop.height * scaleY,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );
    };

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }, [completedCrop]);

    return (
        <div>
            {src && (
                <ReactCrop
                    crop={crop}
                    ruleOfThirds
                    onComplete={(c) => setCompletedCrop(c)}
                    onChange={(newCrop) => setCrop(newCrop)}
                    aspect={1}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={src}
                        style={{
                            maxWidth: '100%',
                        }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}

            <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CropComponent;
