export interface IAuthUser {
    address: string | null;
    block: boolean;
    contact: boolean;
    createdAt: string;
    dateOfBirth: string | null;
    description: string;
    email: string;
    hasSubmissions: boolean;
    id: number;
    isAuthorized: string;
    isBoatOwner: boolean;
    isVerified: boolean;
    languageSpoken: string;
    lastLogin: string | null;
    name: string;
    password: string;
    phoneNumber: string;
    preferences: string | null;
    profilePicture: string;
    role: string;
    surname: string;
    suspend: boolean;
    token: string;
    updatedAt: string;
}