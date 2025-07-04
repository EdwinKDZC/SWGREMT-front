import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import LandingLayout from "./layout/LandingLayout";
import LoginPage from "./page/auth/LoginPage";
import CarritoCotizacionPage from "./page/dashboard/CarritoCotizacionPage";
import CotizacionDashboardPage from "./page/dashboard/CotizacionDashboardPage";
import HomeDashboardPage from "./page/dashboard/HomeDashboardPage";
import MisBoletasPage from "./page/dashboard/MisBoletasPage";
import MisCotizacionesPage from "./page/dashboard/MisCotizacionesPage";
import OrdenesCompraPage from "./page/dashboard/OrdenesCompraPage";
import ProductDashboardPage from "./page/dashboard/ProductDashboardPage";
import StockDashboardPage from "./page/dashboard/StockDashboardPage";
import SupplierDashboardPage from "./page/dashboard/SupplierDashboardPage";
import AboutPage from "./page/landing/AboutPage";
import CartPage from "./page/landing/CartPage";
import ConfirmationPage from "./page/landing/ConfirmationPage";
import HomePage from "./page/landing/HomePage";
import InfoPage from "./page/landing/InfoPage";
import PaymentPage from "./page/landing/PaymentPage";
import ProductsPage from "./page/landing/ProductsPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="info" element={<InfoPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route index path="login" element={<LoginPage />} />
            {/* <Route path="register" element={<RegisterPage />} /> */}
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomeDashboardPage />} />
            <Route path="products" element={<ProductDashboardPage />} />
            <Route path="stock" element={<StockDashboardPage />} />
            <Route path="supplier" element={<SupplierDashboardPage />} />
            <Route path="cotizacion" element={<CotizacionDashboardPage />} />
            <Route
              path="cotizacion/carrito"
              element={<CarritoCotizacionPage />}
            />
            <Route path="mis-cotizaciones" element={<MisCotizacionesPage />} />
            <Route path="orden-compra" element={<OrdenesCompraPage />} />
            <Route path="mis-boletas" element={<MisBoletasPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
