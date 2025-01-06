import styles from "./DragonComponent.module.css"
import {Dragon} from "../../../api/types/Dragon.ts";
import {useModalActive} from "../../../store/globalStore.ts";
import {useDragonModalStore} from "../../../store/globalStore.ts";

export default function DragonComponent({dragon}: { dragon: Dragon }) {

    const {currentHandlingDragon, setCurrentHandlingDragon} = useDragonModalStore();
    const {isActive, setIsActive} = useModalActive();



    function onClickDragon() {
        setCurrentHandlingDragon(dragon);
        console.log(dragon, currentHandlingDragon);
        setIsActive(true);
    }

    return (
        <div className={styles.dragonItem}>
            <h3 className={styles.dragonTitle}>{dragon.name}</h3>
            <p className={styles.dragonDetails}>
                {dragon.age} &bull; {dragon.dragonCharacter}
            </p>
            <span className={styles.dragonDuration}>{dragon.creationDateTime.toLocaleDateString()}</span>
            <button className={styles.dragonButton} onClick={onClickDragon}>
                Изменить
            </button>
        </div>
    )
}