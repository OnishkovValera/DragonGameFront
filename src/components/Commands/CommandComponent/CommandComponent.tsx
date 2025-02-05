import styles from "./CommandComponent.module.css"
import {useCommandModalStore, useModalActive, useUserStore} from "../../../store/globalStore.ts";
import {Command} from "../../../api/types/Command.ts";

export default function CommandComponent({command}:{command: Command}) {

    const {setCurrentHandlingCommand} = useCommandModalStore();
    const {setIsActive, setIsCreating} = useModalActive();
    const {user} = useUserStore();

    function onClickCommand() {
        setIsCreating(false);
        setCurrentHandlingCommand(command);
        setIsActive(true);
    }
    function checkUser(){
        return user?.name == command?.owner?.name || user?.role == "ADMIN"
    }
    return (
        <tr className={styles.commandItem}>
            <th className={styles.firstChild}>{command.name}</th>
            <th>{command.cave?.depth ? command.cave?.depth : "Не в подземелье"}</th>
            <th>{command.owner.name}</th>
            <th>{command.members.length}</th>
            <th className={styles.lastChild}>
                {checkUser() ? (
                    <button className={styles.commandButton} onClick={onClickCommand}>
                        Изменить
                    </button>
                ) : (
                    command.owner?.name
                )
                }
            </th>
        </tr>
    )
}
