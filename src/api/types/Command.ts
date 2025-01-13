import {Person} from "./Person.ts";
import {User} from "./User.ts";
import {DragonCave} from "./DragonCave.ts";

export type Command = {
    id: number;
    name: string;
    owner: User
    cave: DragonCave | null
    members: Person[]
}


export const voidCommand: Command = {
    name: "",
    owner: {
        name: "",
        login: "",
        role: "",
        id: 0
    },
    id: 0,
    cave: null,
    members: []
}