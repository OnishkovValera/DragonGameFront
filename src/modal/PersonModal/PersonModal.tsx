import styles from "./PersonModal.module.css"
import {useModalActive, usePersonModalStore} from "../../store/globalStore.ts";
import {FormEvent, useEffect, useState} from "react";
import {Person, voidPerson} from "../../api/types/Person.ts";
import {api} from "../../api/requests.ts";


export default function PersonModal() {

    const {setIsActive, isCreating} = useModalActive();
    const {currentHandlingPerson} = usePersonModalStore();
    const [newPerson, setNewPerson] = useState<Person>(structuredClone(voidPerson));

    useEffect(() => {
        if (isCreating) {
            setNewPerson(structuredClone(voidPerson));
        } else {
            setNewPerson(structuredClone(currentHandlingPerson));
        }
    }, [currentHandlingPerson]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        api.post("/person", newPerson)
            .then((response) => {
                setIsActive(false)
            })
    }


    function deletePerson() {
        api.delete("/person/" + currentHandlingPerson.id)
            .then((result) => {
                    setIsActive(false)
                }
            )
    }

    function handleChangePerson(event: FormEvent) {
        event.preventDefault()
        console.log(newPerson)
        api.put("/person", newPerson)
            .then((result) => {
                setIsActive(false);

            })

    }

    return (
        <div className={styles.mainDiv}>
            <form className={styles.form} onSubmit={isCreating ? handleSubmit : handleChangePerson}>

                <div>
                    <label>Имя:</label>
                    <input className={styles.input} name={"name"} type="text" required minLength={6}
                           value={newPerson?.name}
                           onChange={(event) => {
                               setNewPerson({...newPerson, name: event.target.value});
                           }}/>
                </div>
                <div>
                    <label>Цвет глаз: </label>
                    <select className={styles.select} value={newPerson?.eyeColor} name={"eyeColor"}
                            onChange={
                                (event) => {
                                    setNewPerson({...newPerson, eyeColor: event.target.value});
                                }
                            }>
                        <option value={"BLACK"}>BLACK</option>
                        <option value={"BLUE"}>BLUE</option>
                        <option value={"ORANGE"}>ORANGE</option>
                        <option value={"BROWN"}>BROWN</option>
                    </select>
                </div>
                <div>
                    <label>Цвет волос: </label>
                    <select className={styles.select} value={newPerson?.hairColor} name={"hairColor"}
                            onChange={(event) => {
                                setNewPerson({...newPerson, hairColor: event.target.value});
                            }}>
                        <option value={"BLACK"}>BLACK</option>
                        <option value={"BLUE"}>BLUE</option>
                        <option value={"ORANGE"}>ORANGE</option>
                        <option value={"BROWN"}>BROWN</option>
                    </select>
                </div>
                <div>
                    <label>Локация(XYZ):</label>
                    <div className={styles.locationContainer}>
                        <input className={styles.input} name="x" type="number"
                               value={newPerson?.location?.x}
                               onChange={(event) => {
                                   setNewPerson({
                                       ...newPerson,
                                       location: {...newPerson.location, x: Number.parseInt(event.target.value)}
                                   });
                               }}/>
                        <input className={styles.input} name="y" type="number"
                               value={newPerson?.location?.y}
                               onChange={(event) => {
                                   setNewPerson({
                                       ...newPerson,
                                       location: {...newPerson.location, y: Number.parseInt(event.target.value)}
                                   });
                               }}/>
                        <input className={styles.input} name="z" type="number"
                               value={newPerson?.location?.z}
                               onChange={(event) => {
                                   setNewPerson({
                                       ...newPerson,
                                       location: {...newPerson.location, z: Number.parseInt(event.target.value)}
                                   });
                               }}/>
                    </div>
                </div>
                <div>
                    <label>Вес: </label>
                    <input className={styles.input} type="number" required min={1} value={newPerson?.weight}
                           name={"weight"}
                           onChange={(event) => {
                               setNewPerson({...newPerson, weight: Number.parseInt(event.target.value)});
                           }}/>
                </div>
                <div>

                    <label> Национальность: </label>
                    <select className={styles.select} value={newPerson?.nationality}
                            name={"nationality"}
                            onChange={(event) => {
                                setNewPerson({...newPerson, nationality: event.target.value});
                            }}>
                        <option value={"FRANCE"}>Франция</option>
                        <option value={"SPAIN"}>Испания</option>
                        <option value={"VATICAN"}>Ватикан</option>
                        <option value={"JAPAN"}>Япония</option>
                    </select>
                </div>
                <button type={"submit"} className={styles.Button}>Сохранить</button>
                {!isCreating && <button type={"button"} className={styles.Button} style={{backgroundColor: "red"}}
                                        onClick={deletePerson}>Удалить</button>}

            </form>
        </div>
    )
}
