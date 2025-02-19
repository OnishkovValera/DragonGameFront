import styles from "../../Dragons/Dragons.module.css";
import {useEffect, useState} from "react";
import {Dragon} from "../../../api/types/Dragon.ts";
import {api} from "../../../api/requests.ts";
import DragonComponent from "../../Dragons/DragonComponent/DragonComponent.tsx";

export default function LessThanToothCountComponent() {
    const [dragons, setDragons] = useState<Dragon[]>([]);
    const [searchString, setSearchString] = useState(500);
    const getDragons = () => {
        api.get("/dragon/filter_by_tooth", {
            params: {
                toothCount: searchString
            }
        }).then((res) => {
            console.log(res);
            setDragons(res.data)
        })
    }

    useEffect(() => {
        getDragons()
    }, [searchString])



    return (
        <>
            <div className={styles.d2}>
                <input onChange={(event) => {
                    setSearchString(event.target.value)
                }} type="number" placeholder="Введите количество"/>
            </div>

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
                        dragons.map((item) => <DragonComponent key={item.id} dragon={item}/>)
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}