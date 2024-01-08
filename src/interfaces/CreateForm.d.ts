import IOption from '@/interfaces/IOption';

enum FileTypes {
    IMAGE = 'Image',
    PDF = 'PDF',
}

interface IQuestion {
    questionId: string;
    required: boolean;
    questionType: string;
    questionTitle: IQuestionTitle;
    options: IOption[];
    other: boolean;
    acceptFileTypes?: FileTypes;
    numOfFiles?: 1 | 2 | 3;
}
interface IQuestionTitle {
    content: string;
    image?: IImage;
}
interface IImage {
    name: string;
    url: string;
}
interface IForm {
    formId: string;
    title: string;
    description: string;
    createdBy: string;
    createTime?: string;
    responses?: string[];
    questions: IQuestion[];
}
interface INewForm {
    title: string;
    description: string;
    createdBy: string;
    questions: string[];
}

interface IOption {
    id: string | undefined;
    value: string;
    icon?: React.ReactNode;
    otherOption?: boolean;
    image?: IImage;
}
export type { IOption, INewForm, IQuestionTitle, IForm, IImage, IQuestion };
