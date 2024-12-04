import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavbarDashboardComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-blue-800 text-white px-6 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Links de navegación */}
                <div className="flex space-x-6">
                    <Link to="/dashboard" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/dashboard/products" className="hover:text-gray-300">
                        Products
                    </Link>
                    <Link to="/dashboard/quotes" className="hover:text-gray-300">
                        Cotizaciones
                    </Link>
                    <Link to="/dashboard/stock" className="hover:text-gray-300">
                        Stock
                    </Link>
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
                            className={`w-5 h-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Mi Perfil
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => (navigate("/"))}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarDashboardComponent
