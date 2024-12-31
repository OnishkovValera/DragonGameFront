import styles from "./TablesOfContent.module.css"
import {useState} from "react";
import Dragons from "../../components/Dragons/Dragons.tsx";
import Persons from "../../components/Persons/Persons.tsx";
import Commands from "../../components/Commands/Commands.tsx";
import {useNavigate} from "react-router-dom";

export default function TablesOfContent(){

    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    function handleCreateButtonClick() {

    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.container}>
                    <button className={styles.btn} onClick={() => setSelected(0)}>
                        Драконы
                    </button>
                    <button className={styles.btn} onClick={() => setSelected(1)}>
                        Персонажи
                    </button>
                    <button className={styles.btn} onClick={() => setSelected(2)}>
                        Команды
                    </button>
                </div>
                <div className={styles.user}>
                    <button className={styles.btn} onClick={() => navigate("/user")}>
                        Мой аккаунт
                    </button>
                </div>
            </div>
            {selected === 0 && <Dragons/>}
            {selected === 1 && <Persons/>}
            {selected === 2 && <Commands/>}
            <footer className={styles.footer}>
                <button className={styles.createButton} onClick={handleCreateButtonClick}>
                    Создать
                </button>
            </footer>
        </>
    )
}