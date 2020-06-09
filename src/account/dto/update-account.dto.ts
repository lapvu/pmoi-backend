import { IsString, IsEmail, } from 'class-validator';


export class UpdateAccountDto {

    roles: [string];

    @IsEmail()
    email: string;

    @IsString()
    accountType: string;

    investorName: string;

    address: string;

    phoneNumber: number;

    fax: string;

    website: string;

    desc: string;
}