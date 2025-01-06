import styles from "./Dragons.module.css"
import DragonComponent from "./DragonComponent/DragonComponent.tsx";
import {Dragon} from "../../api/types/Dragon.ts";



export default function Dragons() {

    const dragon: Dragon = {
        id: 10,
        name: "Дракон",
        dragonCharacter: "Млоодец",
        dragonHead: {
            id: 10,
            toothCount: 33
        },
        age: 100,
        creationDateTime: new Date(),
        dragonCave: {
            depth: 100,
            numberOfTreasueres: 100000
        },
        coordinates: {
            y: 0,
            x: 0
        },
        description: "ЛОЛОЛОшка",
        killer: null
    }

    return (
        <>
            <div className={styles.dragons}>
                <div className={styles.dragonItem}>
                    <h3 className={styles.dragonTitle}>Имя</h3>
                    <p className={styles.dragonDetails}>
                        Возраст &bull; Характер
                    </p>
                    <span className={styles.dragonDuration}>Дата создания</span>
                    <button className={styles.dragonButton} style={{visibility: "hidden"}}>
                        Изменить
                    </button>
                </div>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
                <DragonComponent dragon={dragon}/>
            </div>

        </>
    )
}