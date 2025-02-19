import styles from "./Dragons.module.css"
import DragonComponent from "./DragonComponent/DragonComponent.tsx";
import {Dragon} from "../../api/types/Dragon.ts";
import {api} from "../../api/requests.ts";
import {useEffect, useState} from "react";
import {useModalActive} from "../../store/globalStore.ts";
import {useNavigate} from "react-router-dom";


export default function Dragons({currentNumber}: { currentNumber: number }) {

    const navigate = useNavigate();
    const [dragons, setDragons] = useState<Dragon[]>([]);
    const [orderBy, setorderBy] = useState<"asc" | "desc">("asc");
    const [searchString, setSearchString] = useState("");
    const [sortColumn, setSearchColumn] = useState<string>("name");
    const [findOnlyUsers, setFindOnlyUsers] = useState<boolean>(true);
    const {isActive} = useModalActive();

    const getDragons = (currentPage: number) => {
        api.get("/dragon", {
            params: {
                page: currentPage,
                size: 10,
                sortColumn: sortColumn,
                sortOrder: orderBy,
                filter: searchString,
                userPersonOnly: findOnlyUsers
            }
        }).then((res) => {
            console.log(res);
            setDragons(res.data.content)
        })
    }


    useEffect(() => {
        getDragons(currentNumber);
    }, [isActive, currentNumber, findOnlyUsers, orderBy, searchString, sortColumn]);

    return (
        <>
            <div className={styles.d2}>
                <button className={styles.dragonButton} onClick={() => navigate("/import")}>Импорт файла</button>
                <input onChange={(event) => {
                    setSearchString(event.target.value)
                }} type="text" placeholder="Искать здесь..."/>
                <button className={styles.dragonButton} onClick={() => setFindOnlyUsers(!findOnlyUsers)}>
                    {findOnlyUsers ? "только свои" : "все"}
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.headerRow}>
                        <th onClick={() => setSearchColumn("name")}>Имя</th>
                        <th onClick={() => setSearchColumn("coordinates")}>X&bull;Y</th>
                        <th onClick={() => setSearchColumn("person")}>Убит</th>
                        <th onClick={() => setSearchColumn("age")}>Возраст</th>
                        <th onClick={() => setSearchColumn("description")}>Описание</th>
                        <th onClick={() => setSearchColumn("character")}>Характер</th>
                        <th onClick={() => setSearchColumn("head")}>Зубы</th>
                        <th onClick={() => setSearchColumn("dataTime")}>Дата создания</th>
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