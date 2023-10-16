import HScroller from "@/components/elements/HScroller";
import styles from "@/styles/scss/modules/relevant.module.scss";
import ProductCard from "@/components/Product/Card";
import { useRef } from "react";

const Relevant = ({ items, title }) => {
  const hScrollerRef = useRef();

  const handleNext = () => {
    if (
      hScrollerRef.current.scrollLeft >
      hScrollerRef.current.scrollWidth - (hScrollerRef.current.offsetWidth + 10)
    ) {
      hScrollerRef.current.scrollLeft = 0;
      return;
    }
    hScrollerRef.current.scrollLeft += hScrollerRef.current.offsetWidth * 0.75;
  };

  const handlePrev = () => {
    if (hScrollerRef.current.scrollLeft === 0) {
      hScrollerRef.current.scrollLeft = 100000;
      return;
    }
    hScrollerRef.current.scrollLeft -= hScrollerRef.current.offsetWidth * 0.75;
  };

  return (
    <section>
      <div className="container mt-4">
        <h5 className="text-2xl font-bold">{title}</h5>
      </div>
      <div className={`${styles["h-scroller-container"]}`}>
        <button
          onClick={handlePrev}
          className={`${styles["prev-btn"]}`}
        ></button>
        <HScroller
          ref={hScrollerRef}
          hideScrollbar
          desktop="carousel"
          className={styles["h-scroller"]}
          classNameInner={styles["h-scroller-inner"]}
        >
          {items ? (
            items.map((item, i) => (
              <ProductCard key={i} product={item} className={styles["item"]} />
            ))
          ) : (
            <div className="h-[537px]"></div>
          )}
        </HScroller>
        <button
          onClick={handleNext}
          className={`${styles["next-btn"]}`}
        ></button>
      </div>
    </section>
  );
};

export default Relevant;
