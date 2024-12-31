import {Coordinates} from "./Coordinates.ts";
import {DragonCave} from "./DragonCave.ts";
import {Person} from "./Person.ts";
import {DragonHead} from "./DragonHead.ts";

export type Dragon = {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDateTime: Date;
    dragonCave:DragonCave | null;
    killer: Person | null;
    age: number;
    description: string | null;
    dragonCharacter: string;
    dragonHead: DragonHead;
}