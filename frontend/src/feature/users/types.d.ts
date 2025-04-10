
export type Role = 'operator'|'admin'| 'user';
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    role: Role;
    createdAt: string; // You can use Date if you plan to handle date objects
    updatedAt: string; // You can use Date if you plan to handle date objects
}