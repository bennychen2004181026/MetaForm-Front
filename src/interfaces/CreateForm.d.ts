import IOption from '@/interfaces/IOption';

interface IQuestion {
    questionId: string;
    required: boolean;
    questionType: string;
    title: IQuestionTitle;
    options: IOption[];
    other: boolean;
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
    expire: string;
    createdBy: string;
    createTime?: string;
    validFrom: string;
    numberOfResponses: number;
    questions: IQuestion[];
}
interface INewForm {
    title: string;
    description: string;
    expire: string;
    createdBy: string;
    validFrom: string;
    questions: string[];
}
interface IOption {
    id: string;
    value: string;
    icon?: React.ReactNode;
    otherOption?: boolean;
    image?: IImage;
}
export type { IOption, INewForm, IQuestionTitle, IForm, IImage, IQuestion };
