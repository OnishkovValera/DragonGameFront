import styles from "./CommandModal.module.css"
import {useCommandModalStore, useModalActive} from "../../store/globalStore.ts";
import {Command, voidCommand} from "../../api/types/Command.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {Person} from "../../api/types/Person.ts";
import {api} from "../../api/requests.ts";

export default function CommandModal() {

    const {isActive, setIsActive, isCreating} = useModalActive();
    const {currentHandlingCommand} = useCommandModalStore();
    const [newCommand, setNewCommand] = useState<Command>(structuredClone(voidCommand));
    const [addPerson, setAddPerson] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [persons, setPersons] = useState<Person[]>([]);


    useEffect(() => {
        if (isCreating) {
            setNewCommand(structuredClone(voidCommand));
        } else {
            setNewCommand(structuredClone(currentHandlingCommand));
        }
    }, [currentHandlingCommand]);

    useEffect(() => {
        if (!isActive) {
            setAddPerson(false)
        }
    }, [isActive]);


    useEffect(() => {
        console.log(isCreating);
    }, [isCreating]);

    useEffect(() => {
        setCurrentPage(0);
        if (addPerson) {
            api.get("/person", {
                params: {
                    page: currentPage,
                    size: 5
                }
            }).then((res) => {
                setPersons(res.data.content)
            })
        }
    }, [addPerson]);


    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        console.log(isCreating + "Создание")
        const commandToRequest: Command = structuredClone({
            ...newCommand,
            members: newCommand.members.map(person => person.id)
        });
        console.log(commandToRequest);
        api.post("/team", commandToRequest).then((res) => {
            setIsActive(false);

        })

    }

    function handleDelete() {
        api.delete("/team", {
            params: {
                id: currentHandlingCommand.id
            }
        }).then((res) => {
            setIsActive(false);
        })
    }

    function downloadMorePersons() {
        api.get("/person", {
            params: {
                page: currentPage + 1,
                size: 5
            }
        }).then((res) => {
            setPersons([...persons, ...res.data.content]);
        })
        setCurrentPage(currentPage + 1);
    }

    function handleChangeTeam(event: FormEvent) {
        event.preventDefault()
        console.log(isCreating + "обновление")
        const commandToRequest: Command = structuredClone({
            ...newCommand,
            members: newCommand.members.map(person => person.id)
        });
        api.put("/team", commandToRequest)
            .then((res) => {
                setIsActive(false);
            })

    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewCommand({...newCommand, [event.target.name]: event.target.value});

    }

    function handleChangeCave(event: React.ChangeEvent<HTMLInputElement>) {

    }

    function handleExistingPerson(person: Person) {
        return newCommand.members.includes(person)
    }

    function handleAdd() {
        setAddPerson(true)
    }

    function personDeleteHandle(event: React.MouseEventHandler<HTMLButtonElement>) {
        setNewCommand({
            ...newCommand,
            members: newCommand.members.filter(person => person.id.toString() !== event.target.value)
        });
    }

    function addPersonToCommand(person: Person) {
        if (!newCommand.members.some(member => member.id === person.id)) {
            setNewCommand(structuredClone({...newCommand, members: [...newCommand.members, person]}));
            setAddPerson(false)

        }
    }

    return (
        <div>
            {addPerson ? (
                <div className={styles.addPersonContainer}>

                    {persons.map((person: Person) => {
                            if (!newCommand.members.some(member => member.id === person.id)) {
                                return (
                                    <div className={styles.person}
                                         key={person.id}
                                         onClick={() => addPersonToCommand(person)}>
                                        {person.name}
                                    </div>)
                            } else {
                                return (
                                    <div className={`${styles.person} ${styles.personDisabled}`}
                                         key={person.id}
                                         onClick={() => addPersonToCommand(person)}>
                                        {person.name} уже в команде
                                    </div>
                                )
                            }
                        }
                    )}

                    <button className={styles.Button} style={{minWidth: "439px"}} onClick={downloadMorePersons}>
                        Еще 5 персонажей
                    </button>

                    <button className={styles.Button} style={{minWidth: "439px"}} onClick={() => setAddPerson(false)}>
                        Отмена
                    </button>
                </div>
            ) : (
                <form onSubmit={isCreating ? handleSubmit : handleChangeTeam} className={styles.form}>
                    <div>
                        <label className={styles.label}>{newCommand.owner.name}</label>
                    </div>
                    <div>
                        <input className={styles.input} type="text" placeholder={"Название"} value={newCommand.name}
                               name={"name"}
                               minLength={6}
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
                    )}
                    {
                        newCommand.members.map((person) => (
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
                        <button className={styles.Button} type={"submit"}>
                            Применить
                        </button>
                    </div>
                    {!isCreating && <button className={styles.Button} type={"button"} style={{backgroundColor: "red"}}
                                            onClick={handleDelete}>Удалить</button>}
                </form>

            )
            }
        </div>
    )

}

