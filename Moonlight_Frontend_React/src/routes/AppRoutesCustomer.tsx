import { Route } from "react-router-dom";
import { CustomerLayout } from "../components/layout/Customer/CustomerLayout";
import MainPage from "../pages/Customer/Home/MainPage";
import { ProtectedRoute } from "./authroutes/ProtectedRoute";
import ProfilePage from "../pages/Customer/User/Profile/ProfilePage";
import LoginPage from "../pages/Customer/Auth/Login/LoginPage";
import RegisterPage from "../pages/Customer/Auth/Register/RegisterPage";
import GamePage from "../pages/Customer/Game/GamePage";

export const AppRoutesCustomer = ( 
    <Route element={<CustomerLayout/>}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/games/:id_game" element={<GamePage />} />

        {/* rotas protegidas */}
        <Route path="/profile" element={
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        } />

        {/* <Route path="/orders" element={
            <ProtectedRoute>
                <OrdersPage />
            </ProtectedRoute>
        } /> */}
    </Route>
)
