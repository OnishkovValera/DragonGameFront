import {User} from "../api/types/User.ts"
import {create} from 'zustand'
import {Dragon} from "../api/types/Dragon.ts";
import {Person, voidPerson} from "../api/types/Person.ts";
import {Command} from "../api/types/Command.ts";

interface UserStore {
    authorized: boolean
    user: User | null;
    setAuthorized: (authorized: boolean) => void
    setUser: (user: User | null) => void
}

interface ModalData {
    isActive: boolean
    setIsActive: (isModalActive: boolean) => void
}

interface DragonModalStore{
    currentHandlingDragon:Dragon | null,
    setCurrentHandlingDragon:(dragon:Dragon| null) => void
    isCreating: boolean,
    setIsCreating: (isCreating: boolean) => void

}

interface PersonModalStore{
    currentHandlingPerson:Person,
    setCurrentHandlingPerson:(person:Person) => void,
    isCreating: boolean,
    setIsCreating: (isCreating: boolean) => void

}

interface CommandModalStore{
    currentHandlingCommand:Command | null,
    setCurrentHandlingCommand:(dragon:Command| null) => void,
    isCreating: boolean,
    setIsCreating: (isCreating: boolean) => void
}



export const useUserStore = create<UserStore>((set) => ({
        authorized: false,
        user: null,
        setAuthorized: (authorized:boolean) => set({authorized}),
        setUser: (user: User | null) => set({user})
    })
)

export const useModalActive = create<ModalData>((set) => ({
        isActive: false,
        setIsActive: (isActive:boolean) => set({isActive})
    })
)

export const useDragonModalStore = create<DragonModalStore>((set) => ({
    currentHandlingDragon:null,
    setCurrentHandlingDragon: (currentHandlingDragon:Dragon | null) => set({currentHandlingDragon}),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({isCreating: isCreating}),

}))


export const usePersonModalStore = create<PersonModalStore>((set) => ({
    currentHandlingPerson: voidPerson,
    setCurrentHandlingPerson: (currentHandlingPerson:Person) => set({currentHandlingPerson}),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({isCreating: isCreating}),

}))


export const useCommandModalStore = create<CommandModalStore>((set) => ({
    currentHandlingCommand:null,
    setCurrentHandlingCommand: (currentHandlingCommand:Command | null) => set({currentHandlingCommand}),
    isCreating: true,
    setIsCreating: (isCreating: boolean) => set({isCreating: isCreating}),
}))


