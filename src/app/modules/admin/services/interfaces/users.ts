export interface Users {
    id: number;
    name: string;
    email: string;
    createdDate: Date;
    modifiedDate: Date | null;
    accountLocked: boolean;
    enabled: boolean;
    is_blocked_by_admin: boolean;
}

