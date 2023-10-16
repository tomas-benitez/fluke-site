import { useMemo, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import styles from "@/styles/scss/modules/product-list.module.scss";
import { BlogArticleHit, BlogCategoryTreeNode } from "@/lib/strapi/types";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { getTags } from "@/lib/strapi/utils/blog-articles";
import ArticleCard from "../ArticleCard";

type ArticlesListProps = {
  articles: BlogArticleHit[];
  categoriesTree: BlogCategoryTreeNode;
};

const ArticlesList = ({ articles, categoriesTree }: ArticlesListProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const tags = useMemo(() => getTags(articles), [articles]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredArticles = useMemo(
    () =>
      selectedTags.length > 0
        ? articles.filter((article) =>
            selectedTags.every((tag) => article.tags?.includes(tag))
          )
        : [...articles],
    [selectedTags, articles]
  );

  const handleTagSelection = (clickedTag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(clickedTag)) {
        return prev.filter((tag) => tag !== clickedTag);
      } else {
        return [...prev, clickedTag];
      }
    });
  };

  return (
    <section id="categories-section" className="position-relative pt-6">
      <div
        className={clsx(
          "container mt-4 mb-3 grid",
          categoriesTree.children_categories.length === 0 &&
            tags.length === 0 &&
            "!grid-cols-1"
        )}
      >
        {(categoriesTree.children_categories.length > 0 || tags.length > 0) && (
          <Offcanvas
            show={showFilters}
            responsive="xl"
            placement="bottom"
            onHide={() => setShowFilters(false)}
            className={`${styles["product-list-offcanvas-filters"]} g-col-3`}
            style={{
              "--bs-offcanvas-height": "85vh",
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtros</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="xl:h-full">
              <div className="w-full rounded-lg bg-white">
                <div className="top-[var(--header-height)] max-h-screen overflow-y-auto pb-8 xl:sticky xl:p-6 xl:pb-32 xl:pt-8">
                  {categoriesTree.children_categories.length > 0 && (
                    <div>
                      <h6 className="mb-1 pl-7 text-lg font-semibold">
                        {categoriesTree.isRoot ? "Categorías" : "Subcategorías"}
                      </h6>
                      <ul>
                        {categoriesTree.children_categories.map((c) => (
                          <li key={c.id}>
                            <Link href={`/blog/${c.slug}`}>
                              <a>{c.name}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div>
                      <h6 className="mb-1 pl-7 text-lg font-semibold">
                        Etiquetas
                      </h6>
                      <ul className="list-none">
                        {tags.map((tag, i) => (
                          <li key={tag + i}>
                            <label className="w-full cursor-pointer select-none hover:text-black">
                              <input
                                type="checkbox"
                                value={tag}
                                name="selected_tags"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagSelection(tag)}
                                className="mr-4"
                              />
                              {tag}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        )}
        {/* REPLACES LINE BELOW <div className="g-col-12 g-col-xl-10 grid"> */}
        {filteredArticles.length > 0 ? (
          <div
            className={clsx(
              "g-col-12 xl:self-start",
              "g-col-xl-9",
              categoriesTree.children_categories.length === 0 &&
                tags.length === 0 &&
                "xl:!col-start-3",
              "flex flex-wrap justify-center gap-6"
            )}
          >
            {filteredArticles.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                className="min-w-[400px] shrink grow-0 basis-[31%]"
              />
            ))}
          </div>
        ) : (
          <div className="g-col-12 g-col-xl-9">
            No se encontraron artículos :&#40;...
          </div>
        )}
      </div>

      <div
        className={`${styles["product-list-bottom-nav"]} z-50 pb-px xl:hidden`}
      >
        <div className="container d-flex justify-content-end">
          <button onClick={() => setShowFilters(true)}>
            Filtros{" "}
            <Image src="/icons/filter.svg" width={35} height={26} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesList;
