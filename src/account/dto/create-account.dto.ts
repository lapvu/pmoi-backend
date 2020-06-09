import { IsString, IsEmail, } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    accountType: string;

    address: string;

    phoneNumber?: number;

    fax: string;

    website: string;

    desc: string;

    investorName: string;

    ministryName: string;

    roles: [string];
}