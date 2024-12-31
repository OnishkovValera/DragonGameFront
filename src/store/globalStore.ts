import {User} from "../api/types/User.ts"
import {create} from 'zustand'

interface UserStore {
    authorized: boolean
    user: User | null;
    setAuthorized: (authorized: boolean) => void
    setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
        authorized: false,
        user: null,
        setAuthorized: (authorized:boolean) => set({authorized}),
        setUser: (user: User | null) => set({user})
    })
)
