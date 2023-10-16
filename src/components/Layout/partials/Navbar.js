import ReactNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import styles from "@/styles/scss/modules/navbar.module.scss";
import Link from "next/link";
import { useAppContext } from "src/context";
import InnerCategoriesMenu from "./InnerCategoriesMenu";
import InnerBrandsMenu from "./InnerBrandsMenu";
import Image from "next/image";
import SearchBar from "./SearchBar/SearchBar";

export default function Navbar({ categoriesTree, brands }) {
  const [renderMenu, setRenderMenu] = useState(false);
  const { setContactPopupState } = useAppContext();
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  useEffect(() => {
    setRenderMenu(true);
  }, []);

  return (
    <ReactNavbar
      className={`${styles["navbar"]}`}
      variant="dark"
      expand="xl"
      expanded={navbarExpanded}
      onToggle={() => setNavbarExpanded(!navbarExpanded)}
    >
      <Container className="xl:px-12">
        <Link href="/" passHref>
          <ReactNavbar.Brand className="d-flex shrink-0">
            <Image
              src="/logo/fluke.svg"
              width={160}
              height={47}
              alt="Logo de Fluke"
            />
          </ReactNavbar.Brand>
        </Link>
        <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
        {renderMenu && (
          <ReactNavbar.Offcanvas
            placement="start"
            id="basic-navbar-nav"
            className="xl:ml-8"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              className={`${styles["navbar-offcanvas-body"]} ${styles["offcanvas-body-main"]}`}
            >
              <Nav
                onSelect={() => {
                  setNavbarExpanded(false);
                }}
                className="me-auto"
              >
                <InnerCategoriesMenu
                  categoriesTree={categoriesTree}
                  isRoot={true}
                />
                <InnerBrandsMenu brands={brands} />
                <Nav.Item>
                  <Link href="/blog" passHref>
                    <Nav.Link>Blog</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setNavbarExpanded(false);
                      setContactPopupState({ visible: true });
                    }}
                  >
                    Contacto
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </ReactNavbar.Offcanvas>
        )}
        <SearchBar />
      </Container>
    </ReactNavbar>
  );
}
