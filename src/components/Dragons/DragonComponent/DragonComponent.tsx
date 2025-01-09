import styles from "./DragonComponent.module.css"
import {Dragon} from "../../../api/types/Dragon.ts";
import {useModalActive} from "../../../store/globalStore.ts";
import {useDragonModalStore} from "../../../store/globalStore.ts";

export default function DragonComponent({dragon}: { dragon: Dragon }) {

    const {setCurrentHandlingDragon} = useDragonModalStore();
    const {setIsActive, setIsCreating} = useModalActive();


    function onClickDragon() {
        setIsCreating(false);
        setCurrentHandlingDragon(dragon);
        setIsActive(true);
    }

    return (
        <div className={styles.dragonItem}>
            <h3 className={styles.dragonTitle}>{dragon.name}</h3>
            <p className={styles.dragonDetails}>
                {dragon.coordinates.x} &bull; {dragon.coordinates.y}
            </p>
            <p className={styles.dragonDetails}>{dragon.killer ? dragon.killer.name : "Жив"}</p>
            <p className={styles.dragonDetails}>{dragon.age}</p>
            <p className={styles.dragonDetails}>{dragon.description ?
                (dragon.description?.length > 10 ?
                    dragon.description?.substring(0, 10)
                    : dragon.description)
                : "Без описания"}</p>
            <p className={styles.dragonDetails}>{dragon.dragonCharacter}</p>
            <p className={styles.dragonDetails}>{dragon.dragonHead.toothCount}</p>
            <span className={styles.dragonDuration}>{dragon.creationDateTime?.substring(0, 10)}</span>
            <button className={styles.dragonButton} onClick={onClickDragon}>
                Изменить
            </button>
        </div>
    )
}