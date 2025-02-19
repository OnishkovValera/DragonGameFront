import styles from "./HeaderComponent.module.css"
import {useNavigate} from "react-router-dom";
import ChangeObjectInfoModal from "../../modal/BaseModal/changeObjectInfoModal.tsx";
import {useModalActive} from "../../store/globalStore.ts";
import DragonModal from "../../modal/DragonModal/DragonModal.tsx";
import {useDragonModalStore} from "../../store/globalStore.ts";
import {usePersonModalStore} from "../../store/globalStore.ts";
import {useCommandModalStore} from "../../store/globalStore.ts";
import PersonModal from "../../modal/PersonModal/PersonModal.tsx";
import CommandModal from "../../modal/CommandModal/CommandModal.tsx";
import {ReactElement} from "react";
import {voidDragon} from "../../api/types/Dragon.ts";
import {voidPerson} from "../../api/types/Person.ts";
import {voidCommand} from "../../api/types/Command.ts";

export default function HeaderComponent({setSelected, selected}: {
    setSelected: (selectedType: number) => void,
    selected: number
}) {

    const navigate = useNavigate();
    const {setIsActive, setIsCreating} = useModalActive()
    const {setCurrentHandlingDragon} = useDragonModalStore();
    const {setCurrentHandlingPerson} = usePersonModalStore();
    const {setCurrentHandlingCommand} = useCommandModalStore();

    const map = new Map<number, ReactElement>
    map.set(0, <DragonModal/>)
    map.set(1, <PersonModal/>)
    map.set(2, <CommandModal/>)



    return (
        <div className={styles.header}>
            <div className={`${styles.container} ${styles.addButton}`}>
                <button className={styles.Button} onClick={() => {
                    setIsCreating(true);
                    setCurrentHandlingDragon(structuredClone(voidDragon))
                    setCurrentHandlingPerson(structuredClone(voidPerson))
                    setCurrentHandlingCommand(structuredClone(voidCommand))
                    setIsActive(true)
                }}>
                    + Создать
                </button>
            </div>
            <div className={styles.container}>
                <button className={styles.Button} onClick={() => setSelected(0)}>Драконы</button>
                <button className={styles.Button} onClick={() => setSelected(1)}>Персонажи</button>
                <button className={styles.Button} onClick={() => setSelected(2)}>Команды</button>
                <button className={styles.Button} onClick={() => navigate("/special_functions")}>Доп функции</button>
            </div>
            <div className={`${styles.container} ${styles.Account}`}>
                <button className={styles.Button} onClick={() => navigate("/user")}>Аккаунт</button>
            </div>
            <ChangeObjectInfoModal>{map.get(selected)}</ChangeObjectInfoModal>
        </div>
    )
}