import Image from "next/image";
import HScroller from "../elements/HScroller";
import styles from "@/styles/scss/modules/product/image-gallery.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMediaUrl } from "@/lib/strapi/utils/media";

const MediaGallery = ({ mediaList }) => {
  const sliderRef = useRef();
  const [activeSlides, setActiveSlides] = useState([]);

  useEffect(() => {
    let activeSlides = Array(mediaList.length).fill(0);
    activeSlides[0] = 1;
    setActiveSlides(activeSlides);
  }, [mediaList]);

  const handleNext = () => {
    if (
      sliderRef.current.scrollLeft >
      sliderRef.current.scrollWidth - (sliderRef.current.offsetWidth + 10)
    ) {
      sliderRef.current.scrollLeft = 0;
      return;
    }
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth * 0.75;
  };

  const handlePrev = () => {
    if (sliderRef.current.scrollLeft === 0) {
      sliderRef.current.scrollLeft = 100000;
      return;
    }
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth * 0.75;
  };

  const ioCallback = useCallback(
    (entries) => {
      setActiveSlides((activeSlides) => {
        let intersections = [...activeSlides];
        if (intersections.length !== mediaList.length) {
          intersections = Array(mediaList.length).fill(0);
          return intersections;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            intersections[entry.target.dataset.index] = 1;
          else intersections[entry.target.dataset.index] = 0;
        });
        return intersections;
      });
    },
    [mediaList]
  );

  useEffect(() => {
    const io = new IntersectionObserver(ioCallback, {
      root: sliderRef.current,
      rootMargin: "-47%",
      threshold: 0,
    });
    if (sliderRef.current) {
      Array.from(sliderRef.current.children).forEach((slide, i) => {
        slide.dataset.index = i;
        io.observe(slide);
      });
    }

    let ref = Object.assign({}, sliderRef);

    return () => {
      io.disconnect();
      if (ref.current) {
        Array.from(ref.current.children).forEach((slide) => {
          io.unobserve(slide);
        });
      }
    };
  }, [mediaList, ioCallback]);

  return (
    <div className={`${styles["container"]}`}>
      {mediaList.length > 1 && (
        <button
          onClick={handlePrev}
          className={`${styles["prev-btn"]}`}
        ></button>
      )}
      <HScroller
        hideScrollbar
        ref={sliderRef}
        className={`card ${styles["h-scroller"]}`}
      >
        {mediaList.map((media, i) => (
          <HScroller.Slot key={i}>
            <div className={`${styles["image-container"]}`}>
              {media.type === "image" ? (
                <Image
                  src={
                    media.url
                      ? getMediaUrl(media)
                      : "https://via.placeholder.com/600x400"
                  }
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                media.type === "embed" && (
                  <iframe
                    className="h-full w-full"
                    src={media.url}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay"
                  ></iframe>
                )
              )}
            </div>
          </HScroller.Slot>
        ))}
      </HScroller>
      {mediaList.length > 1 && (
        <button
          onClick={handleNext}
          className={`${styles["next-btn"]}`}
        ></button>
      )}
      <div className={`${styles["indicators-container"]}`}>
        {activeSlides.length > 1 && (
          <SliderIndicators
            activeSlides={activeSlides}
            className={`${styles["indicator"]}`}
            activeClassName={`${styles["indicator-active"]}`}
            inactiveClassName={`${styles["indicator-inactive"]}`}
          />
        )}
      </div>
    </div>
  );
};

const SliderIndicators = ({
  activeSlides,
  activeClassName = "",
  inactiveClassName = "",
  className = "",
}) => {
  return (
    <>
      {activeSlides.map((isActive, i) => (
        <div
          key={i}
          className={`${
            isActive ? activeClassName : inactiveClassName
          } ${className}`}
        ></div>
      ))}
    </>
  );
};

export default MediaGallery;
