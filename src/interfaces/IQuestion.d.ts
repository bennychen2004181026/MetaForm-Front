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
    questions: IQuestion[];
    numberOfQuestions: number;
}
export type { IQuestionTitle, IForm, IImage, IQuestion };
