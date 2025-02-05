import styles from "./MyAccount.module.css"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {User} from "../../api/types/User.ts";
import {useUserStore} from "../../store/globalStore.ts";
import {api} from "../../api/requests.ts";
import {AdminRequest} from "../../api/types/AdminRequest.ts";
import RequestComponent from "./RequestComponent/RequestComponent.tsx";

export default function MyAccount() {

    const {user, setUser} = useUserStore();

    const [userRequestStatus, setUserRequestStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
    const [newUser, setNewUser] = useState<User>(structuredClone(user))
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [requests, setRequests] = useState<AdminRequest[]>([]);

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const name = e.target.name;
        setNewUser({...newUser, [name]: value})
    }

    function getAdminPermissions(){
        api.post("/request", {
        }).then(res => {
            console.log(res);
        })
    }

    const getAdminRequest = async () => {
        try {
            const response = await api.get("request/me")
            setUserRequestStatus(response.data.status)
            console.log(response)
        }catch (error){
            console.log(error)
        }

    }
    useEffect(() => {
        if (user?.role === "ADMIN"){
            getRequest()
        }
        getAdminRequest();
    }, [])

    function getRequest(){
        api.get("/request").then(res =>{
            setRequests(res.data)
        })
    }

    function setReject(id: number){
        try {
            api.put(`/request/${id}`, null, {
                params: {
                    status: "REJECTED"
                }
            }).then(
                getRequest
            )
        }
        catch(err){
            console.log(err)
        }
    }
    function setApproved(id: number){
        api.put(`request/${id}`, null, {
            params:{
                status: "APPROVED"
            }
        }).then(
            getRequest
        )
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
                            <input type={"text"} name={"name"} minLength={6} value={newUser.name || ""}
                                   onChange={handleChange}/>
                        </label>
                        <label>
                            Email:
                            <input type={"email"} name={"email"} minLength={6} value={newUser.login || ""}
                                   onChange={handleChange}/>
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
                    <button className={styles.Button} onClick={() => {
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
            )}
            {user?.role === "USER" ? (
                <div style ={{display:"flex", justifyContent:"center"}}>
                    {userRequestStatus == null ? (
                        <button className={styles.Button} onClick={getAdminPermissions}>Запросить права администратора</button>
                    ):(
                        <p>Статус заявки: {userRequestStatus}</p>
                    )
                    }
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr className={styles.headerrow}>
                            <th>Имя</th>
                            <th>Логин</th>
                            <th>Статус</th>
                            <th>Дата</th>
                            <th>Обработал</th>
                            <th>Дата обработки</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            requests.map((request: AdminRequest) => <RequestComponent adminRequest={request} onApprove={setApproved} onReject={setReject}/>)
                        }
                        </tbody>
                    </table>
                </div>
            )
            }
        </>
    )

}