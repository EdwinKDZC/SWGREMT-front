import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // Función para manejar el submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // Validación simple
        if (!email || !password) {
            setError('Por favor, complete todos los campos.')
            return
        }

        // Validación de formato de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!emailRegex.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido.')
            return
        }

        // Simulación de verificación de credenciales
        if (email === '201010611@urp.edu.pe' && password === '123456') {
            setError('') // Limpiar cualquier mensaje de error
            navigate('/dashboard') // Redirige al dashboard
        } else {
            setError('Correo o contraseña incorrectos.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo de correo electrónico */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="ejemplo@correo.com"
                        />
                    </div>
                    {/* Campo de contraseña */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    {/* Mostrar error si existe */}
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    {/* Botón de inicio de sesión */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                    {/* Enlace para recuperar contraseña */}
                    <div className="text-center">
                        <a href="/recuperar" className="text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
