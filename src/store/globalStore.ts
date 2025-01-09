import {User} from "../api/types/User.ts"
import {create} from 'zustand'
import {Dragon, voidDragon} from "../api/types/Dragon.ts";
import {Person, voidPerson} from "../api/types/Person.ts";
import {Command, voidCommand} from "../api/types/Command.ts";

interface UserStore {
    authorized: boolean
    user: User | null;
    setAuthorized: (authorized: boolean) => void
    setUser: (user: User | null) => void
}

interface ModalData {
    isActive: boolean
    setIsActive: (isModalActive: boolean) => void,
    isCreating: boolean,
    setIsCreating: (isCreating: boolean) => void,
}

interface DragonModalStore {
    currentHandlingDragon: Dragon,
    setCurrentHandlingDragon: (dragon: Dragon) => void


}

interface PersonModalStore {
    currentHandlingPerson: Person,
    setCurrentHandlingPerson: (person: Person) => void,


}

interface CommandModalStore {
    currentHandlingCommand: Command,
    setCurrentHandlingCommand: (dragon: Command) => void,

}


export const useUserStore = create<UserStore>((set) => ({
        authorized: false,
        user: null,
        setAuthorized: (authorized: boolean) => set({authorized}),
        setUser: (user: User | null) => set({user})
    })
)

export const useModalActive = create<ModalData>((set) => ({
        isActive: false,
        setIsActive: (isActive: boolean) => set({isActive}),
        isCreating: false,
        setIsCreating: (isCreating: boolean) => set({isCreating}),
    })
)

export const useDragonModalStore = create<DragonModalStore>((set) => ({
    currentHandlingDragon: voidDragon,
    setCurrentHandlingDragon: (currentHandlingDragon: Dragon) => set({currentHandlingDragon}),
}))


export const usePersonModalStore = create<PersonModalStore>((set) => ({
    currentHandlingPerson: voidPerson,
    setCurrentHandlingPerson: (currentHandlingPerson: Person) => set({currentHandlingPerson}),

}))


export const useCommandModalStore = create<CommandModalStore>((set) => ({
    currentHandlingCommand: voidCommand,
    setCurrentHandlingCommand: (currentHandlingCommand: Command) => set({currentHandlingCommand}),
}))


