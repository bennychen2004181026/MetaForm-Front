const isValidFileType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
    return validTypes.includes(file.type);
};

const isValidFileSize = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
};

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export default {
    isValidFileType,
    isValidFileSize,
    getImageDimensions,
};
