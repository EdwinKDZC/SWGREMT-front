import React from 'react'

const Characteristics = () => {
    return (
        <section className="bg-blue-500 text-white p-10">
          <h2 className="text-3xl font-bold text-center">Nuestras Características</h2>
          <div className="flex justify-around mt-10">
            <div className="text-center">
              <img src="https://img.freepik.com/vector-premium/dibujos-animados-ilustracion-vectorial-reparacion-telefonos_969863-356258.jpg?semt=ais_hybrid" alt="Profesionales" className="mx-auto"/>
              <h3 className="mt-2 font-bold">Técnicos Profesionales</h3>
            </div>
            <div className="text-center">
              <img src="https://previews.123rf.com/images/kongvector/kongvector1801/kongvector180101840/93001365-con-dinero-de-la-etiqueta-de-precio-de-dibujos-animados-ilustraci%C3%B3n-vectorial-de-dibujos-animados.jpg" alt="Económicos" className="mx-auto w-[40rem]"/>
              <h3 className="mt-2 font-bold">Precios Económicos</h3>
            </div>
          </div>
        </section>
      );
}

export default Characteristics
