import React from 'react';

import { IImage } from './CreateForm';

interface IOption {
    id: string;
    value: string;
    icon?: React.ReactNode;
    otherOption?: boolean;
    image?: IImage;
}
export default IOption;
