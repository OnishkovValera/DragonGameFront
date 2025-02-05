import styles from "./Commands.module.css"
import {Command} from "../../api/types/Command.ts";
import CommandComponent from "./CommandComponent/CommandComponent.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/requests.ts";
import {useModalActive} from "../../store/globalStore.ts";


export default function Commands({currentNumber}: { currentNumber: number }) {


    const [commands, setCommands] = useState<Command[]>([]);
    const [orderBy, setorderBy] = useState<"asc" | "desc">("asc");
    const [searchString, setSearchString] = useState("");
    const [sortColumn, setSearchColumn] = useState<string>("name");
    const [findOnlyUsers, setFindOnlyUsers] = useState<boolean>(true);
    const {isActive} = useModalActive()

    const getCommands = (currentPage: number) => {
        api.get("/team", {
            params: {
                page: currentPage,
                size: 10,
                sortColumn: sortColumn,
                sortOrder: orderBy,
                filter: searchString,
                userPersonOnly: findOnlyUsers,
            }
        }).then((res) => {
            setCommands(res.data.content);
        })
    }

    useEffect(() => {
        getCommands(currentNumber);
    }, [isActive, currentNumber, findOnlyUsers, orderBy, searchString, sortColumn]);


    return (
        <>
            <div className={styles.d2}>
                <input onChange={(event) => {
                    setSearchString(event.target.value)
                }} type="text" placeholder="Искать здесь..."/>
                <button className={styles.commandButton} onClick={() => setFindOnlyUsers(!findOnlyUsers)}>
                    {findOnlyUsers ? "только свои" : "все"}
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.headerRow}>
                        <th onClick={() => setSearchColumn("name")}>Название</th>
                        <th onClick={() => setSearchColumn("cave")}>Подземелье</th>
                        <th onClick={() => setSearchColumn("owner")}>Владелец</th>
                        <th onClick={() => setSearchColumn("members")}>Участники</th>
                        <th>
                            <button className={styles.commandButton} style={{visibility: "hidden"}}>
                                Изменить
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        commands.map((item) => <CommandComponent key={item.id} command={item}/>)
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}