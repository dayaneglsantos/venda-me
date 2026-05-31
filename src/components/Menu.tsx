import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  FiHome,
  FiList,
  FiLogIn,
  FiLogOut,
  FiPlus,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FormField } from "./FormField";
import Dropdown, {
  DropdownButton,
  DropdownContent,
  DropdownHeader,
  DropdownItem,
} from "./Dropdown";

export default function Menu() {
  const { logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-orange-200 text-gray-700 p-2 px-6 md:px-8 relative">
      <div className="flex items-center justify-between w-full">
        <img src="/logo.png" alt="Logo" className="h-8 md:h-12 w-auto mr-4" />

        {user ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary p-1 focus:outline-none z-50 cursor-pointer"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        ) : (
          <Button
            variant="outline"
            endIcon={<FiLogIn />}
            onClick={() => {
              window.location.href = "/login";
            }}
            size="sm"
            className="md:hidden"
          >
            Login
          </Button>
        )}

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-4 items-center">
            {user ? (
              <>
                <li>
                  <Button variant="outline" startIcon={<FiHome />} size="sm">
                    Início
                  </Button>
                </li>
                <li>
                  <Button variant="outline" startIcon={<FiList />} size="sm">
                    Meus anúncios
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    startIcon={<FiPlus />}
                    onClick={() => navigate("/anunciar")}
                    size="sm"
                  >
                    Novo anúncio
                  </Button>
                </li>
                <li>
                  <Dropdown align="right">
                    <DropdownButton>
                      <div className="flex items-center justify-center p-2 rounded-full hover:bg-orange-300 transition-colors duration-200 focus:outline-none">
                        <FiUser className="text-primary-dark" size={24} />
                      </div>
                    </DropdownButton>

                    <DropdownContent>
                      <DropdownHeader>
                        <p className="font-semibold text-gray-800 truncate text-center">
                          {user?.name.split(" ").slice(0, 2).join(" ")}
                        </p>
                      </DropdownHeader>

                      <DropdownItem onClick={() => {}}>
                        <FiSettings size={16} />
                        Configurações
                      </DropdownItem>

                      <DropdownItem onClick={handleLogout} variant="danger">
                        <FiLogOut size={16} />
                        Sair da conta
                      </DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </li>
              </>
            ) : (
              <li>
                <Button
                  variant="outline"
                  endIcon={<FiLogIn />}
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  size="sm"
                >
                  Login
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-orange-100 shadow-lg p-4 flex flex-col gap-4 z-40 border-t border-orange-300">
          <ul className="flex flex-col gap-3">
            {user && (
              <>
                <li>
                  <Button variant="outline" className="w-full justify-between">
                    Início
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-between">
                    Meus anúncios
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/anunciar");
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-between"
                  >
                    Novo anúncio
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    endIcon={<FiLogOut />}
                    onClick={handleLogout}
                    className="w-full justify-between text-red-600 border-red-500"
                  >
                    Sair
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
