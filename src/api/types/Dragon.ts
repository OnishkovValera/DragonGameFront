import {Coordinates} from "./Coordinates.ts";
import {DragonCave} from "./DragonCave.ts";
import {Person} from "./Person.ts";
import {DragonHead} from "./DragonHead.ts";

export type Dragon = {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDateTime: string | null;
    dragonCave:DragonCave | null;
    speaking: boolean | null;
    killer: Person | null;
    age: number;
    description: string | null;
    dragonCharacter: string;
    dragonHead: DragonHead;
    owner: Person | null;
}

export const voidDragon: Dragon = {
    id: 0,
    name: "",
    dragonCharacter: "CUNNING",
    speaking: false,
    dragonHead: {
        id: 0,
        toothCount: 0
    },
    age: 0,
    dragonCave: null,
    creationDateTime: null,
    coordinates: {
        y: 0,
        x: 0
    },
    description: "",
    killer: null
}