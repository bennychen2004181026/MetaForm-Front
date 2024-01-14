interface IAnswer {
    questionId: Schema.Types.ObjectId;
    answerBody: string[];
}
interface IResponse {
    formId: string;
    answers: IAnswer[];
}
export { IAnswer, IResponse };
