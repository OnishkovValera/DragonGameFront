import {Person} from "../../../api/types/Person.ts";
import styles from "./PersonComponent.module.css"
import {useModalActive} from "../../../store/globalStore.ts";
import {usePersonModalStore} from "../../../store/globalStore.ts";

export default function PersonComponent({person}: { person: Person }) {
    const {setIsActive, setIsCreating} = useModalActive();
    const {setCurrentHandlingPerson} = usePersonModalStore();

    function onClickPerson() {
        setIsCreating(false)
        setCurrentHandlingPerson(person)
        setIsActive(true);
    }


    return (
        <div className={styles.personItem}>
            <h3 className={styles.personTitle}>{person.name}</h3>
            <p className={styles.personDetails}>
                {person.location.x}&bull;{person.location.y}&bull;{person.location.z}
            </p>
            <p className={styles.personDetails}>
                {person.hairColor}&bull;{person.eyeColor}
            </p>
            <p className={styles.personDetails}>
                {person.weight}
            </p>
            <p className={styles.personDetails}>
                {person.nationality}
            </p>
            <button className={styles.personButton} onClick={onClickPerson}>
                Изменить
            </button>
        </div>
    )
}