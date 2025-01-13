import styles from "./CommandComponent.module.css"
import {useCommandModalStore, useModalActive} from "../../../store/globalStore.ts";
import {Command} from "../../../api/types/Command.ts";

export default function CommandComponent({command}:{command: Command}) {

    const {setCurrentHandlingCommand} = useCommandModalStore();
    const {setIsActive, setIsCreating} = useModalActive();



    function onClickCommand() {
        setIsCreating(false);
        setCurrentHandlingCommand(command);
        setIsActive(true);
    }

    return (
        <tr className={styles.commandItem}>
            <th className={styles.firstChild}>{command.name}</th>
            <th>{command.cave?.depth ? command.cave?.depth : "Не в подземелье"}</th>
            <th>{command.owner.name}</th>
            <th>{command.members.length}</th>
            <th className={styles.lastChild}>
                <button className={styles.commandButton} onClick={onClickCommand}>
                    Изменить
                </button>
            </th>
        </tr>
    )
}
