import {User} from "./User.ts";

export type ImportData = {
    id: number
    date: string | null
    isSuccess: boolean
    user: User
    objectUrl: string
}