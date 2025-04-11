import { BadgeEuro, ShoppingCart, TrendingUp, Wallet } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="w-full flex">
            <main className="p-6 bg-gray-100 min-h-screen w-full">
                <h1 className="text-2xl font-bold mb-4">
                    Dashboard Importadora Móvil
                </h1>

                {/* Estadísticas principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Ingresos</p>
                            <p className="text-xl font-semibold text-green-600">
                                € 32,450.00
                            </p>
                        </div>
                        <Wallet className="w-6 h-6 text-green-600" />
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Gastos</p>
                            <p className="text-xl font-semibold text-purple-600">
                                € 18,930.00
                            </p>
                        </div>
                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Beneficios</p>
                            <p className="text-xl font-semibold text-emerald-600">
                                € 13,520.00
                            </p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Balance</p>
                            <p className="text-xl font-semibold text-red-600">
                                -€ 1,230.00
                            </p>
                        </div>
                        <BadgeEuro className="w-6 h-6 text-red-600" />
                    </div>
                </div>

                {/* Facturas recientes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-bold mb-2">
                            Productos más vendidos
                        </h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between text-sm">
                                <span>Pantalla Samsung A10</span>
                                <span className="font-medium">120 und</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span>Batería iPhone 7</span>
                                <span className="font-medium">98 und</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span>Cable tipo C</span>
                                <span className="font-medium">75 und</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-bold mb-2">
                            Últimas compras
                        </h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between text-sm">
                                <span>Proveedor: MoviParts</span>
                                <span className="font-medium">€ 2,100.00</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span>Proveedor: RepuStore</span>
                                <span className="font-medium">€ 1,780.00</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span>Proveedor: ElectroCell</span>
                                <span className="font-medium">€ 3,250.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
