/* eslint-disable prettier/prettier */
export class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: 'member' | 'librarian';
    confirmPassword: string;
}