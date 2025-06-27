import { useEffect, useState } from 'react';
import { Wallet, ShoppingCart, TrendingUp, BadgeEuro } from "lucide-react";

export default function Dashboard() {
  const [topSelling, setTopSelling] = useState([]);
  const [recentStock, setRecentStock] = useState([]);
  const [earnings, setEarnings] = useState({ ingresos: 0, ganancia: 0 });

  useEffect(() => {
    fetch('/api/dashboard/top-selling').then(r => r.json()).then(setTopSelling);
    fetch('/api/dashboard/recent-stock').then(r => r.json()).then(setRecentStock);
    fetch('/api/dashboard/monthly-earnings').then(r => r.json()).then(setEarnings);
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard Importadora Móvil</h1>
        
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Ingresos" value={`€ ${earnings.ingresos.toFixed(2)}`} icon={<Wallet className="w-6 h-6 text-green-600" />} />
        <Card title="Beneficios" value={`€ ${earnings.ganancia.toFixed(2)}`} icon={<TrendingUp className="w-6 h-6 text-emerald-600" />} />
        <Card title="Balance" value={`€ ${(earnings.ingresos - earnings.ganancia).toFixed(2)}`} icon={<BadgeEuro className="w-6 h-6 text-red-600" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box title="Productos más vendidos">
          {topSelling.length === 0 
            ? <p className="text-sm text-gray-500">Sin datos</p> 
            : topSelling.map(p => (
              <div key={p._id} className="flex justify-between text-sm">
                <span>{p.marca} {p._id}</span>
                <span className="font-medium">{p.totalQty} und</span>
              </div>
            ))
          }
        </Box>

        <Box title="Stock agregado recientemente">
          {recentStock.length === 0 
            ? <p className="text-sm text-gray-500">Sin datos</p> 
            : recentStock.map(order => (
              <div key={order._id} className="text-sm mb-2 border-b pb-2">
                <p><strong>Proveedor:</strong> {order.companyName} – {new Date(order.fechaOrden).toLocaleDateString("es-PE")}</p>
                {order.productos.map((prod, i) =>
                  <div key={i} className="ml-4 flex justify-between">
                    <span>{prod.marca} {prod.modelo}</span>
                    <span>{prod.cantidad} und</span>
                  </div>
                )}
              </div>
            ))
          }
        </Box>
      </div>
    </main>
  );
}

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
    {icon}
  </div>
);

const Box = ({ title, children }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <div className="space-y-2 max-h-60 overflow-y-auto">{children}</div>
  </div>
);
