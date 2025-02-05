import {Person} from "../../../api/types/Person.ts";
import styles from "./PersonComponent.module.css"
import {useModalActive, useUserStore} from "../../../store/globalStore.ts";
import {usePersonModalStore} from "../../../store/globalStore.ts";

export default function PersonComponent({person}: { person: Person }) {
    const {setIsActive, setIsCreating} = useModalActive();
    const {setCurrentHandlingPerson} = usePersonModalStore();
    const {user} = useUserStore()

    function onClickPerson() {
        setIsCreating(false)
        setCurrentHandlingPerson(person)
        setIsActive(true);
    }

    function checkUser(){
        return user?.name == person.owner.name || user?.role == "ADMIN"
    }

    return (
        <tr className={styles.personItem}>
            <th className={styles.firstChild}>{person.name}</th>
            <th>{person.location ? <>{person.location.x} &bull;{person.location.y}&bull;{person.location.z}</> : null}</th>
            <th> {person.hairColor}&bull;{person.eyeColor}</th>
            <th>{person.weight}</th>
            <th>{person.nationality}</th>
            <th className={styles.lastChild}>
                {checkUser() ? (
                    <button className={styles.personButton} onClick={onClickPerson}>
                        Изменить
                    </button>
                ) : (
                    person.owner?.name
                )
                }
            </th>
        </tr>
    )
}