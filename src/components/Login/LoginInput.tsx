import {FormEvent, useEffect, useState} from "react";
import {useUserStore} from "../../store/globalStore.ts";
import {api} from "../../api/requests.ts"
import {useNavigate} from "react-router-dom";
import styles from "./LoginInput.module.css"

export default function LoginInput() {
    const {setUser, authorized} = useUserStore();
    const [message, setMessage] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const checkLogin = async () => {
        try {
            const response = await api.post("/login", {
                login: login,
                password: password
            })
            localStorage.setItem("token", response.data.token.toString())

            const userResponse = await api.get("/user/me")
            setUser(userResponse.data)
            navigate("/main")
            setError(false);
        } catch (err) {
            console.log(err)
            setMessage(err.response.data.description)
            setError(true)
        }
    }

    useEffect(() => {
        if(authorized){
            navigate("/main")
        }
        }, [authorized]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        checkLogin();

    }


    return (<div className={styles.div}>
            <h1>Вход</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type={"email"} value={login} required placeholder={"Введите почту"}
                       onChange={(e) => setLogin(e.target.value)}/>
                <input className={styles.input} type={"password"} required minLength={6} value={password} placeholder={"Введите пароль"}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type={"submit"} className={styles.btn}>Войти</button>
            </form>
            {error && (
                <div className={styles.div} style={{color: 'red', marginBottom: '10px', height: "auto"}}>
                    {message}
                </div>
            )}
        </div>
    )
}