import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "react-bootstrap/Nav";
import RBSOffcanvas from "react-bootstrap/Offcanvas";
import navbarStyles from "@/styles/scss/modules/navbar.module.scss";
import { getMediaUrl } from "@/lib/strapi/utils/media";

const Offcanvas = ({ brands, show, onHide }) => {
  return (
    <RBSOffcanvas
      show={show}
      placement="start"
      onHide={onHide}
      className="bg-gray-100"
    >
      <RBSOffcanvas.Header closeButton>
        <button className={navbarStyles["custom-close-btn"]} onClick={onHide} />
      </RBSOffcanvas.Header>
      <RBSOffcanvas.Body>
        <Nav onSelect={onHide}>
          {brands.map((brand) => (
            <Nav.Item key={brand.id} className="px-12 pb-6">
              <Link href={`/marca/${brand.slug}`} passHref>
                <Nav.Link>
                  <div className="flex h-20 justify-center">
                    <Image
                      src={getMediaUrl(brand.logo)}
                      width={Math.min(brand.logo.width, 200)}
                      height={brand.logo.height}
                      alt={`Logo de la marca ${brand.name}`}
                      objectFit="contain"
                    />
                  </div>
                </Nav.Link>
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </RBSOffcanvas.Body>
    </RBSOffcanvas>
  );
};

export default Offcanvas;
