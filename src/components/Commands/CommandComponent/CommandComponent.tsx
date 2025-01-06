import styles from "./CommandComponent.module.css"
import {useCommandModalStore, useModalActive} from "../../../store/globalStore.ts";
import {Command} from "../../../api/types/Command.ts";

export default function CommandComponent({command}:{command: Command}) {

    const {currentHandlingCommand, setCurrentHandlingCommand} = useCommandModalStore();
    const { setIsActive } = useModalActive();



    function onClickCommand() {
        setCurrentHandlingCommand(command);
        console.log(command, currentHandlingCommand);
        setIsActive(true);
    }

    return (
        <div className={styles.commandItem}>
            <h3 className={styles.commandTitle}>{command.name}</h3>
            <p className={styles.commandDetails}>
                {command.persons[0].weight}
            </p>
            <span className={styles.commandDuration}>{command.owner.name}</span>
            <button className={styles.commandButton} onClick={onClickCommand}>
                Изменить
            </button>
        </div>
    )
}
