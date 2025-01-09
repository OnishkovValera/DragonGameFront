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
        <div className={styles.commandItem}>
            <h3 className={styles.commandTitle}>{command.name}</h3>
            <p className={styles.commandDetails}>
                {command.cave?.depth ? command.cave.depth : "Не в подземелье"}
            </p>
            <span className={styles.commandDuration}>{command.owner.name}</span>
            <div className={styles.commandDiv}>
                {command.persons.length} {command.persons.length < 4 ? "участника" : "участников" }
            </div>
            <button className={styles.commandButton} onClick={onClickCommand}>
                Изменить
            </button>
        </div>
    )
}
