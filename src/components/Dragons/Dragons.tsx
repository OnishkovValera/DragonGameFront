import styles from "./Dragons.module.css"
import DragonComponent from "./DragonComponent/DragonComponent.tsx";
import {Dragon} from "../../api/types/Dragon.ts";
import {api} from "../../api/requests.ts";
import {useEffect, useState} from "react";
import {useModalActive} from "../../store/globalStore.ts";



export default function Dragons({currentNumber}:{currentNumber:number}) {

    const [dragons, setDragons] = useState<Dragon[]>([]);
    const {isActive} = useModalActive();

    const getDragons = (currentPage: number) => {
        api.get("/dragon", {
            params: {
                page: currentPage,
                size: 10
            }
        }).then((res) => {
            setDragons(res.data.content)
        })
    }


    useEffect(() => {
        getDragons(currentNumber);
    }, [currentNumber]);


    useEffect(() => {
        getDragons(currentNumber);
    }, [isActive]);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.headerRow}>
                    <th>Имя</th>
                    <th>X&bull;Y</th>
                    <th>Убит</th>
                    <th>Возраст</th>
                    <th>Описание</th>
                    <th>Характер</th>
                    <th>Зубы</th>
                    <th>Дата создания</th>
                    <th>
                        <button className={styles.dragonButton} style={{visibility: "hidden"}}>
                            Изменить
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    dragons.map((item)=> <DragonComponent key={item.id} dragon={item}/>)
                }
                </tbody>
            </table>
        </div>
    )
}