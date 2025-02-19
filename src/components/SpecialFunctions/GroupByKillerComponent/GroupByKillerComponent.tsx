import styles from "./GroupByKillerComponent.module.css"
import {useEffect, useState} from "react";
import {api} from "../../../api/requests.ts";

export default function GroupByKillerComponent() {
    type DataResponse = Record<string, number>;

    const [persons, setPersons] = useState<DataResponse | null>();

    useEffect(() => {
        api.get("/dragon/group_by_killer").then(
            response => {
                console.log(response);
                setPersons(response.data)
            }
        ).catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    }, [])

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.Item}>
                        <th className={styles.firstChild}>Имя</th>
                        <th className={styles.lastChild}>Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {persons ? (
                            Object.entries(persons).map(([key, value]) => (
                                <tr className={styles.Item}>
                                    <th className={styles.firstChild}>{key}</th>
                                    <th className={styles.lastChild}>{value}</th>
                                </tr>
                            ))
                    ) : (
                        <p>Загрузка данных...</p>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}