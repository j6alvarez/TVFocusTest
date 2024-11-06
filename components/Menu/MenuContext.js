import { createContext, useContext, useMemo, useState } from "react";

const MenuContext = createContext({
  isOpen: false,
  toggleMenu: () => {},
});

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => {
    return { isOpen, toggleMenu: setIsOpen };
  }, [isOpen, setIsOpen]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
