import IOption from '@/interfaces/IOption';

interface IQuestion {
    questionId: string;
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
export type { IQuestionTitle, IImage, IQuestion };
