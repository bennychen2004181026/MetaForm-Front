import { IQuestion } from './CreateForm.interface';

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
