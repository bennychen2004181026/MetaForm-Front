export interface ICompany {
    _id?: string;
    companyName?: string;
    abn?: string;
    logo?: string;
    description?: string;
    industry?: string;
    isActive?: boolean;
    employees?: string[];
    address?: string;
}

export interface IGetEmployeesResponse {
    message: string;
    employeesArray: Record<string, string | boolean | string[]>[];
}
