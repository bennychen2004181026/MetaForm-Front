import { centerCrop, makeAspectCrop } from 'react-image-crop';

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
};

export default centerAspectCrop;
