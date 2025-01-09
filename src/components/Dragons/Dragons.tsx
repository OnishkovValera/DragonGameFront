import styles from "./Dragons.module.css"
import DragonComponent from "./DragonComponent/DragonComponent.tsx";
import {Dragon} from "../../api/types/Dragon.ts";
import {api} from "../../api/requests.ts";
import {useEffect, useState} from "react";



export default function Dragons({currentNumber}:{currentNumber:number}) {

    const [dragons, setDragons] = useState<Dragon[]>([]);

    const getDragons = (currentPage: number) => {
        api.get("/dragon", {
            params: {
                page: currentPage,
                size: 10
            }
        }).then((res) => {
            setDragons(res.data.content)
            console.log(res)
        })
    }

    useEffect(() => {
        getDragons(currentNumber);
    }, [currentNumber]);

    return (
        <>
            <div className={styles.dragons}>
                <div className={styles.dragonItem}>
                    <h3 className={styles.dragonTitle}>Имя</h3>
                    <p className={styles.dragonDetails}>
                        X&bull;Y
                    </p>
                    <p className={styles.dragonDetails}>Убит</p>
                    <p className={styles.dragonDetails}>Возраст</p>
                    <p className={styles.dragonDetails}>Описание</p>
                    <p className={styles.dragonDetails}>Характер</p>
                    <p className={styles.dragonDetails}>Зубы</p>
                    <span className={styles.dragonDuration}>Дата создания</span>
                    <button className={styles.dragonButton} style={{visibility: "hidden"}}>
                        Изменить
                    </button>
                </div>
                {
                    dragons.map((item)=> <DragonComponent key={item.id} dragon={item}/>)
                }
            </div>

        </>
    )
}