import HScroller from "@/components/elements/HScroller";
import styles from "@/styles/scss/modules/relevant.module.scss";
import { useHScrollerControls } from "@/components/elements/HScroller/hooks";
import { BlogArticle } from "@/lib/strapi/types";
import React from "react";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import Image from "next/image";
import Link from "next/link";
import LinkArrowIcon from "@/components/svg/LinkArrowIcon";
import { NewsArticle } from "@/lib/strapi/blog-articles";

type RelatedArticlesProps = {
  articles: (BlogArticle | NewsArticle)[];
  showCTA?: boolean;
  link?: {
    href: string;
    text: string;
  };
  title?: string;
};

const RelatedArticles = ({
  articles,
  showCTA = true,
  link,
  title = "Artículos relacionados",
}: RelatedArticlesProps) => {
  const { ref, handleNext, handlePrev } = useHScrollerControls();

  const getUrl = (article: BlogArticle | NewsArticle) => {
    if ("url" in article) {
      return article.url;
    }
    return `/blog/article/${article.slug}`;
  };

  return (
    <section className="card">
      <div className="flex border-0 border-b-2 border-solid border-b-slate-200 py-6 px-12">
        <h5 className="m-0 text-2xl font-bold">{title}</h5>
        {link && (
          <Link href={link.href}>
            <a className="ml-auto text-lg font-thin text-slate-600">
              {link.text} <LinkArrowIcon />
            </a>
          </Link>
        )}
      </div>
      <div className={`${styles["h-scroller-container"]}`}>
        <button
          onClick={handlePrev}
          className={`${styles["prev-btn"]} 2xl:hidden`}
        />
        <HScroller
          ref={ref}
          hideScrollbar
          className={styles["h-scroller"]}
          classNameInner={`${styles["h-scroller-inner"]} !gap-0`}
        >
          {articles ? (
            articles.map((a, i) => (
              <div
                key={a.id}
                className="mb-6 mt-4 flex w-4/5 max-w-[400px] flex-shrink-0 flex-grow-0 flex-col px-4 lg:w-3/5 xl:px-12"
              >
                <Link href={getUrl(a)}>
                  <a>
                    <div className="relative h-44">
                      <Image
                        src={getMediaUrl(a.featured_image)}
                        alt={a.featured_image.alternativeText}
                        layout={"fill"}
                        objectFit={"cover"}
                      />
                    </div>
                  </a>
                </Link>
                <Link href={getUrl(a)}>
                  <a className="mt-4 text-lg font-bold leading-tight 2xl:text-2xl">
                    <h3 className="mt-4 text-lg font-bold leading-tight 2xl:text-2xl">
                      {a.title}
                    </h3>
                  </a>
                </Link>
                <p>{a.short_description}</p>
                {showCTA && (
                  <Link href={`/blog/article/${a.slug}`}>
                    <a className="mt-auto text-lg font-thin text-slate-600">
                      Ver más <LinkArrowIcon />
                    </a>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="h-[537px]"></div>
          )}
        </HScroller>
        <button
          onClick={handleNext}
          className={`${styles["next-btn"]} 2xl:hidden`}
        />
      </div>
    </section>
  );
};

export default RelatedArticles;
