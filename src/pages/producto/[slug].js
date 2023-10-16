import clsx from "clsx";
import MediaGallery from "@/components/Product/MediaGallery";
import Image from "next/image";
import Button from "@/components/elements/Button";
import ProductInfo from "@/components/Product/ProductInfo";
import Relevant from "@/components/sections/Relevant";
import { useState } from "react";
import strapi from "@/lib/strapi";
import {
  addMediaListFallback,
  getMediaUrl,
  getProductMediaList,
} from "@/lib/strapi/utils/media";
import { getProductManuals } from "@/lib/strapi/utils/product";
import { getGlobalData } from "@/lib/cms";
import Layout from "@/components/Layout";
import { useAppContext } from "src/context";
import styles from "@/styles/scss/modules/product/product-page.module.scss";
import OffersModal from "@/components/Offer/OffersModal";
import Head from "next/head";
import Link from "next/link";
import { useGAEventEffect } from "src/utils/gtag";
import { useRandomProductsQuery } from "@/lib/strapi/utils/product";
import Seo from "@/components/Seo";

const ProductPage = ({ product, globalData }) => {
  const { setContactPopupState } = useAppContext();
  const [showOffers, setShowOffers] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const relatedProductsQuery = useRandomProductsQuery(
    `?filters[category]=${product.category.id}&filters[is_active]=true`
  );

  useGAEventEffect(
    {
      action: "select_content",
      custom: {
        content_type: "product",
        item_id: `${product.slug}-${product.id}`,
      },
    },
    [product.slug, product.id]
  );

  return (
    <Layout
      data={globalData}
      whatsappText={`Hola, tengo una consulta respecto al producto '${product.title} - ${product.model_name}'`}
    >
      <Seo
        seo={{
          ...product.seo,
          metaImage: product.seo.metaImage || {
            url: product.crm_images[0],
            width: 1200,
            height: 1200,
          },
        }}
      />
      <Head>
        <title>Fluke Argentina | {product.title}</title>
      </Head>
      <div className="bg-white px-4 pb-4 pt-6 xl:px-20 xl:pb-0">
        <Link href={`/categoria/${product.category.slug}`} passHref>
          <a className="mr-2 text-gray-500">
            Volver a: {product.category.name}
          </a>
        </Link>
      </div>
      <div className="bg-white xl:px-8 xl:py-2 2xl:px-20">
        {product.is_active ? (
          <>
            <div className="container relative mt-4 rounded-lg bg-gray-100 pt-8 pb-6 xl:px-4 xl:pt-10">
              <div className="absolute top-4 right-4 hidden xl:block">
                <Image
                  src={getMediaUrl(product.brand.logo)}
                  width={product.brand.logo?.width}
                  height={Math.min(product.brand.logo?.height, 50)}
                  objectFit="contain"
                  objectPosition="right"
                  alt={`Logo de la marca ${product.brand.name}`}
                />
              </div>
              <div className="grid gap-2 xl:gap-10">
                <div className="g-col-12 g-col-xl-6 flex items-start">
                  <div className="mx-auto w-full max-w-[600px] xl:max-w-none">
                    <MediaGallery
                      mediaList={addMediaListFallback(
                        getProductMediaList(product)
                      )}
                    />
                  </div>
                </div>
                <div
                  className={`${styles["product-right"]} g-col-12 g-col-xl-6 grid`}
                >
                  <div
                    className={clsx(
                      "g-col-12",
                      "rounded-2xl border-2 border-solid border-gray-200 bg-white px-4 py-8 shadow-sm xl:border-0",
                      "xl:bg-transparent xl:px-0 xl:py-0 xl:shadow-none"
                    )}
                  >
                    <div>
                      <div className="xl:hidden">
                        <Image
                          src={getMediaUrl(product.brand.logo)}
                          width={product.brand.logo?.width}
                          height={Math.min(product.brand.logo?.height, 50)}
                          objectFit="contain"
                          objectPosition="left"
                          alt={`Logo de la marca ${product.brand.name}`}
                        />
                      </div>
                      <h4
                        className="fw-bold mb-5 mt-4 text-base 2xl:text-2xl"
                        style={{ color: "var(--bs-dark-gray)" }}
                      >
                        {product.model_name}
                      </h4>
                      <h2 className="text-lg font-black 2xl:text-3xl">
                        {product.title}
                      </h2>
                      <p className="font-medium text-gray-400 2xl:text-xl">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <div className="markup">
                      <h5 className="fw-bold text-base 2xl:text-lg">
                        Caracteristicas principales
                      </h5>
                      <div
                        className="markup markup-product"
                        dangerouslySetInnerHTML={{
                          __html: product.general_description,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="g-col-12">
                    {!!getProductManuals(product).length && (
                      <a
                        className="link-info mb-4 inline-block"
                        href="#product-info"
                        onClick={() => setShowResources(true)}
                      >
                        Manuales
                      </a>
                    )}
                    {!!product.certifications.length && (
                      <div className={`${styles["certifications"]}`}>
                        {product.certifications.map((certification) =>
                          certification.logo ? (
                            <Image
                              key={certification.id}
                              src={getMediaUrl(certification.logo)}
                              alt={`certification of ${certification.name}`}
                              width={certification.logo.width}
                              height={certification.logo.height}
                            />
                          ) : (
                            <span>{certification.name}</span>
                          )
                        )}
                      </div>
                    )}
                    <div className="flex flex-col items-stretch justify-center gap-4 xl:flex-row">
                      {product.offers.length > 0 && (
                        <div className="flex w-full flex-grow xl:max-w-sm">
                          <Button
                            variant="dark-gray"
                            size="lg"
                            className="w-100 py-6 text-base"
                            onClick={() => setShowOffers(true)}
                          >
                            Compre ahora
                          </Button>
                        </div>
                      )}
                      <div className="flex w-full flex-grow xl:max-w-sm">
                        <Button
                          variant="outline-dark"
                          size="lg"
                          className="w-100 py-6 text-base"
                          onClick={() => {
                            setContactPopupState({
                              visible: true,
                              message: `Tengo una consulta sobre el producto: ${product.title} ${product.model_name}:\r\n`,
                            });
                          }}
                        >
                          Consulte con un especialista
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12" id="product-info">
              <ProductInfo
                product={product}
                showResources={showResources}
                setShowResources={setShowResources}
              />
            </div>
            <div className="mt-16">
              <Relevant items={relatedProductsQuery.data} title="Conocé más" />
            </div>
            <OffersModal
              show={showOffers}
              setShow={setShowOffers}
              product={product}
            />
          </>
        ) : (
          <div className="py-64">
            Lo sentimos! Este producto no se encuentra disponible.
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    let globalDataPromise = getGlobalData();

    let productPromise = strapi.auth().then((strapi) =>
      strapi
        .find(`slugify/slugs/product/${slug}`, {
          populate: [
            "offers.store.logo",
            "brand.logo",
            "category",
            "seo.metaImage",
            "certifications.logo",
            "product_resources.type",
          ],
        })
        .then((res) => res.data)
    );

    return {
      props: {
        globalData: await globalDataPromise,
        product: await productPromise,
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

export default ProductPage;
