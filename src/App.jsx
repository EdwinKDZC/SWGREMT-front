import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/landing/HomePage";
import AboutPage from "./page/landing/AboutPage";
import ProductsPage from "./page/landing/ProductsPage";
import LandingLayout from "./layout/LandingLayout";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./page/auth/LoginPage";
import DashboardLayout from "./layout/DashboardLayout";
import HomeDashboardPage from "./page/dashboard/HomeDashboardPage";
import ProductDashboardPage from "./page/dashboard/ProductDashboardPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./page/landing/CartPage";
import StockDashboardPage from "./page/dashboard/StockDashboardPage";
import SupplierDashboardPage from "./page/dashboard/SupplierDashboardPage";
import CotizacionDashboardPage from "./page/dashboard/CotizacionDashboardPage";
import CarritoCotizacionPage from "./page/dashboard/CarritoCotizacionPage";
import MisCotizacionesPage from "./page/dashboard/MisCotizacionesPage";

function App() {

    return (
        <CartProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="cart" element={<CartPage />} />
                </Route>
                <Route path="/" element={<AuthLayout />} >
                    <Route index path="login" element={<LoginPage />} />
                    {/* <Route path="register" element={<RegisterPage />} /> */}
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />} >
                    <Route index element={<HomeDashboardPage />} />
                    <Route path="products" element={<ProductDashboardPage />} />
                    <Route path="stock" element={<StockDashboardPage />} />
                    <Route path="supplier" element={<SupplierDashboardPage />} />
                    <Route path="cotizacion" element={<CotizacionDashboardPage />} />
                    <Route path="cotizacion/carrito" element={<CarritoCotizacionPage />} />
                    <Route path="mis-cotizaciones" element={<MisCotizacionesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </CartProvider>
    );
}

export default App;
