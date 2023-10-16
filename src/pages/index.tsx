import { getGlobalData, GlobalData } from "@/lib/cms";
import Layout from "@/components/Layout";
import CategoriesListSection from "@/components/sections/CategoriesListSection";
import Carousel from "@/components/sections/Carousel/Carousel";
import useOptimizeAB from "src/utils/optimize";
import Seo from "@/components/Seo";
import Link from "next/link";
import { GetServerSideProps } from "next";
import {
  getNewsArticles,
  getPaginatedArticles,
} from "@/lib/strapi/blog-articles";
import ArticlesHScroller from "@/components/Blog/ArticlesHScroller";
import LinkArrowIcon from "@/components/svg/LinkArrowIcon";
import RelatedArticles from "@/components/Blog/RelatedArticles";
import Image from "next/image";

type HomeProps = {
  globalData: GlobalData;
  news: Awaited<ReturnType<typeof getNewsArticles>>;
  latestsArticles: Awaited<ReturnType<typeof getPaginatedArticles>>["articles"];
};

export default function Home({ globalData, news, latestsArticles }) {
  let mainCategories = globalData.categoriesTree.children_categories;
  const ABVariant = useOptimizeAB("kSQ7YBVARQGBxyKIxTwsUA", 0);

  return (
    <Layout data={globalData}>
      <Seo seo={globalData.seo} />
      <Carousel>
        {/* <Carousel.Item
          responsiveBgImages={[
            { className: "lg:hidden", src: "/imgs/banner-feb-14_mobile.png" },
            {
              className: "hidden lg:block",
              src: "/imgs/banner-feb-14_desktop.png",
            },
          ]}
        >
          <Carousel.Heading>Fluke Argentina</Carousel.Heading>
          <p className="text-base 2xl:text-xl">
            {ABVariant === 0 &&
              "Acceda a beneficios exclusivos y descubra las últimas novedades de nuestro amplio portfolio de productos disponibles."}
            {ABVariant === 1 &&
              "Seleccione el producto deseado y luego presione en comprar ahora para comunicarse con el distribuidor oficial de su preferencia."}
          </p>
          <Carousel.Button href="#categories-section">Ver más</Carousel.Button>
        </Carousel.Item> */}
        {/* <Carousel.Item bgImage="/imgs/banner-home-2.jpg">
          <Carousel.Heading>Fluke Argentina</Carousel.Heading>
          <p className="text-base 2xl:text-xl">
            Realice sus compras de forma segura a través de nuestra cadena
            oficial de distribuidores autorizados con nuestro mayor respaldo y
            garantía.
          </p>
          <Carousel.Button href="#categories-section">Ver más</Carousel.Button>
        </Carousel.Item> */}
        {/* <Carousel.Item bgImage="/imgs/banner-home-3.jpg">
          <Carousel.Heading>Fluke Argentina</Carousel.Heading>
          <p className="text-base 2xl:text-xl">
            Haga sus compras en nuestra plataforma de contenidos exclusiva
            de Fluke Corp. y sus marcas asociadas.
          </p>
          <Carousel.Button href="https://www.fluke.com/es-ar/soporte/acerca-de-nosotros/perfil-corporativo">
            Ver más
          </Carousel.Button>
        </Carousel.Item> */}
        {/* --------- Nuevo banner --------- */}
        {/* En el archivo Carousel.tsx, overlay lo setie en false para aumentar el brillo*/}
        <Carousel.Item
          responsiveBgImages={[
            { className: "lg:hidden", src: "/imgs/portada_mobile.png" },
            {
              className: "hidden lg:block",
              src: "/imgs/portada_2.png",
            },
          ]}
        >
          <p></p>
        </Carousel.Item>
      </Carousel>
      <CategoriesListSection
        categories={mainCategories}
        headingText="Instrumentos de medición profesional"
      />
      <section className="container mt-8 mb-8">
        <div className="flex items-end justify-between lg:mb-4">
          <h2 className="mb-0 lg:text-2xl lg:font-bold">Últimos artículos</h2>
          <Link href="/blog">
            <a className="text-zinc-700">
              Blog <LinkArrowIcon className="h-4 w-4 lg:ml-4" />
            </a>
          </Link>
        </div>
        <ArticlesHScroller articles={latestsArticles} />
      </section>
      {/* <section className="container mt-4">
        <div className="rounded-2xl bg-white">
          <div className="card-body p-12 text-center xl:py-12">
            <p className="lead fw-semibold mb-0 font-roboto-slab text-gray-700 xl:text-3xl">
              Fluke. Keeping Your World Up and Running.
            </p>
          </div>
        </div>
      </section> */}
      {/* Banner fluke + icon 75 años */}
      <section className="container mt-4">
        <div className="relative overflow-hidden rounded-2xl bg-white ">
          <div className="absolute inset-0">
            <Image
              objectFit="cover"
              layout="fill"
              src="/imgs/banner-fluke-75.png"
              alt="Banner fluke 75 años"
            />
          </div>
          <p className="relative mb-0 ml-6 w-3/6 py-5 text-xl font-light tracking-wide text-white sm:text-2xl md:py-10 lg:w-auto lg:py-12 lg:text-center lg:text-[40px] ">
            Construyendo el mañana juntos
          </p>
          <div className="absolute right-0 top-4 bottom-4 w-36">
            <Image
              objectFit="contain"
              layout="fill"
              src="/imgs/icono-fluke-75.png"
              alt="Banner fluke 75 años"
            />
          </div>
        </div>
      </section>
      <section className="container mt-8 mb-8">
        <RelatedArticles
          articles={news}
          showCTA={false}
          // link={{
          //   href: "/blog/noticias",
          //   text: "Noticias",
          // }}
          title="Noticias recientes"
        />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    let globalDataPromise = getGlobalData();
    let newsPromise = getNewsArticles();
    let latestsArticlesPromise = getPaginatedArticles({
      page: 1,
      pageSize: 4,
      categoryId: 1,
    }).then((res) => res.articles);

    return {
      props: {
        globalData: await globalDataPromise,
        news: await newsPromise,
        latestsArticles: await latestsArticlesPromise,
      },
    };
  } catch (e) {
    console.error("ERROR", e);
    return { notFound: true };
  }
};
