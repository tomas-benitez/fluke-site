import Hero from "@/components/sections/Hero";
import Image from "next/image";
import styles from "@/styles/scss/modules/product-list.module.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useMemo, useState } from "react";
import { getGlobalData } from "@/lib/cms";
import strapi from "@/lib/strapi";
import Layout from "@/components/Layout";
import ProductCard from "@/components/Product/Card";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import { filterProducts } from "@/lib/strapi/utils/product";
import FiltersForm from "@/components/FiltersForm";
import { useFiltersForm } from "@/components/FiltersForm/hooks";
import { useWatch } from "react-hook-form";
import clsx from "clsx";
import { useGAEventEffect } from "src/utils/gtag";
import Seo from "@/components/Seo";

const SpecialCategoryPage = ({
  globalData,
  products,
  params,
  especialCategory,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  useGAEventEffect(
    {
      action: "select_content",
      custom: {
        content_type: "categoria-e",
        item_id: `categoria-e_${params.join("_")}`,
      },
    },
    [params]
  );

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
    <Layout
      data={globalData}
      whatsappText={`Hola, estoy interesado en ${especialCategory.title}`}
    >
      <Seo
        seo={{
          ...especialCategory.seo,
          metaDescription:
            especialCategory.seo.metaDescription ||
            especialCategory.value_proposition_short,
          metaTitle:
            especialCategory.seo.metaTitle ||
            `Fluke Argentina | ${especialCategory.title}`,
        }}
      />
      <Hero bgImage={"/imgs/image-1.jpg"}>
        <Hero.Heading>{especialCategory.title}</Hero.Heading>
        <p className="text-1xl 2xl:text-2xl">
          {especialCategory.value_proposition_short}
        </p>
        <div className="d-flex gap-2">
          <Hero.Button
            className="mt-6 py-4 px-16 2xl:py-6 2xl:px-32"
            href="#categories-section"
          >
            Ver productos
          </Hero.Button>
        </div>
      </Hero>
      {especialCategory.value_proposition && (
        <section className="container pt-12">
          <div className="card items-center justify-center p-8">
            <div className="mt-4">
              <p className="text-center text-lg font-medium text-gray-700">
                {especialCategory.value_proposition}
              </p>
            </div>
          </div>
        </section>
      )}
      {products.length > 0 && (
        <section id="categories-section" className="position-relative pt-6">
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
                  "g-col-12 grid xl:self-start",
                  Object.keys(filterAttributes).length > 0
                    ? "g-col-xl-9"
                    : "g-col-xl-12 xl:px-32"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="g-col-12 g-col-sm-6 g-col-lg-4 pb-3"
                  />
                ))}
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
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    let globalDataPromise = getGlobalData();
    let { params } = context.query;
    let slug = params.join("/");

    let especialCategoryPromise = strapi
      .find("especial-categories", {
        filters: { slug },
        populate: ["seo.metaImage"],
      })
      .then((res) => {
        if (!res.data?.[0]) throw new Error("especialCategory not found");
        return res.data[0];
      });

    const attributes = {};
    for (let i = 0; i < params.length; i = i + 2) {
      const key = params[i].startsWith("-")
        ? params[i].slice(1)
        : `#${params[i]}`;
      const property = params[i + 1] || "_";

      attributes[key] = property;
    }

    let productsPromise = strapi
      .find("products", {
        especial_attributes: attributes,
        filters: {
          is_active: true,
        },
        pagination: {
          limit: 5000,
        },
        sort: "model_name",
      })
      .then((res) => res.data);

    return {
      props: {
        globalData: await globalDataPromise,
        products: await productsPromise,
        especialCategory: await especialCategoryPromise,
        params,
      },
    };
  } catch (e) {
    console.error("ERROR", e);
    return {
      notFound: true,
    };
  }
}

export default SpecialCategoryPage;
