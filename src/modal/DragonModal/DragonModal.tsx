import styles from "./DragonModal.module.css"
import {useDragonModalStore} from "../../store/globalStore.ts";
import {FormEvent, useState} from "react";
import {Dragon} from "../../api/types/Dragon.ts";

export default function DragonModal() {

    const {currentHandlingDragon, setCurrentHandlingDragon} = useDragonModalStore();
    const [newDragon, setNewDragon] = useState(currentHandlingDragon ? {...currentHandlingDragon} : null)

    function doSomeShit(currentHandlingDragon:Dragon | null) {
        if( currentHandlingDragon === null) {
            return null
        }else{
            return
        }
    }

    function handleSubmit(event:FormEvent) {
        event.preventDefault()
    }



    return (
        <div>
        </div>
    )
}

