
export class Role {
    roleId: number = 2;
    roleDesc?: String;
}

export interface Customer {
    email?: string;
    role?: Role;
    picture?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    aboutMe?: string;
    rating?: number;
    numRatings?: number;
    banned?: Boolean;
    password?: string;
    numViews?: number;
}
