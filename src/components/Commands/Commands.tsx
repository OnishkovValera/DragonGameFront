import styles from "./Commands.module.css"
import {Command} from "../../api/types/Command.ts";
import CommandComponent from "./CommandComponent/CommandComponent.tsx";


export default function Commands() {

    const command: Command = {
        name: "ВСРФ",
        owner: {
            name: "ПУТИН",
            login: "someShit@mail.ru",
            role: "User",
            id: 123345
        },
        id: 228,
        cave: {
            depth: 200,
            numberOfTreasueres: 400
        },
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
        ]
    }


    return (
        <div className={styles.commands}>
            <div className={styles.commandItem}>
                <h3 className={styles.commandTitle}>Название</h3>
                <p className={styles.commandDetails}>
                    Вес
                </p>
                <span className={styles.commandDuration}>Владелец</span>
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