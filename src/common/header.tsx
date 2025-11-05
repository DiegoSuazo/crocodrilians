import { useState } from "react";
import { Menu, Search, ShoppingBasket, User, X, LogOut } from "lucide-react";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { LoginModal } from "../components/auth/LoginModal";
import { RegisterModal } from "../components/auth/RegisterModal";
import { CartModal } from "../components/cart/CartModal";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const totalItems = getTotalItems();

  return (
    <>
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
          <button onClick={() => navigate('/')}>
            <img className="h-20 w-20 md: h-30 w-30 hover:opacity-80 transition-opacity" src={logo} alt="Logo" />
          </button>

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
                <button
                  onClick={() => {
                    navigate('/category/booster-box');
                    setIsOpen(false);
                  }}
                  className="block no-underline py-2 px-4 text-texting hover:text-primary text-left w-full"
                >
                  Booster Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/category/elite-trainer-box');
                    setIsOpen(false);
                  }}
                  className="block no-underline py-2 px-4 text-texting hover:text-primary text-left w-full"
                >
                  Elite Trainer Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/category/preventa');
                    setIsOpen(false);
                  }}
                  className="block no-underline py-2 px-4 text-texting hover:text-primary text-left w-full"
                >
                  Preventa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/info');
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-texting hover:text-primary text-left w-full"
                >
                  Información y políticas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/contact');
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-texting hover:text-primary text-left w-full"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="flex flex-row xl:space-x-6 xl:items-center relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search color="#0d0d0d" />
            </button>
            
            <div className="relative">
              <button
                onClick={handleUserClick}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User color="#0d0d0d" />
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Hola, {user?.firstName}
                  </div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mis Pedidos
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowCartModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingBasket color="#0d0d0d" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div
          className={`${
            isSearchOpen ? "block" : "hidden"
          } flex flex-row items-center mt-[12%] sm:mt-[4%] px-[50%] justify-center m-auto`}
        >
          <form onSubmit={handleSearch} className={`m-auto  flex items-center justify-center`}>
            <div className="relative ">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-auto sm:w-150 p-2 border border-gray-300 rounded-lg text-texting focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 pl-3
                      flex items-center
                      hover:text-primary cursor-pointer"
              >
                <Search color="#0d0d0d" size={20} />
              </button>
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

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        onCheckout={() => {
          setShowCartModal(false);
          // TODO: Navigate to checkout page
        }}
      />
    </>
  );
}
