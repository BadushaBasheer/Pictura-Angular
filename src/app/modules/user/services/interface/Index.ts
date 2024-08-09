export interface SideBarItems{
    label: string;
    route?: string;
    icon?: string;
    isActive?: boolean;
}

export interface ApiResponse {
    message: string;
    success: boolean;
}
