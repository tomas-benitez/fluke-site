import Hero from "@/components/sections/Hero";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/scss/modules/product-list.module.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Fragment, useEffect, useMemo, useState } from "react";
import { getGlobalData } from "@/lib/cms";
import strapi from "@/lib/strapi";
import Layout from "@/components/Layout";
import ProductCard from "@/components/Product/Card";
import CategoriesListSection from "@/components/sections/CategoriesListSection";
import Link from "next/link";
import { getBreadcrumbs } from "@/lib/strapi/utils/category";
import RightArrowIcon from "@/components/svg/RightArrowIcon";
import FiltersForm from "@/components/FiltersForm";
import { filterProducts } from "@/lib/strapi/utils/product";
import { useFiltersForm } from "@/components/FiltersForm/hooks";
import { useWatch } from "react-hook-form";
import clsx from "clsx";
import { useGAEventEffect } from "src/utils/gtag";
import Seo from "@/components/Seo";
import { useAppContext } from "src/context";

const CategoryPage = ({ category, products, globalData }) => {
  const [showFilters, setShowFilters] = useState(false);

  useGAEventEffect(
    {
      action: "select_content",
      custom: {
        content_type: "category",
        item_id: `${category.slug}-${category.id}`,
      },
    },
    [category.slug, category.id]
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

  const breadCrumbs = getBreadcrumbs(category);

  return (
    <Layout
      data={globalData}
      whatsappText={`Hola, quería hacer una consulta sobre los productos de ${category.name}`}
    >
      <Seo
        seo={{
          ...category.seo,
          metaTitle:
            category.seo.metaTitle || `Fluke Argentina | ${category.name}`,
          metaImage: category.seo.metaImage || category.thumbnail_image,
        }}
      />
      <Hero bgImage="/imgs/image-1.jpg">
        <Hero.Heading>{category.name}</Hero.Heading>
        <p className="text-1xl 2xl:text-2xl">{category.value_proposition}</p>
        <div className="d-flex gap-2">
          <Hero.Button
            className="mt-6 py-4 px-16 2xl:py-6 2xl:px-32"
            href="#categories-section"
          >
            Ver productos
          </Hero.Button>
        </div>
      </Hero>
      <div className="container pt-6 xl:px-12">
        {breadCrumbs.map((breadcrumb, index) => {
          if (index + 1 !== breadCrumbs.length) {
            return (
              <Fragment key={index}>
                <Link href={breadcrumb.url} passHref>
                  <a className="mr-2 text-gray-500">{breadcrumb.label}</a>
                </Link>
                <RightArrowIcon className="mr-2" />
              </Fragment>
            );
          } else {
            return <span key={index}>{breadcrumb.label}</span>;
          }
        })}
      </div>
      {products.length > 0 ? (
        <section id="categories-section" className="position-relative pt-4">
          <div className="container mt-4 mb-3 grid pb-8">
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
            {/* REPLACES LINE BELOW <div className="g-col-12 grid"> */}
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
      ) : (
        category.children_categories.length > 0 && (
          <CategoriesListSection categories={category.children_categories} />
        )
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slugs } = context.query;
  const slug = slugs[slugs.length - 1];

  try {
    let globalDataPromise = getGlobalData();
    let category = await strapi
      .find(`slugify/slugs/category/${slug}`, {
        populate: {
          children_categories: {
            fields: "*",
            populate: ["thumbnail_image"],
            filters: { products: { id: { $notNull: true } } },
            sort: "name",
          },
          parent_category: {
            fields: ["slug", "name"],
            populate: { parent_category: { fields: ["slug", "name"] } },
          },
          seo: {
            populate: ["metaImage"],
          },
        },
      })
      .then((res) => res.data);

    let productsPromise = null;
    if (category.children_categories.length === 0) {
      productsPromise = strapi
        .find("products", {
          filters: {
            category: {
              id: {
                $eq: category.id,
              },
            },
            is_active: true,
          },
          pagination: {
            limit: 5000,
          },
          sort: "model_name",
          populate: ["brand"],
          prioritize_fluke: true,
        })
        .then((res) => res.data);
    }

    return {
      props: {
        globalData: await globalDataPromise,
        category,
        products: productsPromise ? await productsPromise : [],
        slug,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
}

export default CategoryPage;
