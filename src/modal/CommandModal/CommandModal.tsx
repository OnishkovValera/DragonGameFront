import styles from "./CommandModal.module.css"
import {useDragonModalStore} from "../../store/globalStore.ts";

export default function CommandModal() {

    const {currentHandlingDragon, setCurrentHandlingDragon} = useDragonModalStore();

    return (
        <div>
            {JSON.stringify(currentHandlingDragon)}
        </div>
    )
}

