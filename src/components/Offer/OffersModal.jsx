import Image from "next/image";
import { Offcanvas } from "react-bootstrap";
import { useQuery } from "react-query";
import styles from "@/styles/scss/modules/product/product-page.module.scss";
import { useMatchMedia } from "src/utils/responsive";
import OffersTable from "./OffersTable";
import OffersScroller from "./OffersScroller";

const OffersModal = ({ product, show, setShow }) => {
  const { data: productOffers, isLoading: offersAreLoading } = useQuery(
    [`productOffers`, product.id],
    () => fetch(`/api/product-offers/${product.id}`).then((res) => res.json())
  );

  const [isDesktop] = useMatchMedia("(min-width: 1200px)");

  let OffersComponent = isDesktop ? OffersTable : OffersScroller;
  return (
    <Offcanvas
      show={show}
      placement="bottom"
      onHide={() => setShow(false)}
      style={{
        borderTopLeftRadius: "var(--bs-border-radius-lg)",
        borderTopRightRadius: "var(--bs-border-radius-lg)",
        "--bs-offcanvas-height": "85vh",
        "--bs-offcanvas-bg": "#F4F4F4",
      }}
    >
      <Offcanvas.Header closeButton>
        <div className="d-flex align-items-center xl:ml-[6%]">
          <div className="flex-shrink-0">
            <Image
              src={
                product.crm_images[0]
                  ? product.crm_images[0]
                  : "https://via.placeholder.com/600x400"
              }
              width={80}
              height={70}
              alt=""
              objectFit="cover"
              loader={({ src }) => src}
            />
          </div>
          <span className="ms-2 fs-small pe-5 xl:text-2xl">
            {product.title} {product.model_name}
          </span>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
        {offersAreLoading ? (
          <h5 className="text-center">Buscando distribuidores...</h5>
        ) : (
          <>
            <h5 className="text-center xl:hidden">Distribuidores</h5>
            {!!productOffers?.length ? (
              <OffersComponent
                offers={productOffers.filter((offer) => offer.isAvailable)}
                product={product}
              />
            ) : (
              <div className={styles["no-stock"]}>Sin stock</div>
            )}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffersModal;
