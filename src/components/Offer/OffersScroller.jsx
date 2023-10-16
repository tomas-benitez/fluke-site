import HScroller from "../elements/HScroller";
import OfferCard from "./OfferCard";
import styles from "@/styles/scss/modules/product/product-page.module.scss";

const OffersScroller = ({ offers, product }) => {
  return (
    <HScroller className={styles["offer-scroller"]}>
      {offers.map((offer, i) => (
        <OfferCard
          key={i}
          offer={offer}
          product={product}
          className={styles["offer-card"]}
        />
      ))}
    </HScroller>
  );
};

export default OffersScroller;
