import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import navbarStyles from "@/styles/scss/modules/navbar.module.scss";
import { breakpoints, useMatchMedia } from "src/utils/responsive";
import Offcanvas from "./BrandsMenu/Offcanvas";
import MegaMenu from "./BrandsMenu/MegaMenu";

const InnerBrandsMenu = ({ brands }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop] = useMatchMedia(breakpoints["xl"]);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const MenuComponent = isDesktop ? MegaMenu : Offcanvas;

  return (
    <div className="flex items-center">
      <Nav.Item className="flex-grow" onClick={handleOpenMenu}>
        <Nav.Link>
          <div className={navbarStyles["dropdown-label"]}>
            <span className="lh-1">Marcas</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <MenuComponent brands={brands} onHide={handleCloseMenu} show={menuOpen} />
    </div>
  );
};

export default InnerBrandsMenu;
