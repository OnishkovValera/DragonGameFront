import {useCallback, useEffect, useState} from "react";
import {Dragon} from "../../../api/types/Dragon.ts";
import {api} from "../../../api/requests.ts";
import styles from "../../Dragons/Dragons.module.css";
import DragonComponent from "../../Dragons/DragonComponent/DragonComponent.tsx";


export default function SelectSpeakingDragonsComponent() {
    const [selectedOption, setSelectedOption] = useState<boolean>(true);
    const [data, setData] = useState<Dragon[]>([]);

    const fetchData = () => {
        try {
            api.get("/dragon/get_by_speaking", {
                params: {
                    speaking: selectedOption
                }
            }).then((response) => {
                setData(response.data);

            })
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedOption]);


    return (
        <>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value={true}>Разговаривает</option>
                <option value={false}>Не разговаривает</option>
            </select>

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
                        data.map((item) => <DragonComponent key={item.id} dragon={item}/>)
                    }
                    </tbody>
                </table>
            </div>


        </>
    )
}