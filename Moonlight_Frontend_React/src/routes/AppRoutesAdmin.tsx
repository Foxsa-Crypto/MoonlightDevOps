import { Route } from "react-router-dom";
import { ProtectedRoute } from "./authroutes/ProtectedRoute";
import { AdminLayout } from "../components/layout/Admin/AdminLayout";
import { AdminMainPage } from "../pages/Admin/Home/AdminMainPage";
import { UserDashboardPage } from "../pages/Admin/User/UserDashboardPage";
import { UserCreatorPage } from "../pages/Admin/User/UserCreatorPage";
import { UserEditPage } from "../pages/Admin/User/UserEditPage";

export const AppRoutesAdmin = (
    <Route element={
        <ProtectedRoute adminOnly>
            <AdminLayout/>
        </ProtectedRoute>
    }>
        

        {/* rota só para admin */}
        <Route path="/admin" element={
            <ProtectedRoute adminOnly>
                <AdminMainPage />
            </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
            <ProtectedRoute adminOnly>
                <UserDashboardPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/users/create" element={
            <ProtectedRoute adminOnly>
                <UserCreatorPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/users/edit/:id_user" element={
            <ProtectedRoute adminOnly>
                <UserEditPage  />
            </ProtectedRoute>
        }/>
    </Route>
)
