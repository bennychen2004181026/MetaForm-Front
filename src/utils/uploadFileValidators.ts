interface Validator {
    (file: File): Promise<string | null>;
}

export const logoSizeValidator = (maxSize: number): Validator => {
    return async (file) => {
        return file.size > maxSize ? 'File is too large. Please select a smaller file.' : null;
    };
};

export const logoTypeValidator = (validTypes: string[]): Validator => {
    return async (file) => {
        return validTypes.includes(file.type) ? null : 'Invalid file type.';
    };
};

export const logoDimensionValidator = (minWidth: number, minHeight: number): Validator => {
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

export default {
    logoSizeValidator,
    logoTypeValidator,
    logoDimensionValidator,
    validateFile,
};
