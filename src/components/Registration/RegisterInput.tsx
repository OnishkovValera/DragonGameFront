import {FormEvent, useState} from "react"
import {api} from "../../api/requests.ts"
import {useNavigate} from "react-router-dom";
import styles from "./Registration.module.css"
import {useUserStore} from "../../store/globalStore.ts";

export default function RegisterInput(){
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const {setUser} = useUserStore();
    const handleRegister = async () => {
        try {
            const response = await api.post("/register", {
                name: name,
                password: password,
                login: login
            })
            setUser(response.data)
            try{
                const loginResponse = await api.post("/login", {
                    login: login,
                    password: password
                })
                localStorage.setItem("token", loginResponse.data.token.toString())
                navigate("/main")
            }catch (err){
                console.log(err)
            }
        } catch (err) {
            setError(true)
            setMessage("Что то не так с сервером")
            console.log(err)
        }

    }

    function handleSubmit(event:FormEvent) {
        event.preventDefault()
        if (password !== checkPassword) {
            setError(true)
            setMessage("Пароли не совпадают")
            setPassword("")
            setCheckPassword("")
            return
        } else {
            setError(false)
            handleRegister()
        }
    }

    return (
        <div className={styles.div}>
            <h1>Регистрация</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type={"email"} value={login} required placeholder={"Введите почту"}
                       onChange={(e) => setLogin(e.target.value)}/>
                <input className={styles.input} type={"text"} value={name} required minLength={4} placeholder={"Введите ник"}
                       onChange={(e) => setName(e.target.value)}/>
                <input className={styles.input} type={"password"} required minLength={6} value={password} placeholder={"Введите пароль"}
                       onChange={(e) => setPassword(e.target.value)}/>
                <input className={styles.input} type={"password"} required minLength={6} value={checkPassword} placeholder={"Повторите пароль"}
                       onChange={(e) => setCheckPassword(e.target.value)}/>
                <button type={"submit"} className={styles.btn}>Зарегистрироваться</button>
            </form>
            <h1></h1>
            {error && (
                <div style={{color: 'red', marginBottom: '10px'}}>
                    {message}
                </div>
            )}
        </div>

    )



}