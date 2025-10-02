import { useState } from "react";
import { Menu, Search, ShoppingBasket, User, X } from "lucide-react";
import logo from "../assets/logo.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full h-32 fixed top-0 z-50">
      <div
        className={`${
          isSearchOpen ? "hidden" : "block"
        } container mx-auto my-auto px-4 py-3 flex items-center justify-between`}
      >
        <button
          className="xl:hidden p-2  bg-white rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Logo */}
        <img className="h-20 w-20 md: h-30 w-30" src={logo} />

        {/* Menu Button - Mobile */}

        {/* Navigation Links */}
        <nav
          className={`absolute xl:static top-full left-0 w-full xl:w-auto bg-white xl:bg-transparent shadow-xl xl:shadow-none xl:flex xl:items-center xl:space-x-6 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } xl:block`}
        >
          <ul
            className={` flex flex-col font-semibold text-xl xl:flex-row xl:space-x-6 p-4 xl:p-0 xl:text-xl`}
          >
            <li>
              <a
                href="#"
                className="block no-underline py-2 px-4 text-texting hover:text-primary"
              >
                Booster Box
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block no-underline py-2 px-4 text-texting hover:text-primary"
              >
                Elite Trainer Box
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block no-underline py-2 px-4 text-texting hover:text-primary"
              >
                Preventa
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-texting hover:text-primary"
              >
                Información y políticas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-texting hover:text-primary"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row xl:space-x-6 xl:items-center">
          <Search
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            color="#0d0d0d"
          />
          <User color="#0d0d0d" />
          <ShoppingBasket color="#0d0d0d" />
        </div>
      </div>
      <div
        className={`${
          isSearchOpen ? "block" : "hidden"
        } flex flex-row items-center mt-[12%] sm:mt-[4%] px-[50%] justify-center m-auto`}
      >
        <form className={`m-auto  flex items-center justify-center`}>
          <div className="relative ">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-auto sm:w-150 p-2 border border-gray-300 rounded-lg text-texting"
            />
            <div
              className="absolute inset-y-0 right-2 pl-3 
                    flex items-center 
                    pointer-events-none"
            >
              <Search color="#0d0d0d" size={20} />
            </div>
          </div>
        </form>
        <div>
          <X
            color="#0d0d0d"
            size={20}
            className="mr-auto cursor-pointer"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
        </div>
      </div>
    </header>
  );
}
