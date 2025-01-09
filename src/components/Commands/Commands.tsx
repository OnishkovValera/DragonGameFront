import styles from "./Commands.module.css"
import {Command} from "../../api/types/Command.ts";
import CommandComponent from "./CommandComponent/CommandComponent.tsx";
import {useEffect, useState} from "react";
import {Person} from "../../api/types/Person.ts";
import {api} from "../../api/requests.ts";


export default function Commands({currentNumber}:{currentNumber:number}){


    const [persons, setPersons] = useState<Person[]>([]);

    const getPersons = (currentPage: number) => {
        api.get("/command", {
            params: {
                page: currentPage,
                size: 5
            }
        }).then((res) => {
            setPersons(res.data);
        })
    }
    useEffect(() => {
        getPersons(currentNumber);
    }, [currentNumber]);


    const command: Command = {
        name: "ВСРФ",
        owner: {
            name: "ПУТИН",
            login: "someShit@mail.ru",
            role: "User",
            id: 123345
        },
        id: 228,
        cave: null,
        persons: [
            {
                id: 123,
                weight: 200,
                name: "picador",
                nationality: "Russian",
                location: {
                    x: 100,
                    y: 200,
                    z: 300
                },
                eyeColor: "BLACK",
                hairColor: "BLACK",
            },
            {
                id: 100,
                weight: 200,
                name: "picador",
                nationality: "Russian",
                location: {
                    x: 100,
                    y: 200,
                    z: 300
                },
                eyeColor: "BLACK",
                hairColor: "BLACK",
            },
            {
                id: 200,
                weight: 200,
                name: "picador",
                nationality: "Russian",
                location: {
                    x: 100,
                    y: 200,
                    z: 300
                },
                eyeColor: "BLACK",
                hairColor: "BLACK",
            },
        ]
    }


    return (
        <div className={styles.commands}>
            <div className={styles.commandItem}>
                <h3 className={styles.commandTitle}>Название</h3>
                <p className={styles.commandDetails}>
                    Подземелье
                </p>
                <span className={styles.commandDuration}>Владелец</span>
                <div className={styles.commandDetails}>
                    Участники
                </div>
                <button className={styles.commandButton}>
                    Изменить
                </button>
            </div>
            <CommandComponent command={command}/>
            <CommandComponent command={command}/>
            <CommandComponent command={command}/>
            <CommandComponent command={command}/>
            <CommandComponent command={command}/>

        </div>
    )
}