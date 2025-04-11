import { LayoutDashboard, Package, Truck, Users } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarDashboardComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <aside className="w-64 bg-white shadow-md h-screen p-4">
            <h2 className="text-xl font-bold text-blue-600 mb-6">
                Importadora Móvil
            </h2>
            <div className="h-4/5 overflow-y-auto">
                <nav className="space-y-4">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                    </NavLink>
                    <NavLink
                        to="/dashboard/products"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                        <Package className="w-5 h-5 mr-3" /> Productos
                    </NavLink>
                    {/* <NavLink
                        to="/dashboard/quotes"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                        <Users className="w-5 h-5 mr-3" /> Cotizaciones
                    </NavLink> */}
                    <NavLink
                        to="/dashboard/stock"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                        <Truck className="w-5 h-5 mr-3" /> Inventario
                    </NavLink>
                </nav>
            </div>
            {/* Botón de perfil con dropdown */}
            <div className="relative">
                <button
                    className="flex items-center space-x-2 hover:text-gray-300 focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <img
                        src="https://via.placeholder.com/32"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span>Perfil</span>
                    <svg
                        className={`w-5 h-5 transform ${
                            isDropdownOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                        <NavLink
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Mi Perfil
                        </NavLink>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => navigate("/")}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default SidebarDashboardComponent;
