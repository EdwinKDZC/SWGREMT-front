import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  FilePlus,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarDashboardComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const gestiones = [
    { to: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { to: "/dashboard/products", icon: <Package className="w-5 h-5" />, label: "Productos" },
    { to: "/dashboard/stock", icon: <Truck className="w-5 h-5" />, label: "Inventario" },
    { to: "/dashboard/supplier", icon: <FileText className="w-5 h-5" />, label: "Proveedor" },
    { to: "/dashboard/cotizacion", icon: <FileText className="w-5 h-5" />, label: "Cotización" },
  ];

  const documentos = [
    { to: "/dashboard/mis-cotizaciones", icon: <FileText className="w-5 h-5" />, label: "Mis Cotizaciones" },
    { to: "/dashboard/orden-compra", icon: <FilePlus className="w-5 h-5" />, label: "Orden de Compra" },
    { to: "/dashboard/mis-boletas", icon: <FileText className="w-5 h-5" />, label: "Mis Boletas" },
    // { to: "/dashboard/mis-facturas", icon: <FileText className="w-5 h-5" />, label: "Mis Facturas" },
  ];

  return (
    <aside
      className={`bg-white shadow-md h-screen transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } p-4 flex flex-col justify-between`}
    >
      {/* Encabezado */}
      <div>
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <NavLink to="/" className="text-xl font-bold text-blue-600">Importadora Móvil</NavLink>
          )}
          <button onClick={toggleCollapse} className="text-gray-500 hover:text-blue-600">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navegación */}
        <nav className="space-y-6">
          {/* Gestiones */}
          <div>
            <div className="flex items-center mb-2 space-x-2 text-gray-500 uppercase text-xs font-semibold">
              <LayoutDashboard className="w-4 h-4" />
              {!isCollapsed && <span>Gestiones</span>}
            </div>
            <div className="space-y-1">
              {gestiones.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Documentos */}
          <div>
            <div className="flex items-center mb-2 space-x-2 text-gray-500 uppercase text-xs font-semibold">
              <FileText className="w-4 h-4" />
              {!isCollapsed && <span>Documentos</span>}
            </div>
            <div className="space-y-1">
              {documentos.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Perfil */}
      <div className="relative">
        <button
          className="flex items-center w-full space-x-2 hover:text-gray-600 focus:outline-none"
          onClick={toggleDropdown}
        >
          <img
            src="https://via.placeholder.com/32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          {!isCollapsed && <span>Perfil</span>}
          {!isCollapsed && (
            <ChevronDownIcon rotated={isDropdownOpen} />
          )}
        </button>

        {isDropdownOpen && !isCollapsed && (
          <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
            <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">
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

// Chevron abajo con rotación
const ChevronDownIcon = ({ rotated }) => (
  <svg
    className={`w-4 h-4 transform transition-transform ${
      rotated ? "rotate-180" : ""
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default SidebarDashboardComponent;
