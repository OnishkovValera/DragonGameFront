import {User} from "./User.ts";

export type AdminRequest  = {
    id: number;
    user: User;
    status: "PENDING" | "REJECTED" | "APPROVED";
    requestDate: string;
    adminProcessedId:User;
    processedDate:string;
    comment: string | null;
}
