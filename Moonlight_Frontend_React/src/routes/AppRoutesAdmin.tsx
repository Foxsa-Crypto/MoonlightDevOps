import { Route } from "react-router-dom";
import { ProtectedRoute } from "./authroutes/ProtectedRoute";
import { AdminLayout } from "../components/layout/Admin/AdminLayout";
import { AdminMainPage } from "../pages/Admin/Home/AdminMainPage";
import { UserDashboardPage } from "../pages/Admin/User/UserDashboardPage";
import { UserCreatorPage } from "../pages/Admin/User/UserCreatorPage";
import { UserEditPage } from "../pages/Admin/User/UserEditPage";
import { GameEditPage } from "../pages/Admin/Game/GameEditPage";
import { GameCreatorPage } from "../pages/Admin/Game/GameCreatorPage";
import { GameDashboardPage } from "../pages/Admin/Game/GameDashboardPage";
import { CategoryDashboardPage } from "../pages/Admin/Category/CategoryDashboardPage";
import { CategoryCreatorPage } from "../pages/Admin/Category/CategoryCreatorPage";
import { CategoryEditPage } from "../pages/Admin/Category/CategoryEditPage";

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
                <UserEditPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/games" element={
            <ProtectedRoute adminOnly>
                <GameDashboardPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/games/create" element={
            <ProtectedRoute adminOnly>
                <GameCreatorPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/games/edit/:id_game" element={
            <ProtectedRoute adminOnly>
                <GameEditPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/categories" element={
            <ProtectedRoute adminOnly>
                <CategoryDashboardPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/categories/create" element={
            <ProtectedRoute adminOnly>
                <CategoryCreatorPage />
            </ProtectedRoute>
        }/>
        <Route path="/admin/categories/edit/:id_category" element={
            <ProtectedRoute adminOnly>
                <CategoryEditPage />
            </ProtectedRoute>
        }/>
    </Route>
)
