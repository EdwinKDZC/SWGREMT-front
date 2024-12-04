import React from 'react'

const Brands = () => {
    return (
        <section className="p-10 text-center">
          <h2 className="text-3xl font-bold">Trabajamos con estos equipos en sus diferentes marcas</h2>
          <div className="flex justify-around mt-10">
            <img src="https://img.global.news.samsung.com/mx/wp-content/uploads/2018/10/Samsung_Wordmark_BLUE.jpg" alt="Whirlpool" className="h-16"/>
            <img src="https://www.brandemia.org/wp-content/uploads/2011/10/logo_2001_2003.jpg" alt="Daewoo" className="h-16"/>
            <img src="https://static.vecteezy.com/system/resources/previews/020/927/137/non_2x/motorola-brand-logo-phone-symbol-with-name-white-design-usa-mobile-illustration-with-blue-background-free-vector.jpg" alt="Indurama" className="h-16"/>
          </div>
        </section>
      );
}

export default Brands
