import styles from "./PersonModal.module.css"
import {usePersonModalStore} from "../../store/globalStore.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {Person, voidPerson} from "../../api/types/Person.ts";


export default function PersonModal() {

    const {currentHandlingPerson, isCreating} = usePersonModalStore();
    const [newPerson, setNewPerson] = useState<Person>(structuredClone(voidPerson));

    useEffect(() => {
        if (isCreating){
            setNewPerson(structuredClone(voidPerson));
        }else{
            setNewPerson(structuredClone(currentHandlingPerson));
        }
    }, [currentHandlingPerson]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

    }

    function handleChangeLocation(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPerson({...newPerson.location, [event.target.name]: event.target.name})

    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPerson({...newPerson, [event.target.name]: event.target.value});

    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setNewPerson({...newPerson, [event.target.name]: event.target.value});
    }

    return (
        <div className={styles.mainDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div>
                    <label>Имя:</label>
                    <input className={styles.input} name={"name"} type="text" value={newPerson?.name}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Цвет глаз: </label>
                    <select className={styles.select} value={newPerson?.eyeColor} name={"eyeColor"}
                            onChange={handleSelectChange}>
                        <option value={"BLACK"}>BLACK</option>
                        <option value={"BLUE"}>BLUE</option>
                        <option value={"ORANGE"}>ORANGE</option>
                        <option value={"BROWN"}>BROWN</option>
                    </select>
                </div>
                <div>
                    <label>Цвет волос: </label>
                    <select className={styles.select} value={newPerson?.hairColor} name={"hairColor"}
                            onChange={handleSelectChange}>
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
                               onChange={(event) => handleChangeLocation(event)}/>
                        <input className={styles.input} name="y" type="number"
                               value={newPerson?.location?.y}
                               onChange={(event) => handleChangeLocation(event)}/>
                        <input className={styles.input} name="z" type="number"
                               value={newPerson?.location?.z}
                               onChange={(event) => handleChangeLocation(event)}/>
                    </div>
                </div>
                <div>
                    <label>Вес: </label>
                    <input className={styles.input} type="number" value={newPerson?.weight}
                           name={"weight"}
                           onChange={handleChange}/>
                </div>
                <div>

                    <label> Национальность: </label>
                    <select className={styles.select} value={newPerson?.nationality}
                            name={"nationality"}
                            onChange={handleSelectChange}>
                        <option value={"France"}>Франция</option>
                        <option value={"Spain"}>Испания</option>
                        <option value={"Vatican"}>Ватикан</option>
                        <option value={"Japan"}>Япония</option>
                    </select>
                </div>
                <button type={"submit"} className={styles.Button}>Сохранить</button>
            </form>
        </div>
    )
}
