import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./views/login/StartPage.tsx";
import LoginInput from "./components/Login/LoginInput.tsx";
import RegisterInput from "./components/Registration/RegisterInput.tsx";
import MainPage from "./views/main/MainPage.tsx";
import MyAccount from "./components/MyAccount/MyAccount.tsx";
import ProtectedRoute from "./components/ProtectedComponent/ProtectedComponent.tsx";

export default function App() {

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
                    <ProtectedRoute  redirectTo={"/login"}>
                        <MyAccount/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<StartPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

