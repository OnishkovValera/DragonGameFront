import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./views/login/StartPage.tsx";
import LoginInput from "./components/Login/LoginInput.tsx";
import RegisterInput from "./components/Registration/RegisterInput.tsx";
import MainPage from "./views/main/MainPage.tsx";
import MyAccount from "./components/MyAccount/MyAccount.tsx";
import ProtectedRoute from "./components/ProtectedComponent/ProtectedComponent.tsx";
import {api} from "./api/requests.ts";
import {useUserStore} from "./store/globalStore.ts";
import {useEffect} from "react";
import ImportFile from "./components/import/ImportFile.tsx";
import SpecialFunctionsMain from "./components/SpecialFunctions/SpecialFunctionsMain/SpecialFunctionsMain.tsx";

export default function App() {
    const {setUser} = useUserStore()
    const {authorized, setAuthorized} = useUserStore()

    useEffect(() => {
        const getData = async () => {
            await api.get("/user/me").then((res) => {
                setUser(res.data)
                setAuthorized(true)
            }).catch(console.error);
        }

        if (!authorized && localStorage.getItem("token")) {
            getData()
        }
    }, []);




    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterInput/>}/>
                <Route path="/login" element={<LoginInput/>}/>
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/main" element={
                    <ProtectedRoute redirectTo={"/login"}>
                        <MainPage/>
                    </ProtectedRoute>}/>
                <Route path="/user" element={
                    <ProtectedRoute redirectTo={"/login"}>
                        <MyAccount/>
                    </ProtectedRoute>
                }/>
                <Route path="/import" element={
                    <ProtectedRoute redirectTo={"/login"}>
                        <ImportFile></ImportFile>
                    </ProtectedRoute>
                }/>
                <Route path="/special_functions" element={
                    <ProtectedRoute redirectTo={"/login"}>
                        <SpecialFunctionsMain></SpecialFunctionsMain>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<StartPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

