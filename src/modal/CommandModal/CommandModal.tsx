import styles from "./CommandModal.module.css"
import {useCommandModalStore} from "../../store/globalStore.ts";
import {Command, voidCommand} from "../../api/types/Command.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {Person} from "../../api/types/Person.ts";

export default function CommandModal() {

    const {currentHandlingCommand, isCreating} = useCommandModalStore();
    const [newCommand, setNewCommand] = useState<Command>(structuredClone(voidCommand));
    const [addPerson, setAddPerson] = useState<boolean>(false);
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        if (isCreating) {
            setNewCommand(structuredClone(voidCommand));
        } else {
            setNewCommand(structuredClone(currentHandlingCommand));
        }
    }, [currentHandlingCommand]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewCommand({...newCommand, [event.target.name]: event.target.value});

    }

    function handleChangeCave(event: React.ChangeEvent<HTMLInputElement>) {

    }

    function handleAdd() {
        setAddPerson(true)
    }

    function personDeleteHandle(event: React.MouseEventHandler<HTMLButtonElement>) {
        setNewCommand({
            ...newCommand,
            persons: newCommand.persons.filter(person => person.id.toString() !== event.target.value)
        });
    }


    return (

        <div>
            {addPerson ? (
                <div>

                    <button className={styles.Button} style={{minWidth: "439px"}} onClick={() => setAddPerson(false)}>
                        Отмена
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className={styles.label}>{newCommand.owner.name}</label>
                    </div>
                    <div>
                        <input className={styles.input} type="text" value={newCommand.name} name={"name"}
                               onChange={handleChange}></input>
                    </div>
                    {newCommand.cave ? (
                        <>
                            <div>
                                <label className={styles.label}
                                       style={{maxHeight: "10px", fontSize: "15px"}}>Сокровища</label>
                                <label className={styles.label}
                                       style={{maxHeight: "10px", fontSize: "15px"}}>Глубина</label>
                            </div>
                            <div className={styles.locationContainer}>
                                <input className={styles.input} name="numberOfTreasuers" type="number"
                                       value={newCommand?.cave?.numberOfTreasueres}
                                       onChange={(event) => handleChangeCave(event)}/>
                                <input className={styles.input} name="depth" type="number"
                                       value={newCommand?.cave?.depth}
                                       onChange={(event) => handleChangeCave(event)}/>
                            </div>
                        </>
                    ) : (
                        <button className={styles.caveCreateButton} onClick={() => {
                            setNewCommand({
                                ...newCommand, cave: {
                                    depth: 0,
                                    numberOfTreasueres: 0
                                }
                            })
                        }}>
                            Отправить в подземелье
                        </button>
                    )
                    }
                    {
                        newCommand.persons.map((person) => (
                            <div key={person.id}>
                                <label className={styles.label} style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    width: "50%"
                                }}>{person.name}</label>
                                <button className={styles.Button} value={person.id} style={{width: "50%"}}
                                        onClick={personDeleteHandle}>
                                    Удалить
                                </button>
                            </div>
                        ))
                    }
                    <div>
                        <button className={`${styles.Button} ${styles.add}`} type={"button"} onClick={handleAdd}>
                            + Добавить
                        </button>
                    </div>
                    <div>
                        <button className={styles.Button} type={"submit"} onClick={handleSubmit}>
                            Применить
                        </button>
                    </div>
                    {!isCreating && <button className={styles.Button} type={"button"} style={{backgroundColor:"red"}} onClick={handleSubmit}>Удалить</button>}
                    </form>

                        )
                    }
                </div>
            )

            }

