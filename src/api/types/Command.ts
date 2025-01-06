import {Person} from "./Person.ts";
import {User} from "./User.ts";
import {DragonCave} from "./DragonCave.ts";

export type Command = {
    id: number;
    name: string;
    owner: User
    cave: DragonCave | null
    persons: Person[]
}