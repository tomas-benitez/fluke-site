import InnerCategoriesMenu from "../InnerCategoriesMenu";
import navbarStyles from "@/styles/scss/modules/navbar.module.scss";
import RBSOffcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";

const Offcanvas = ({ show, categoriesTree, onHide }) => {
  return (
    <RBSOffcanvas show={show} placement="start" onHide={onHide}>
      <RBSOffcanvas.Header closeButton>
        <button className={navbarStyles["custom-close-btn"]} onClick={onHide} />
      </RBSOffcanvas.Header>
      <RBSOffcanvas.Body className={navbarStyles["navbar-offcanvas-body"]}>
        <Nav onSelect={onHide}>
          {categoriesTree.children_categories.map(
            (category, i) =>
              category.is_active && (
                <InnerCategoriesMenu key={i} categoriesTree={category} />
              )
          )}
        </Nav>
      </RBSOffcanvas.Body>
    </RBSOffcanvas>
  );
};

export default Offcanvas;
