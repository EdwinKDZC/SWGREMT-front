import React from 'react'

const Services = () => {
    return (
        <section className="p-10 text-center">
          <h2 className="text-3xl font-bold">Reparación y Mantenimiento de Equipos Moviles y Tablets</h2>
          <p className="mt-4">Ofrecemos servicio técnico especializado...</p>
          <div className="flex justify-around mt-10">
            <div className="text-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdnOzO3cypq1wGfaZBhBhCXPb4J9Qnw5VEsg&s" alt="Reparación" className="mx-auto w-[35rem]"/>
              <h3 className="mt-2 font-bold">Reparación</h3>
            </div>
            <div className="text-center">
              <img src="https://img.freepik.com/vector-premium/manos-reparando-telefono-mantenimiento-telefono-inteligente-centro-movil-telefonos-celulares-arreglar-ingeniero-laboratorio-arreglar-telefono-celular-roto-escritorio-servicio-dispositivos-electronicos-ilustracion-vectorial-ordenada_81894-14858.jpg" alt="Mantenimiento" className="mx-auto w-[31rem]"/>
              <h3 className="mt-2 font-bold">Mantenimiento</h3>
            </div>
            <div className="text-center">
              <img src="https://m.media-amazon.com/images/I/81cUYvmc-dL.jpg" alt="Instalación" className="mx-auto w-[25rem]"/>
              <h3 className="mt-2 font-bold">Instalación</h3>
            </div>
          </div>
        </section>
      );
}

export default Services
