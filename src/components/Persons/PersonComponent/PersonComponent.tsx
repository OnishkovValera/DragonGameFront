import {Person} from "../../../api/types/Person.ts";
import styles from "./PersonComponent.module.css"
import {useModalActive} from "../../../store/globalStore.ts";
import {usePersonModalStore} from "../../../store/globalStore.ts";

export default function PersonComponent ({person}:{person:Person}){
    const {setIsActive} = useModalActive();
    const {setCurrentHandlingPerson, setIsCreating} = usePersonModalStore();

    function onClickPerson (){
        setIsCreating(false)
        setCurrentHandlingPerson(person)
        setIsActive(true);
    }


    return (
        <div className={styles.personItem}>
            <h3 className={styles.personTitle}>{person.name}</h3>
            <p className={styles.personDetails}>
                {person.weight} &bull; {person.nationality}
            </p>
            <span className={styles.dragonDuration}>{person.hairColor}</span>
            <button className={styles.personButton} onClick={onClickPerson}>
                Изменить
            </button>
        </div>
    )
}