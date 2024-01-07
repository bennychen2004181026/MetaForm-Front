import Membership from '@/constants/Membership';
import Role from '@/constants/roles';

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

export interface IEmployeeInfo {
    username: string;
    firstName: string;
    lastName: string | null;
    email: string;
    createdForms: string[] | [];
    role: Role;
    company: string;
    isAccountComplete: boolean;
    invitedBy: string | null;
    isActive: boolean;
    membershipType: Membership;
    createdAt: string;
    updatedAt: string;
}
export interface IGetEmployeesResponse {
    message: string;
    employeesArray: IEmployeeInfo[] | [];
}

export interface IInviteEmployeesResponse {
    message: string;
    failedEmailAddresses?: string[];
}

export interface IInviteEmployeesRequest {
    companyId: string;
    emails: string[];
}
