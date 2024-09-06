
export type Role = 'operator'|'admin'| 'user';
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    createdAt: string; // You can use Date if you plan to handle date objects
    updatedAt: string; // You can use Date if you plan to handle date objects
}