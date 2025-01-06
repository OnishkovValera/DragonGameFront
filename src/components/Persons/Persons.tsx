import styles from "./Persons.module.css"
import {Person} from "../../api/types/Person.ts";
import PersonComponent from "./PersonComponent/PersonComponent.tsx";
export default function Persons(){
    const newPerson: Person = {
        id: 123,
        name: "Valera",
        eyeColor: "BLUE",
        hairColor: "BLACK",
        location: {
            x:10,
            y:20,
            z:30
        },
        nationality: "Russian",
        weight: 120
    }


    return (
        <div className={styles.persons}>
            <div className={styles.personItem}>
                <h3 className={styles.personTitle}>Имя</h3>
                <p className={styles.personDetails}>
                    Вес &bull; Национальность
                </p>
                <span className={styles.dragonDuration}>Цвет волос</span>
                <button className={styles.personButton} style={{visibility: "hidden"}}>
                    Изменить
                </button>
            </div>
            <PersonComponent person={newPerson}/>
            <PersonComponent person={newPerson}/>
            <PersonComponent person={newPerson}/>
            <PersonComponent person={newPerson}/>
        </div>
    )
}