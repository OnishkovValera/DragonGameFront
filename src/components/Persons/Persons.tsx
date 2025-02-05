import styles from "./Persons.module.css"
import {Person} from "../../api/types/Person.ts";
import PersonComponent from "./PersonComponent/PersonComponent.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/requests.ts";
import {useModalActive} from "../../store/globalStore.ts";

export default function Persons({currentNumber}: { currentNumber: number }) {

    const [persons, setPersons] = useState<Person[]>([]);
    const [orderBy, setorderBy] = useState<"asc" | "desc">("asc");
    const [searchString, setSearchString] = useState("");
    const [sortColumn, setSearchColumn] = useState<string>("name");
    const [findOnlyUsers, setFindOnlyUsers] = useState<boolean>(true);
    const {isActive} = useModalActive()

    const getPersons = (currentPage: number) => {
        api.get("/person", {
            params: {
                page: currentPage,
                size: 10,
                sortColumn: sortColumn,
                sortOrder: orderBy,
                filter: searchString,
                userPersonOnly: findOnlyUsers,
            }

        }).then((res) => {
            setPersons(res.data.content)
        })
    }
    useEffect(() => {
        getPersons(currentNumber);
    }, [isActive, currentNumber, findOnlyUsers, orderBy, searchString, sortColumn]);


    return (
        <>
            <div className={styles.d2}>
                <input onChange={(event) => {
                    setSearchString(event.target.value)
                }} type="text" placeholder="Искать здесь..."/>
                <button className={styles.personButton} onClick={() => setFindOnlyUsers(!findOnlyUsers)}>
                    {findOnlyUsers ? "только свои" : "все"}
                </button>
            </div>
            <div className={styles.tableContainer}>

                <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th onClick={() => setSearchColumn("name")}>Имя</th>
                        <th onClick={() => setSearchColumn("location")} > X&bull;Y&bull;Z</th>
                        <th onClick={() => setSearchColumn("hairColor")} >Волосы&bull;Глаза</th>
                        <th onClick={() => setSearchColumn("weight")} >Вес</th>
                        <th onClick={() => setSearchColumn("nationality")} >Нация</th>
                        <th>
                            <button className={styles.dragonButton} style={{visibility: "hidden"}}>
                                Изменить
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        persons.map((item: Person) => <PersonComponent person={item}/>)
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}