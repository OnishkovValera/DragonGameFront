import {Location} from "./Location.ts";

export type Person = {
    id: number;
    name: string;
    eyeColor: string;
    hairColor: string;
    location: Location;
    weight: number;
    nationality: string;
}


export const voidPerson:Person = {
    id: 0,
    name: "",
    eyeColor: "BLACK",
    hairColor: "BLACK",
    location: {
        x: 0,
        y: 0,
        z:0
    },
    weight: 0,
    nationality: ""
}