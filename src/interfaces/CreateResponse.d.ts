interface IAnswer {
    questionId: Schema.Types.ObjectId;
    answerBody: string[] | IFile[];
}
interface IFile {
    originalName: string;
    remoteUrl: string;
    name: string;
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
interface IQuestionResponse {
    question: IFetchedQuestion;
    questionAnswered: boolean;
    questionAnswer: IAnswer;
}
interface IQuestionProps {
    questionResponse: IQuestionResponse;
    onAnswerChange: (answer: IAnswer) => void;
}
interface IFetchedQuestion {
    _id: string;
    required: boolean;
    questionType: string;
    questionTitle: IQuestionTitle;
    options: IOption[];
    other: boolean;
    acceptFileTypes?: string[] | undefined;
    numOfFiles?: 1 | 3 | 5;
}
interface IFetchedOption {
    _id: string;
    value: string;
    image?: IFile;
}
export {
    IAnswer,
    IQuestionProps,
    IFile,
    IFetchedOption,
    IQuestionResponse,
    IFetchedQuestion,
    IFectchedForm,
};
