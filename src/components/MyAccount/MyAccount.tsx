import styles from "./MyAccount.module.css"
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {User} from "../../api/types/User.ts";
import {useUserStore} from "../../store/globalStore.ts";

export default function MyAccount() {

    const {user, setUser} = useUserStore();

    const [newUser, setNewUser] = useState<User>(structuredClone(user))
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const name = e.target.name;
        setNewUser({...newUser, [name]: value})
    }


    return (
        <>
            <div className={styles.header}>
                <div className={styles.container}>
                    <button className={styles.Button} onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>
                        Выйти
                    </button>
                    <button className={styles.Button} onClick={() => {
                        navigate("/main");
                    }}>
                        На главную
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className={styles.userInfoContainer}>
                    <h1>Редактированние профиля</h1>
                    <div className={styles.labelContainer}>
                        <label>
                            Имя:
                            <input type={"text"} name={"name"} minLength={6} value={newUser.name || ""} onChange={handleChange}/>
                        </label>
                        <label>
                            Email:
                            <input type={"email"} name={"email"} minLength={6}value={newUser.login || ""} onChange={handleChange}/>
                        </label>
                        <label>
                            Роль:
                            <input type={"text"} name={"role"} value={newUser.role || ""} onChange={handleChange}/>
                        </label>
                        <label>
                            id:
                            <input type={"number"} name={"id"} value={newUser.id || ""} onChange={handleChange}/>
                        </label>
                    </div>
                    <button className={styles.Button} onClick={()=>{
                        setUser(newUser)
                        setIsEditing(false)

                    }}>
                        Сохранить
                    </button>

                    <button className={styles.Button} onClick={() => {
                        setIsEditing(false)
                    }}>Отмена
                    </button>
                </div>
            ) : (

                <div className={styles.userInfoContainer}>
                    <h1>Профиль пользователя</h1>

                    <div>
                    <p><strong>Имя:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.login}</p>
                        <p><strong>Роль:</strong> {user?.role}</p>
                        <p><strong>id:</strong> {user?.id}</p>
                    </div>

                    <button className={styles.Button} onClick={() => setIsEditing(true)}>
                        Редактировать профиль
                    </button>
                </div>
            )
            }
        </>
    )

}