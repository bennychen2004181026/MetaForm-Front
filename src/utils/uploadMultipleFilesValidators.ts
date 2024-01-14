const maxSize = 5;
const validateFileSize = (files: File[]) => {
    let validFileSize = true;
    for (let i = 0; i < files.length; i += 1) {
        if (files[i].size / 1024 / 1024 > maxSize) {
            validFileSize = false;
        }
    }
    return validFileSize;
};

const dragValidation = ({
    items,
    acceptFileTypes,
}: {
    items: DataTransferItemList;
    acceptFileTypes: string[];
}): boolean => {
    if (!items.length || items[0].kind !== 'file' || !acceptFileTypes.includes(items[0].type)) {
        return false;
    }
    return true;
};
const validateFileType = ({
    acceptFileTypes,
    files,
}: {
    acceptFileTypes: string[];
    files: File[];
}) => {
    let validFileTypes = true;
    for (let i = 0; i < files.length; i += 1) {
        if (!acceptFileTypes.includes(files[i].type)) {
            validFileTypes = false;
        }
    }
    return validFileTypes;
};

const validateFiles = ({
    acceptFileTypes,
    files,
    availableSpace,
}: {
    acceptFileTypes: string[];
    files: File[];
    availableSpace: number;
}) => {
    const errMsg = [];
    const validFileSize = validateFileSize(files);
    const validFileTypes = validateFileType({ acceptFileTypes, files });
    if (!validFileSize) {
        errMsg.push('Try files with smaller size, the size limit for each file is 5 Mb');
    }
    if (!validFileTypes) {
        errMsg.push(`Invalid file types`);
    }

    if (files.length > availableSpace) {
        errMsg.push(`Please select fewer items`);
    }
    return errMsg;
};
export default validateFiles;
export { dragValidation };
