import {User} from "./User.ts";
import {DragonCave} from "./DragonCave.ts";

export type CommandToRequest = {
    id: number;
    name: string;
    owner: User
    cave: DragonCave | null
    members: number[]
}