interface IOption {
    id: string;
    value: string;
    icon?: React.ReactNode;
    otherOption?: boolean;
    image?: IFileToUpload;
    fileExtensions?: string[];
}
interface IQuestion {
    questionId: string;
    required: boolean;
    questionType: string;
    questionTitle: IQuestionTitle;
    options: IOption[];
    other: boolean;
    acceptFileTypes?: string[] | undefined;
    numOfFiles?: 1 | 3 | 5;
}
interface IQuestionTitle {
    content: string;
    image?: IFileToUpload;
}
interface IFileToUpload {
    name: string;
    url: string;
    originalName: string;
    fileType: ReactNode;
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
interface IFectchedForm {
    _id: string;
    title: string;
    description: string;
    createdBy: string;
    createTime?: string;
    responses?: string[];
    questions: string[];
}

export type { IOption, INewForm, IFectchedForm, IQuestionTitle, IForm, IFileToUpload, IQuestion };
