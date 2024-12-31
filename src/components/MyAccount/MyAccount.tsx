import styles from "./MyAccount.module.css"
import {useUserStore} from "../../store/globalStore.ts";
import {useNavigate} from "react-router-dom";

export default function MyAccount() {
    const {user} = useUserStore();
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.header}>
                <div className={styles.container}>
                    <button className={styles.btn} onClick={() => {
                    }}>
                        Выйти
                    </button>
                    <button className={styles.btn} onClick={() => {
                        navigate("/main")
                    }}>
                        На главную
                    </button>
                </div>
            </div>
            <div className={styles.container}>
                <h1>Профиль пользователя</h1>

                <div>
                    <p><strong>Имя:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.login}</p>
                    <p><strong>Роль:</strong> {user?.role}</p>
                    <p><strong>id:</strong> {user?.id}</p>
                </div>

                <button className={styles.button} onClick={() => alert("Редактировать профиль")}>
                    Редактировать профиль
                </button>
            </div>
        </>
    )

}