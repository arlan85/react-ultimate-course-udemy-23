import React, { useEffect, useState } from 'react';

// Hook personalizado para obtener la posición del scroll (Revisado)
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY || window.pageYOffset; // Posición actual del scroll
      const clientHeight = document.documentElement.clientHeight; // Altura visible del viewport

      // Intenta obtener la altura total de forma más robusta
      const bodyHeight = document.body.scrollHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalHeight = Math.max(bodyHeight, docHeight); // Usa la mayor de las dos alturas

      const scrollableHeight = totalHeight - clientHeight; // Altura total que se puede scrollear

      // --- Diagnóstico ---
      console.log(`Scroll Values: scrollY=${scrollY.toFixed(0)}, bodyHeight=${bodyHeight}, docHeight=${docHeight}, clientHeight=${clientHeight.toFixed(0)}, scrollableHeight=${scrollableHeight.toFixed(0)}`);
      // --- Fin Diagnóstico ---

      // Calcula el porcentaje, asegurándose de que scrollableHeight sea positivo
      const percentage = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;

      // Limita el porcentaje entre 0 y 100
      const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

      console.log(`Calculated Percentage: ${clampedPercentage.toFixed(2)}%`); // Muestra el % calculado

      setScrollPosition(clampedPercentage);
    };

    // Añade el listener
    window.addEventListener('scroll', updatePosition, { passive: true }); // passive: true para optimización

    // Llama una vez al montar para establecer el estado inicial
    updatePosition();

    // Limpia el listener al desmontar
    return () => window.removeEventListener('scroll', updatePosition);
  }, []); // El array vacío asegura que el efecto se ejecute solo al montar y desmontar

  return scrollPosition;
};

// --- Componente 1: Barra de Progreso Superior ---
const TopProgressBar = () => {
  const scrollPercentage = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 w-full h-2 z-50 bg-gray-200">
      <div
        className="h-full bg-blue-500 transition-transform duration-100 ease-linear origin-left" // Usar transform para posible mejor rendimiento
        style={{ transform: `scaleX(${scrollPercentage / 100})` }} // Cambiado width a transform: scaleX
      />
    </div>
  );
};


// --- Componente 2: Botón de Volver Arriba con Progreso Circular ---
const ScrollToTopProgressButton = () => {
  const scrollPercentage = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Usar el valor de scroll directo en lugar del porcentaje para la visibilidad
      if ((window.scrollY || window.pageYOffset) > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Añadir un listener separado para la visibilidad por si acaso
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Comprobar estado inicial

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Estilo cónico para el progreso
  // Usar --scrollPercentage como variable CSS para asegurar que el estilo se actualiza
  const buttonStyle = {
      "--scrollPercentage": `${scrollPercentage}%`
  };

  return (
    <button
      onClick={scrollToTop}
      // Añadir estilo en línea para la variable CSS
      style={buttonStyle}
      // Clases de Tailwind: Asegúrate de que el fondo cónico use la variable CSS
      className={`fixed bottom-5 right-5 w-12 h-12 rounded-full shadow-lg transition-opacity duration-300 ease-in-out flex items-center justify-center z-[60]
                  bg-[conic-gradient(#3b82f6_var(--scrollPercentage,0%),#e5e7eb_var(--scrollPercentage,0%))]
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                 `}
      aria-label="Volver arriba"
    >
      {/* Círculo interior */}
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        {/* Icono */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
};


// --- Componente Principal de la Aplicación ---
// (Sin cambios significativos respecto a la versión anterior,
// simplemente asegúrate de que el contenido sea suficientemente largo)
function App() {
  return (
    <div className="font-sans bg-gray-100 text-gray-800 min-h-screen relative">
      <TopProgressBar />

      <header className="bg-white shadow p-6 sticky top-0 z-30">
        <h1 className="text-3xl font-bold text-center text-blue-600 mt-2">Demostración de Progreso de Scroll</h1>
      </header>

      <main className="container mx-auto p-8 pt-12">
        <h2 className="text-2xl font-semibold mb-4">Contenido de la Página</h2>
        <p className="mb-4">
           Haz scroll y revisa la consola del navegador (F12) para ver los valores de cálculo del scroll.
           La barra superior debería reflejar el progreso usando `transform: scaleX`.
           El botón inferior derecho usa un gradiente cónico y debería aparecer después de 300px de scroll.
        </p>
        {[...Array(50)].map((_, i) => (
          <p key={i} className="mb-6 border-l-4 border-gray-300 pl-4 py-2 bg-white rounded shadow-sm">
            Sección de contenido número {i + 1}. Este es un texto de relleno para asegurar que la página tenga suficiente
            altura como para necesitar hacer scroll. Lorem ipsum dolor sit amet...
          </p>
        ))}
        <p className="mt-8 text-center text-gray-500">Fin del contenido.</p>
      </main>

      <ScrollToTopProgressButton />

      <footer className="bg-gray-800 text-white p-4 text-center mt-10">
        <p>&copy; 2025 Ejemplo de Scroll</p>
      </footer>
    </div>
  );
}

export default App;
