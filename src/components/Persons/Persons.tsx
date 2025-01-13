import styles from "./Persons.module.css"
import {Person} from "../../api/types/Person.ts";
import PersonComponent from "./PersonComponent/PersonComponent.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/requests.ts";
import {useModalActive} from "../../store/globalStore.ts";
import DragonComponent from "../Dragons/DragonComponent/DragonComponent.tsx";

export default function Persons({currentNumber}: { currentNumber: number }) {


    const [persons, setPersons] = useState<Person[]>([]);
    const {isActive} = useModalActive()

    const getPersons = (currentPage: number) => {
        api.get("/person", {
            params: {
                page: currentPage,
                size: 10
            }
        }).then((res) => {
            setPersons(res.data.content)
        })
    }

    useEffect(() => {
        getPersons(currentNumber);
    }, [currentNumber]);

    useEffect(() => {
        getPersons(currentNumber);
    }, [isActive]);


    // return (
    //     <div className={styles.persons}>
    //         <div className={styles.personItem}>
    //             <h3 className={styles.personTitle}>Имя</h3>
    //             <p className={styles.personDetails}>
    //                 X&bull;Y&bull;Z
    //             </p>
    //             <p className={styles.personDetails}>
    //                 Волосы&bull;Глаза
    //             </p>
    //             <p className={styles.personDetails}>
    //                 Вес
    //             </p>
    //             <p className={styles.personDetails}>
    //                 Нация
    //             </p>
    //
    //
    //             <button className={styles.personButton} style={{visibility: "hidden"}}>
    //                 Изменить
    //             </button>
    //         </div>
    //         {
    //             persons.map((item: Person) => <PersonComponent person={item}/>)
    //         }
    //     </div>
    // )

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.headerRow}>
                    <th>Имя</th>
                    <th> X&bull;Y&bull;Z</th>
                    <th>Волосы&bull;Глаза</th>
                    <th>Вес</th>
                    <th>Нация</th>
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
    )
}