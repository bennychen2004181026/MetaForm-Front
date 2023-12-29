interface Validator {
    (file: File): Promise<string | null>;
}

const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/x-icon',
    'image/vnd.microsoft.icon',
];

const mimeToExtension = (mime: string): string => {
    const mimeMap: { [key: string]: string } = {
        'image/jpeg': 'JPEG/JFIF',
        'image/png': 'PNG',
        'image/webp': 'WebP',
        'image/gif': 'GIF',
        'image/svg+xml': 'SVG',
        'image/bmp': 'BMP',
        'image/tiff': 'TIFF',
        'image/x-icon': 'ICO',
        'image/vnd.microsoft.icon': 'ICO',
    };
    return mimeMap[mime] || mime;
};

export const logoSizeValidator = (maxSize: number): Validator => {
    return async (file) => {
        if (file.size > maxSize) {
            const maxSizeInMB = (maxSize / 1024).toFixed(2);
            return `File is too large. Maximum allowed size is ${maxSizeInMB} KB.`;
        }
        return null;
    };
};

export const logoTypeValidator = (Types: string[]): Validator => {
    return async (file) => {
        if (!Types.includes(file.type)) {
            const readableTypes = Types.map(mimeToExtension).join(', ');
            return `Invalid file type. Allowed types: ${readableTypes}.`;
        }
        return null;
    };
};

export const logoDimensionValidator = (
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number,
): Validator => {
    return async (file) => {
        const img = new Image();
        const objectURL = URL.createObjectURL(file);

        try {
            await new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = objectURL;
            });

            if (img.width < minWidth || img.height < minHeight) {
                return `Image dimensions must be at least ${minWidth}x${minHeight} pixels.`;
            }

            if (img.width > maxWidth || img.height > maxHeight) {
                return `Image dimensions must not exceed ${maxWidth}x${maxHeight} pixels.`;
            }

            return null;
        } catch (error) {
            return 'There was an error loading the image for dimension validation.';
        } finally {
            URL.revokeObjectURL(objectURL);
        }
    };
};

export const validateFile = async (file: File, validators: Validator[]): Promise<string | File> => {
    const errorMessage = await validators.reduce<Promise<string | null>>(
        async (accPromise, validate) => {
            const acc = await accPromise;
            if (acc !== null) {
                return acc;
            }
            const validationResult = await validate(file);
            return validationResult !== null ? validationResult : null;
        },
        Promise.resolve(null),
    );

    return errorMessage || file;
};

export const logoValidators = [
    logoSizeValidator(128 * 1024),
    logoTypeValidator(validTypes),
    logoDimensionValidator(100, 100, 600, 600),
];
export const questionImageValidators = [logoTypeValidator(validTypes)];

const dragValidation = (items: DataTransferItemList): boolean => {
    if (!items.length || items[0].kind !== 'file' || !validTypes.includes(items[0].type)) {
        return false;
    }

    return true;
};
export default {
    logoValidators,
    validateFile,
    logoSizeValidator,
    logoTypeValidator,
    logoDimensionValidator,
    dragValidation,
    questionImageValidators,
};
