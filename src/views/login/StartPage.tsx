import styles from "./StartPage.module.css"
import {useNavigate} from "react-router-dom";

export default function StartPage() {
    const navigate = useNavigate()

    return (
        <div className={styles.div}>
            <h1>Лабораторная работа №1</h1>
            <div className={styles.container}>
                <button className={styles.btn} onClick={() => navigate("/register")}>Зарегистрироваться</button>
                <button className={styles.btn} onClick={() => navigate("/login")}>Залогиниться</button>
            </div>
        </div>
    )
}