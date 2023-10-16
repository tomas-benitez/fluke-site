import Layout from "@/components/Layout";
import styles from "@/styles/scss/modules/product-list.module.scss";
import { getGlobalData, GlobalData } from "@/lib/cms";
import { GetServerSideProps } from "next";
import { MeiliSearch } from "meilisearch";
import strapi from "@/lib/strapi";
import { useEffect, useMemo, useState } from "react";
import { useGAEventEffect } from "src/utils/gtag";
import { useFiltersForm } from "@/components/FiltersForm/hooks";
import { useWatch } from "react-hook-form";
import { filterProducts } from "@/lib/strapi/utils/product";
import { Offcanvas } from "react-bootstrap";
import FiltersForm from "@/components/FiltersForm";
import clsx from "clsx";
import Image from "next/image";
import ProductsStack from "@/components/Product/Stack";
import { BlogArticleHit, Product } from "@/lib/strapi/types";
import Link from "next/link";
import RightArrowIcon from "@/components/svg/RightArrowIcon";
import RelatedArticles from "@/components/Blog/RelatedArticles";
import Seo from "@/components/Seo";

type SearchPageProps = {
  globalData: GlobalData;
  searchString: string;
  products: Product[];
  blogArticles: BlogArticleHit[];
};

const meilisearch = new MeiliSearch({
  host: "https://search.fluke.com.ar",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_TOKEN,
});

const SearchPage = ({
  globalData,
  products,
  searchString,
  blogArticles,
}: SearchPageProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const {
    form,
    form: { reset },
    filterAttributes,
    defaultValues,
  } = useFiltersForm(products);
  const formData = useWatch({ control: form.control });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const filteredProducts = useMemo(() => {
    let selectedFilters = Object.keys(formData).reduce((acc, attrName) => {
      acc[attrName] = formData[attrName].filter((value) => value !== false);
      return acc;
    }, {});
    return filterProducts(products, selectedFilters);
  }, [products, formData]);

  return (
    <Layout data={globalData}>
      <Seo
        seo={{
          metaTitle: `Resultados de la busqueda: ${searchString} | Fluke Argentina`,
          metaDescription: `Resultados de la busqueda: ${searchString} | Fluke Argentina`,
        }}
      />
      <div className="container hidden pt-6 lg:px-12 xl:block">
        <>
          <Link href="/" passHref>
            <a className="mr-2 text-gray-500">Inicio</a>
          </Link>
          <RightArrowIcon className="mr-2" />
        </>
        <span>Resultados de la busqueda</span>
      </div>
      {products.length > 0 ? (
        <>
          <div className="grid px-3 pt-16 xl:pt-12">
            <div className="col-span-full xl:col-start-4">
              <h2 className="text-4xl font-bold">{searchString}</h2>
              <span>
                {products.length}{" "}
                {products.length === 1 ? "resultado" : "resultados"}
              </span>
            </div>
          </div>
          <section id="categories-section" className="position-relative pt-2">
            <div className="container mt-4 mb-3 grid">
              {Object.keys(filterAttributes).length > 0 && (
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
                        <FiltersForm
                          form={form}
                          filterAttributes={filterAttributes}
                        />
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              )}
              {/* REPLACES LINE BELOW <div className="g-col-12 g-col-xl-10 grid"> */}
              {filteredProducts.length > 0 ? (
                <div
                  className={clsx(
                    "g-col-12",
                    Object.keys(filterAttributes).length > 0
                      ? "g-col-xl-9"
                      : "g-col-xl-12 xl:px-32"
                  )}
                >
                  <ProductsStack products={filteredProducts} />
                </div>
              ) : (
                <div className="g-col-12 g-col-xl-9">
                  Ningún producto cumple con los filtros aplicados :&#40;...
                </div>
              )}
            </div>
            {Object.keys(filterAttributes).length > 0 && (
              <div
                className={`${styles["product-list-bottom-nav"]} z-50 pb-px xl:hidden`}
              >
                <div className="container d-flex justify-content-end">
                  <button onClick={() => setShowFilters(true)}>
                    Filtros{" "}
                    <Image
                      src="/icons/filter.svg"
                      width={35}
                      height={26}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="px-4">
          <div className="my-16 mx-auto max-w-7xl rounded-lg bg-white px-8 py-20 shadow-sm">
            <div className="mx-auto max-w-3xl">
              <Image
                src="/icons/magnifier.svg"
                width={113}
                height={98}
                alt=""
              />
              <h3 className="mt-4 font-bold">
                No hay productos que coincidan con tu búsqueda.
              </h3>
              <ul className="m-0 mt-6 list-none space-y-4 p-0">
                <li className="before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-black">
                  <span className="ml-4">
                    Revisá la ortografía de la palabra.
                  </span>
                </li>
                <li className="before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-black">
                  <span className="ml-4">
                    Utiliza palabras más genéricas o menos palabras.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {blogArticles && blogArticles.length > 0 && (
        <div className="container my-12">
          <RelatedArticles articles={blogArticles} />
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q } = ctx.query;

  try {
    if (typeof q !== "string") throw new Error("searchString must be a string");

    const productsSearchResults = await meilisearch
      .index("product")
      .search<{ id: string }>(q, { limit: 14 });

    const articlesSearchResultsPromise = meilisearch
      .index("blog-article")
      .search<{ id: string }>(q, { limit: 9 })
      .then((response) => response.hits);

    const globalDataPromise = getGlobalData();

    const productsPromise = strapi
      .find<Product[]>("products", {
        filters: {
          id: {
            $in: productsSearchResults.hits.map((hit) =>
              hit.id.replace("product-", "")
            ),
          },
        },
        fields: ["id", "filter_attributes"],
        populate: {
          category: { fields: ["name, slug"] },
          brand: { fields: ["name", "slug"] },
        },
      })
      .then(({ data }) => {
        return productsSearchResults.hits.map((hit) => {
          let p = data.find(
            (p) => p.id === parseInt(hit.id.replace("product-", ""))
          );
          return {
            ...hit,
            id: p.id,
            filter_attributes: p.filter_attributes,
            category: p.category,
            brand: p.brand,
          };
        });
      });

    return {
      props: {
        globalData: await globalDataPromise,
        searchString: q,
        products: await productsPromise.then((products) => [
          ...products.filter((p) => p.brand.slug === "fluke"),
          ...products.filter((p) => p.brand.slug !== "fluke"),
        ]),
        blogArticles: await articlesSearchResultsPromise,
      },
    };
  } catch (e) {
    console.error("ERROR", e);
    return { props: {} };
  }
};

export default SearchPage;
