import { IsString, IsEmail, } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    roles: [string];

    @IsEmail()
    email: string;

    @IsString()
    displayName: string;

    @IsString()
    userType: string;

    address: string;

    phoneNumber?: number;

    fax: string;

    website: string;

    desc: string;
}