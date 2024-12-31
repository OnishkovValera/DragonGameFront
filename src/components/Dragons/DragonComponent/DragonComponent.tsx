import styles from "./DragonComponent.module.css"
import {Dragon} from "../../../api/types/Dragon.ts";

export default function DragonComponent({dragon}: { dragon: Dragon }) {

    function onClickDragon() {

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