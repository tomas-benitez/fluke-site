import { useHScrollerControls } from "@/components/elements/HScroller/hooks";
import styles from "@/styles/scss/modules/relevant.module.scss";
import { BlogArticleHit } from "@/lib/strapi/types";
import React from "react";
import HScroller from "@/components/elements/HScroller";
import ArticleCard from "../ArticleCard";
import clsx from "clsx";

type ArticlesHScrollerProps = {
  articles: BlogArticleHit[];
};

const ArticlesHScroller = ({ articles }: ArticlesHScrollerProps) => {
  const { ref, handleNext, handlePrev } = useHScrollerControls();

  return (
    <div className={`${styles["h-scroller-container"]}`}>
      <button
        onClick={handlePrev}
        className={`${styles["prev-btn"]} 2xl:hidden`}
      ></button>
      <HScroller
        ref={ref}
        hideScrollbar
        className={styles["h-scroller"]}
        classNameInner={clsx(styles["h-scroller-inner"])}
      >
        {articles ? (
          articles.map((article, i) => (
            <ArticleCard
              key={i}
              article={article}
              className={
                "mt-4 mb-6 w-4/5 max-w-xl shrink-0 lg:w-2/5 lg:max-w-sm 2xl:w-1/4 2xl:max-w-none 2xl:shrink"
              }
              textAlign="center"
            />
          ))
        ) : (
          <div className="h-[537px]"></div>
        )}
      </HScroller>
      <button
        onClick={handleNext}
        className={`${styles["next-btn"]} 2xl:hidden`}
      ></button>
    </div>
  );
};

export default ArticlesHScroller;
