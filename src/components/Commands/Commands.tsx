import styles from "./Commands.module.css"
import {Command} from "../../api/types/Command.ts";
import CommandComponent from "./CommandComponent/CommandComponent.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/requests.ts";
import {useModalActive} from "../../store/globalStore.ts";


export default function Commands({currentNumber}:{currentNumber:number}){


    const [commands, setCommands] = useState<Command[]>([]);
    const {isActive} = useModalActive()

    const getCommands = (currentPage: number) => {
        api.get("/team", {
            params: {
                page: currentPage,
                size: 10
            }
        }).then((res) => {
            setCommands(res.data.content);
        })
    }

    useEffect(() => {
        getCommands(currentNumber);
    }, [currentNumber]);

    useEffect(() => {
        getCommands(currentNumber)
    }, [isActive]);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.headerRow}>
                    <th>Название</th>
                    <th>Подземелье</th>
                    <th>Владелец</th>
                    <th>Участники</th>
                    <th>
                        <button className={styles.commandButton} style={{visibility: "hidden"}}>
                            Изменить
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    commands.map((item) => <CommandComponent key={item.id} command={item}/>)
                }
                </tbody>
            </table>
        </div>
    )
}