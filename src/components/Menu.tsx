import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  FiHome,
  FiList,
  FiLogIn,
  FiLogOut,
  FiPlus,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdown, {
  DropdownButton,
  DropdownContent,
  DropdownHeader,
  DropdownItem,
} from "./Dropdown";
import Avatar from "./Avatar";
import Modal from "./Modal";
import UserForm from "./UserForm";

interface NavLinkButtonProps {
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function NavLinkButton({
  onClick,
  startIcon,
  endIcon,
  children,
  className,
}: NavLinkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 text-gray-700 font-medium hover:text-primary-dark transition-colors duration-200 cursor-pointer ${className || ""}`}
    >
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  );
}

export default function Menu() {
  const { logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-orange-200 text-gray-700 p-2 px-6 md:px-8 relative">
      <div className="flex items-center justify-between w-full">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 md:h-12 w-auto mr-4 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {user ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary p-1 focus:outline-none z-50 cursor-pointer"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        ) : (
          <NavLinkButton
            endIcon={<FiLogIn />}
            onClick={() => {
              window.location.href = "/login";
            }}
            className="md:hidden"
          >
            Login
          </NavLinkButton>
        )}

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-4 items-center">
            {user ? (
              <>
                <li>
                  <NavLinkButton startIcon={<FiHome />} onClick={() => navigate("/")}>
                    Início
                  </NavLinkButton>
                </li>
                <li>
                  <NavLinkButton
                    startIcon={<FiList />}
                    onClick={() => navigate("/meus-anuncios")}
                  >
                    Meus anúncios
                  </NavLinkButton>
                </li>
                <li>
                  <Button
                    variant="primary"
                    startIcon={<FiPlus />}
                    onClick={() => navigate("/anunciar")}
                    size="sm"
                  >
                    Novo anúncio
                  </Button>
                </li>
                <li>
                  <Dropdown align="right">
                    <DropdownButton className="rounded-full hover:ring-1 hover:ring-primary transition-all duration-200 focus:outline-none">
                      <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                    </DropdownButton>

                    <DropdownContent>
                      <DropdownHeader>
                        <p className="font-semibold text-gray-800 truncate text-center">
                          {user?.name.split(" ").slice(0, 2).join(" ")}
                        </p>
                      </DropdownHeader>

                      <DropdownItem onClick={() => setIsSettingsOpen(true)}>
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
                <NavLinkButton
                  endIcon={<FiLogIn />}
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login
                </NavLinkButton>
              </li>
            )}
          </ul>
        </div>
      </div>

      {user && (
        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          title="Editar dados"
        >
          <UserForm
            mode="edit"
            user={user}
            onSuccess={() => setIsSettingsOpen(false)}
          />
        </Modal>
      )}

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-orange-100 shadow-lg p-4 flex flex-col gap-4 z-40 border-t border-orange-300">
          <ul className="flex flex-col gap-3">
            {user && (
              <>
                <li>
                  <NavLinkButton
                    startIcon={<FiHome />}
                    onClick={() => {
                      navigate("/");
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Início
                  </NavLinkButton>
                </li>
                <li>
                  <NavLinkButton
                    startIcon={<FiList />}
                    onClick={() => {
                      navigate("/meus-anuncios");
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Meus anúncios
                  </NavLinkButton>
                </li>
                <li>
                  <Button
                    variant="primary"
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
                  <NavLinkButton
                    startIcon={<FiSettings />}
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Configurações
                  </NavLinkButton>
                </li>
                <li>
                  <NavLinkButton
                    endIcon={<FiLogOut />}
                    onClick={handleLogout}
                    className="w-full text-red-600"
                  >
                    Sair
                  </NavLinkButton>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
