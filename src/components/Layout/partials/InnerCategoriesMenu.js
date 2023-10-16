import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { useState } from "react";
import navbarStyles from "@/styles/scss/modules/navbar.module.scss";
import MegaMenu from "./CategoriesMenu/MegaMenu";
import Offcanvas from "./CategoriesMenu/Offcanvas";
import { useMatchMedia, breakpoints } from "src/utils/responsive";

const InnerCategoriesMenu = ({ categoriesTree, isRoot = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop] = useMatchMedia(breakpoints["xl"]);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const MenuComponent = isDesktop ? MegaMenu : Offcanvas;

  return categoriesTree.children_categories?.length > 0 ? (
    <div className="flex items-center">
      <Nav.Item className="flex-grow" onClick={handleOpenMenu}>
        <Nav.Link>
          <div className={isRoot ? navbarStyles["dropdown-label"] : undefined}>
            {isRoot ? (
              <span className="lh-1">Productos</span>
            ) : (
              categoriesTree.name
            )}
          </div>
        </Nav.Link>
      </Nav.Item>
      <MenuComponent
        categoriesTree={categoriesTree}
        onHide={handleCloseMenu}
        show={menuOpen}
      />
    </div>
  ) : (
    <Nav.Item>
      <Link href={`/categoria/${categoriesTree.slug}`} passHref>
        <Nav.Link>{categoriesTree.name}</Nav.Link>
      </Link>
    </Nav.Item>
  );
};

export default InnerCategoriesMenu;
