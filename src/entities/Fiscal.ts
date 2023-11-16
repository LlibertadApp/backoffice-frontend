export interface Fiscal {
    fullName: string;
    magicLink: string;
    id: string;
    status: 'registered' | 'pending';
    email: string;
    phone: string;
}
