import styles from "./DragonModal.module.css"
import {useDragonModalStore, useModalActive} from "../../store/globalStore.ts";
import {FormEvent, useEffect, useState} from "react";
import {Dragon, voidDragon} from "../../api/types/Dragon.ts";
import {api} from "../../api/requests.ts";

export default function DragonModal() {
    const {setIsActive, isCreating} = useModalActive();
    const {currentHandlingDragon, setCurrentHandlingDragon} = useDragonModalStore();
    const [newDragon, setNewDragon] = useState<Dragon>(structuredClone(voidDragon));

    useEffect(() => {
        if (isCreating) {
            setNewDragon(structuredClone(voidDragon));
        } else {
            setNewDragon(structuredClone(currentHandlingDragon));
        }
    }, [currentHandlingDragon]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        api.post("dragon", newDragon).then((response) => {
            setCurrentHandlingDragon(response.data)
            setIsActive(false);

        })
    }

    function handleUpdate(event: FormEvent) {
        event.preventDefault()
        api.put("dragon", newDragon).then((response) => {
            setCurrentHandlingDragon(response.data)
            setIsActive(false);

        })
    }

    function deleteDragon() {
        api.delete("dragon", {
            params:{
                id: currentHandlingDragon.id
            }
        }).then((response) => {
            setIsActive(false);
        }).catch((error) => {console.log(error)})

    }

    return (
        <div className={styles.mainDiv}>
            <form className={styles.form} onSubmit={isCreating ? handleSubmit : handleUpdate}>

                <div>
                    <label>Имя:</label>
                    <input className={styles.input} name={"name"} type="text" required minLength={6}
                           value={newDragon?.name}
                           onChange={(event) => {
                               setNewDragon({...newDragon, name: event.target.value})

                           }}/>
                </div>
                <div>
                    <label>Характер:</label>
                    <select className={styles.select} value={newDragon?.dragonCharacter} name={"dragonCharacter"}
                            onChange={(event) => {
                                setNewDragon({...newDragon, dragonCharacter: event.target.value})
                            }}>
                        <option value={"CUNNING"}>CUNNING</option>
                        <option value={"GOOD"}>GOOD</option>
                        <option value={"CHAOTIC_EVIL"}>CHAOTIC_EVIL</option>
                        <option value={"FICKLE"}>FICKLE</option>
                    </select>
                </div>
                <div>
                    <label>Разговаривает:</label>
                    <select className={styles.select} value={newDragon?.speaking} name={"speaking"}
                            onChange={(event) => {
                                setNewDragon({...newDragon, speaking: event.target.value === "true"})

                            }}>
                        <option value={"true"}>Разговаривает</option>
                        <option value={"false"}>Немой</option>

                    </select>
                </div>
                <div>
                    <label>Координаты(XY):</label>
                    <div className={styles.locationContainer}>
                        <input className={styles.input} name="x" max={98} type="number"
                               value={newDragon?.coordinates?.x}
                               onChange={(event) => {
                                   setNewDragon({
                                       ...newDragon,
                                       coordinates: {...newDragon.coordinates, x: Number.parseInt(event.target.value)}
                                   })

                               }}/>
                        <input className={styles.input} name="y" min={-462} type="number"
                               value={newDragon?.coordinates?.y}
                               onChange={(event) => {
                                   setNewDragon({
                                       ...newDragon,
                                       coordinates: {...newDragon.coordinates, y: Number.parseInt(event.target.value)}
                                   })

                               }}/>
                    </div>
                </div>

                <div>
                    <label>Возраст: </label>
                    <input className={styles.input} type="number" required min={1} value={newDragon?.age}
                           name={"age"}
                           onChange={(event) => {
                               setNewDragon({...newDragon, age: Number.parseInt(event.target.value)})
                           }}/>
                </div>

                <div>
                    <label>Количество зубов: </label>
                    <input className={styles.input} type="number" value={newDragon?.dragonHead?.toothCount}
                           name={"toothCount"}
                           onChange={(event) => {
                               setNewDragon({
                                   ...newDragon,
                                   dragonHead: {
                                       ...newDragon.dragonHead,
                                       toothCount: Number.parseInt(event.target.value)
                                   }
                               })
                           }
                           }/>
                </div>

                <div>
                    <label>Описание:</label>
                    <input className={styles.input} type="text"
                           value={newDragon?.description ? newDragon.description : ""}
                           name={"description"}
                           onChange={(event) => {
                               setNewDragon({...newDragon, description: event.target.value})

                           }}/>
                </div>
                {newDragon?.dragonCave ? (
                    <>
                        <div className={styles.caveDiv}>
                            <label className={styles.labelToCave}>Сокровища</label>
                            <input className={styles.input} name="depth" type="number"
                                   value={newDragon?.dragonCave?.depth}
                                   onChange={(event) => {
                                       setNewDragon({
                                           ...newDragon,
                                           dragonCave: {
                                               ...newDragon.dragonCave,
                                               depth: Number.parseInt(event.target.value)
                                           }
                                       })

                                   }}/>
                        </div>

                        <div className={styles.caveDiv}>
                            <label className={styles.labelToCave}>Глубина</label>
                            <input className={styles.input} name="numberOfTreasueres" type="number"
                                   value={newDragon?.dragonCave?.numberOfTreasueres}
                                   onChange={(event) => {
                                       setNewDragon({
                                           ...newDragon,
                                           dragonCave: {
                                               ...newDragon.dragonCave,
                                               numberOfTreasueres: Number.parseInt(event.target.value)
                                           }
                                       })

                                   }}/>
                        </div>
                    </>
                ) : (
                    <button className={styles.Button} onClick={() => {
                        setNewDragon({
                            ...newDragon, dragonCave: {
                                depth: 0,
                                numberOfTreasueres: 0
                            }
                        })
                    }}>
                        Отправить в подземелье
                    </button>
                )
                }
                <button type={"submit"} className={styles.Button}>Сохранить</button>
                {!isCreating && <button type={"button"} className={styles.Button} style={{backgroundColor:"red" }} onClick={deleteDragon}>Удалить</button>}

            </form>
        </div>
    )
}