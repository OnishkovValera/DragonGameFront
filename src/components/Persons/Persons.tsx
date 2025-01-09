import styles from "./Persons.module.css"
import {Person} from "../../api/types/Person.ts";
import PersonComponent from "./PersonComponent/PersonComponent.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/requests.ts";

export default function Persons({currentNumber}:{currentNumber:number}) {


    const [persons, setPersons] = useState<Person[]>([]);

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


    return (
        <div className={styles.persons}>
            <div className={styles.personItem}>
                <h3 className={styles.personTitle}>Имя</h3>
                <p className={styles.personDetails}>
                    X&bull;Y&bull;Z
                </p>
                <p className={styles.personDetails}>
                    Волосы&bull;Глаза
                </p>
                <p className={styles.personDetails}>
                    Вес
                </p>
                <p className={styles.personDetails}>
                    Нация
                </p>


                <button className={styles.personButton} style={{visibility: "hidden"}}>
                    Изменить
                </button>
            </div>
            {
                persons.map((item:Person) => <PersonComponent person={item}/>)
            }
        </div>
    )
}