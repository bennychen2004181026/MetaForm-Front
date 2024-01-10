import { IQuestion } from './CreateForm';

export default interface IForm {
    formId: string;
    title: string;
    description: string;
    expireTime: string;
    author: string;
    createTime: string;
    numberOfResponses: number;
    questions: IQuestion[];
}
