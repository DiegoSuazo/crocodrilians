import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-[6%] w-full px-[10%]">
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Logo y descripción */}
          <div>
            <h2 className="text-3xl font-bold text-white">Crocodilians</h2>
            <p className="mt-2 text-xl">
              Tu tienda de cartas de Pokémon en línea.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-2xl font-bold text-white">Nosotros</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-xl hover:text-white">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="text-xl hover:text-white">
                  Políticas de Devolución
                </a>
              </li>
              <li>
                <a href="#" className="text-xl hover:text-white">
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-xl hover:text-white">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-2xl font-bold text-white">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className="hover:text-white">
                <Instagram size={40} />
              </a>
              <a href="#" className="hover:text-white">
                <Facebook size={40} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-14"></div>

        {/* Derechos de autor */}
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Partner Punch. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
