import styles from "./DragonComponent.module.css"
import {Dragon} from "../../../api/types/Dragon.ts";
import {useModalActive, useUserStore} from "../../../store/globalStore.ts";
import {useDragonModalStore} from "../../../store/globalStore.ts";

export default function DragonComponent({dragon}: { dragon: Dragon }) {

    const {setCurrentHandlingDragon} = useDragonModalStore();
    const {setIsActive, setIsCreating} = useModalActive();
    const {user} = useUserStore();

    function onClickDragon() {
        setIsCreating(false);
        setCurrentHandlingDragon(dragon);
        setIsActive(true);
    }
    function checkUser(){
        return user?.name == dragon?.owner?.name || user?.role == "ADMIN"
    }

    return (
        <tr className={styles.dragonItem}>
            <th className={styles.firstChild}>{dragon.name}</th>
            <th>{dragon.coordinates.x} &bull; {dragon.coordinates.y}</th>
            <th>{dragon.killer ? dragon.killer.name : "Жив"}</th>
            <th>{dragon.age}</th>
            <th>{dragon.description ?
                (dragon.description?.length > 10 ?
                    dragon.description?.substring(0, 10)
                    : dragon.description)
                : "Без описания"}</th>
            <th>{dragon.dragonCharacter}</th>
            <th>{dragon.dragonHead.toothCount}</th>
            <th>{dragon.creationDateTime?.substring(0, 10)}</th>
            <th className={styles.lastChild}>
                {checkUser() ? (
                    <button className={styles.dragonButton} onClick={onClickDragon}>
                        Изменить
                    </button>
                ) : (
                    dragon.owner?.name
                )
                }
            </th>
        </tr>
    )
}