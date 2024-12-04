import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'; // Ícono de carrito de compras
import { useCart } from '../../context/CartContext';

const NavbarComponent = () => {

  const { cartItems } = useCart();

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="text-white">SERVICELL-KDZC</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">
                Inicio
              </Link>
              <Link to="/products" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">
                Productos
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-white">
              <FaShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/login" className="hover:bg-blue-600 px-4 py-2 rounded-md text-lg font-medium">
              Acceder
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavbarComponent
